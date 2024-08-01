import warnings
import logging
from logging.config import dictConfig
from contextlib import asynccontextmanager

import click
import sentry_sdk
import uvicorn
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api.main import api_router
from app.core.config import settings, Environment
from app.site_settings import SiteSetting

dictConfig({
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s:%(lineno)d - %(levelname)s - %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
    },
    "root": {
        "level": logging.INFO if settings.ENVIRONMENT != Environment.LOCAL else logging.DEBUG,
        "handlers": ["console"],
    },
    "loggers": {
        "uvicorn.error": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "uvicorn.access": {
            "level": "INFO",
            "handlers": ["console"],
            "propagate": False,
        },
    },
})


logger = logging.getLogger(__name__)


load_dotenv()


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(
        dsn=str(settings.SENTRY_DSN),
        enable_tracing=True,
        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        traces_sample_rate=1.0,
        # Set profiles_sample_rate to 1.0 to profile 100%
        # of sampled transactions.
        # We recommend adjusting this value in production.
        profiles_sample_rate=1.0,
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    SiteSetting.update_db_cache()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
    lifespan=lifespan,
)


# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)


@click.group(context_settings={"max_content_width": 150})
def cli():
    pass


@cli.command()
@click.option("--host", default="127.0.0.1", help="Host, default=127.0.0.1")
@click.option("--port", default=3000, help="Port, default=3000")
def runserver(host, port):
    warnings.warn(
        "This command will start the server in development mode, do not use it in production."
    )
    uvicorn.run("main:app", host=host, port=port, reload=True, log_level="info")


@cli.command()
@click.option(
    "--dataset", default="regression", help="Dataset name, default=regression"
)
@click.option(
    "--llm-provider",
    default="openai",
    help="LLM provider, default=openai, options=[openai, gemini]",
)
@click.option("--run-name", default=None, help="Run name, default=None")
@click.option(
    "--tidb-ai-chat-engine",
    default="default",
    help=f"TiDB AI chat engine, default=default",
)
def runeval(dataset, llm_provider, run_name, tidb_ai_chat_engine):
    from app.evaluation.evals import Evaluation

    eval = Evaluation(
        dataset_name=dataset,
        llm_provider=llm_provider,
        run_name=run_name,
        tidb_ai_chat_engine=tidb_ai_chat_engine,
    )
    eval.run()


if __name__ == "__main__":
    cli()
