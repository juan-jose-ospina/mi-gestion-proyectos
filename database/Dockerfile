FROM mysql:8.0

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

COPY database.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY seed.sql /docker-entrypoint-initdb.d/02_seed.sql