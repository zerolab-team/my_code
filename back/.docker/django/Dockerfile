FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && \
    apt-get install -y build-essential libpq-dev gettext && \
    apt-get purge -y --auto-remove -o APT:AutoRemove:RecommendsImportant=false && \
    rm -rf /var/lib/apt/lists/*

COPY ./requirements /requirements
RUN pip install -r /requirements/local.txt

COPY ./.docker/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./.docker/django/start-celeryworker /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker
RUN chmod +x /start-celeryworker

COPY ./.docker/django/start-celerybeat /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat
RUN chmod +x /start-celerybeat

WORKDIR /app
