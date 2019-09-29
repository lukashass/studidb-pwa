#!/usr/bin/env sh
set -eu

envsubst '${URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"
