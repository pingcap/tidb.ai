#!/bin/bash

set -e

docker compose pull frontend background backend tidb redis static-web-server
