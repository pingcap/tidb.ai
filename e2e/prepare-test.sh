#!/bin/bash

set -e

# Download tiup
function prepare_tidb () {
  curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
  tiup install tidb:v8.4.0 pd tidb tikv tiflash
}

# Pull docker images
function prepare_docker_images() {
  docker compose pull frontend background backend redis static-web-server
}

prepare_tidb &
PID1=$!

prepare_docker_images &
PID2=$!

wait $PID1
wait $PID2
