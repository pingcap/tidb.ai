from celery import Celery

from app.core.config import settings


app = Celery(
    settings.PROJECT_NAME,
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

app.autodiscover_tasks(["app"])
