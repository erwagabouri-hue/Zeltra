#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-}"
ONION="${2:-}"
CERTBOT_EMAIL="${3:-}"

if [ -z "$DOMAIN" ] || [ -z "$ONION" ] || [ -z "$CERTBOT_EMAIL" ]; then
  echo "Usage: bootstrap.sh <domain> <onion> <certbot_email>"
  exit 2
fi

apt update && apt upgrade -y
apt install -y nginx tor privoxy certbot python3-certbot-nginx ufw fail2ban rsync

# UFW
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Privoxy config
cat > /etc/privoxy/config <<EOF
listen-address  127.0.0.1:9052
forward-socks5t   /               127.0.0.1:9050 .
toggle  1
EOF

systemctl enable --now privoxy
systemctl enable --now tor

# Nginx site
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 50M;
    limit_req_zone \$binary_remote_addr zone=one:10m rate=10r/s;

    location / {
        limit_req zone=one burst=20 nodelay;
        proxy_pass http://127.0.0.1:9052;
        proxy_set_header Host ${ONION};
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 60s;
        proxy_read_timeout 180s;
        proxy_buffering off;
        proxy_http_version 1.1;
    }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/${DOMAIN}
nginx -t
systemctl reload nginx || true

# Obtain TLS certificate (will retry if rate-limited)
certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "${CERTBOT_EMAIL}" || true

systemctl enable --now nginx
systemctl restart nginx

echo "Bootstrap complete."
