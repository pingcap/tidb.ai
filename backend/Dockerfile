FROM python:3.11.9-slim

RUN apt-get update && apt-get install -y supervisor

WORKDIR /app

COPY requirements.lock /app/requirements.lock
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r /app/requirements.lock

COPY . /app/
COPY supervisord.conf /usr/etc/supervisord.conf

ENV PYTHONPATH /app

EXPOSE 5000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
