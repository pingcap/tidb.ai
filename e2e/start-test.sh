#!/bin/bash

set -e

# Formats
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_UNDERLINED="\033[4m"
C_AQUA="\033[38;5;14m"
TAG="${F_BOLD}${F_UNDERLINED}${C_AQUA}[TiDB.AI Integration Test]${NO_FORMAT}"


echo -e "$TAG Creating temp dir"
export E2E_DATA_STORAGE_DIR=$(mktemp -d "${TMPDIR:-/tmp/}"/tidbai-storage.XXXXXXXX | sed 's#//#/#g')
export E2E_DATA_REDIS_DIR=$(mktemp -d "${TMPDIR:-/tmp/}"/tidbai-redis.XXXXXXXX | sed 's#//#/#g')
echo E2E_DOCKER_TAG_FRONTEND: ${E2E_DOCKER_TAG_FRONTEND}
echo E2E_DOCKER_TAG_BACKEND: ${E2E_DOCKER_TAG_BACKEND}
echo E2E_DATA_STORAGE_DIR: ${E2E_DATA_STORAGE_DIR}
echo E2E_DATA_REDIS_DIR: ${E2E_DATA_REDIS_DIR}

echo -e "$TAG Starting TiDB"

# Cleanups
function clean_up {
  ARG=$?
  echo -e "$TAG Cleaning up..."

  # Stop dockers
  echo -e "$TAG Shutdown dockers..."
  docker compose down frontend background backend redis static-web-server

  echo "$TAG Stopping tiup playground cluster..."
  echo -e "$TAG Wait until TiDB down..."
  kill $TIDB_PID
  while [[ -n $(curl http://127.0.0.1:10080/status 2>/dev/null) ]]
  do
    sleep 1
  done
  echo "$TAG Cleaning tiup playground data..."
  tiup clean e2e

  # Remove temp dirs
  echo "$TAG Cleaning temp data dirs"
  rm -rf ${E2E_DATA_STORAGE_DIR} ${E2E_DATA_REDIS_DIR} 2>/dev/null || echo "Failed to remove temp dirs. (It's OK in CI)"

  exit $ARG
}

trap clean_up EXIT

echo -e "$TAG Create tiup playground cluster..."
tiup playground v8.4.0 --tag "e2e" --db 1 --pd 1 --tiflash 1 --kv 1 --without-monitor &
TIDB_PID=$!
echo -e "$TAG Wait until TiDB ready..."
while ! [[ -n $(curl http://127.0.0.1:10080/status 2>/dev/null) ]]
do
  sleep 1
done

echo -e "$TAG Execute migrations"
docker compose run --rm backend /bin/sh -c "alembic upgrade head"

echo -e "$TAG Execute bootstrap"
docker compose run --rm backend /bin/sh -c "python bootstrap.py" > bootstrap.stdout

echo -e "$TAG Extract initial username and password"
cat bootstrap.stdout | grep IMPORTANT | sed 's/^.*email: \(.*\) and password: \(.*\)$/USERNAME=\1\nPASSWORD=\2/' > .credentials
cat .credentials

echo -e "$TAG Start components"
docker compose up -d redis frontend backend background static-web-server

echo -e "$TAG Wait until tidb.ai ready..."
while ! curl http://127.0.0.1:3000 > /dev/null 2>/dev/null
do
  sleep 1
done

npx playwright test ${PLAYWRIGHT_ARGS}

if [ ! "${CI}" ]; then
  npx playwright show-report
fi
