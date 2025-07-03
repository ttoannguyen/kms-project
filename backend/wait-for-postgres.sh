#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

until nc -z postgres_custom 5432; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is up - starting backend..."
node dist/index.js
