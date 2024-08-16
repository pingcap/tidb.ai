#!/bin/bash

set -e

if [[ "${VERCEL_TOKEN}" && "${VERCEL_ORG_ID}" && "${VERCEL_PROJECT_ID}" ]]; then
  npx vercel deploy --yes --token "${VERCEL_TOKEN}" "${VERCEL_CLI_ARGS}"
else
  echo ""
  echo "> Not configured"
  echo ""
  exit 1
fi
