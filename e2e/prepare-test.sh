#!/bin/bash

set -e

docker compose pull frontend background backend redis static-web-server
