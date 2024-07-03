FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11-slim

WORKDIR /app/

RUN apt-get update && apt-get install -y supervisor

COPY requirements.lock /app/requirements.lock
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r /app/requirements.lock

COPY supervisord.conf /usr/etc/supervisord.conf


# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./pyproject.toml ./poetry.lock* /app/

ENV PYTHONPATH=/app

COPY . /app/