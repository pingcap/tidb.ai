FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11-slim

WORKDIR /app/

RUN apt-get update && apt-get install -y supervisor

COPY supervisord.conf /usr/etc/supervisord.conf
COPY requirements.lock /app/requirements.lock

RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r /app/requirements.lock && \
    playwright install chromium && \
    playwright install-deps chromium


RUN python -c 'import nltk; \
download_dir = "/usr/local/lib/python3.11/site-packages/llama_index/core/_static/nltk_cache";\
nltk.download("stopwords", download_dir=download_dir);\
nltk.download("punkt", download_dir=download_dir);'

ENV PYTHONPATH=/app

COPY . /app/