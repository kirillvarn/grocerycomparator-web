#!make
include .env

dump_prod:
	PGPASSWORD=${PGPASSWORD} pg_dump -x --dbname ${PGDATABASE} --username ${PGUSER} --host ${PGHOST} --port ${PGPORT} -f repo/data.sql

dump_prod_schema:
	PGPASSWORD=${PGPASSWORD} pg_dump -x --dbname ${PGDATABASE} --username ${PGUSER} --host ${PGHOST} --schema-only --port ${PGPORT} -f repo/structure.sql

dev_reset:
	# dropdb -h localhost -U postgres product_dev
	createdb -h localhost -p 5432 -U postgres -W naive_product_dev
	psql -h localhost -p 5432 -U postgres -W naive_product_dev < repo/data.sql
