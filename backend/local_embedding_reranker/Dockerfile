FROM python:3.11.9-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN PYTHONDONTWRITEBYTECODE=1 pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/

ENV PYTHONPATH=/app

EXPOSE 5001

CMD ["uvicorn", "main:app", "--port", "5001", "--host", "0.0.0.0"]