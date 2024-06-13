from sqlmodel import create_engine

from app.core.config import settings


# TiDB Serverless clusters have a limitation: if there are no active connections for 5 minutes,
# they will shut down, which closes all connections, so we need to recycle the connections
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI), pool_recycle=300)
