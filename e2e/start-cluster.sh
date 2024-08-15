#!/bin/bash

set -e

# Formats
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_UNDERLINED="\033[4m"
C_AQUA="\033[38;5;14m"
TAG="${F_BOLD}${F_UNDERLINED}${C_AQUA}[TiDB.AI Integration Test]${NO_FORMAT}"

# Cleanups
function clean_up {
  ARG=$?
  echo "$TAG Cleaning up..."
  docker compose down frontend background backend tidb redis
  exit $ARG
}

trap clean_up EXIT

echo -e "$TAG Starting TiDB"
docker compose up -d tidb

echo -e "$TAG Wait until TiDB ready..."
while ! docker compose exec tidb /bin/bash -c "curl http://127.0.0.1:10080/status" > /dev/null 2>/dev/null
do
  sleep 1
done

echo -e "$TAG Execute migrations"
docker compose run --rm backend /bin/sh -c "alembic upgrade head"

echo -e "$TAG Execute bootstrap"
docker compose run --rm backend /bin/sh -c "python bootstrap.py" > bootstrap.stdout

echo -e "$TAG Extract initial username and password"
cat bootstrap.stdout | grep IMPORTANT | sed 's/^.*email: \(.*\) and password: \(.*\),.*$/USERNAME=\1\nPASSWORD=\2/' > .credentials
cat .credentials

echo -e "$TAG Start components"
docker compose up -d redis frontend backend background

echo -e "$TAG Press Enter to exit..."
read junk
