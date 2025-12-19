#!/bin/sh
CERT_PATH="/etc/letsencrypt/live/ezportfolio.eu/fullchain.pem"
KEY_PATH="/etc/letsencrypt/live/ezportfolio.eu/privkey.pem"

# jeśli certyfikaty nie istnieją
if [ ! -f "$CERT_PATH" ] || [ ! -f "$KEY_PATH" ]; then
    echo "No SSL certificates found. Generating temporary self-signed certificate..."
    mkdir -p /etc/letsencrypt/live/ezportfolio.eu
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$KEY_PATH" \
        -out "$CERT_PATH" \
        -subj "/CN=localhost"
fi

nginx -g "daemon off;"
