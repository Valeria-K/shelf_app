FROM python:latest

RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
        python3-psycopg2 \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/backend

COPY ./src/backend /opt/backend

RUN pip3 install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python", "manage.py"]

CMD ["runserver", "0.0.0.0:8000"]

