# Deploying Rocking C Cattle to an Ubuntu VPS (domain + SSL)

This app is a **Next.js Node server** (App Router). It is **not** a static export — it
has an admin panel, a writable on-disk content store, image optimization, and runtime
photo uploads. So it runs as a long-lived Node process (managed by PM2) behind nginx,
with Let's Encrypt SSL.

Two things are easy to get wrong and are baked into the steps below:

1. **Uploads must be persistent AND served by nginx.** Next.js only serves files that
   were in `public/` at *build* time, so runtime-uploaded photos (`/uploads/...`) must
   be served directly by nginx. We also keep them (and the editable content) on a
   persistent disk so redeploys don't wipe them.
2. **`client_max_body_size`** must be raised or nginx rejects photo uploads with `413`.

Paths used below: app in `/var/www/rocking-c`, persistent data in `/var/data/rocking-c`.
Adjust if you prefer, but keep them consistent.

---

## 0. Prerequisites

- An Ubuntu 22.04/24.04 VPS and SSH access (as `root` or a sudo user).
- Your domain's DNS pointing at the server's public IP **before** you request SSL:
  - `A` record: `rockingccattle.com` → `YOUR.SERVER.IP`
  - `A` record (or CNAME): `www.rockingccattle.com` → `YOUR.SERVER.IP`
  - Verify from your laptop: `dig +short rockingccattle.com` should print the server IP.

---

## 1. System packages + firewall

```bash
apt update && apt upgrade -y
apt install -y git curl nginx ufw

ufw allow OpenSSH
ufw allow 'Nginx Full'      # opens ports 80 and 443
ufw --force enable
```

> **Low-RAM VPS (1 GB):** `next build` can run out of memory. If the build is killed,
> add swap first:
> ```bash
> fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
> echo '/swapfile none swap sw 0 0' >> /etc/fstab
> ```

## 2. Node.js 20 LTS + PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v && npm -v          # expect v20.x

npm install -g pm2
```

## 3. Get the code

**Option A — git clone** (replace with your repo URL):
```bash
mkdir -p /var/www
git clone https://github.com/YOUR_USER/YOUR_REPO.git /var/www/rocking-c
cd /var/www/rocking-c
```

**Option B — upload from your machine** (run on your *laptop*, not the server):
```bash
scp -r ./Bulls root@YOUR.SERVER.IP:/var/www/rocking-c
```

## 4. Persistent data (survives redeploys)

Content edits and uploaded photos live outside the repo so a `git pull` / rebuild
never deletes them.

```bash
mkdir -p /var/data/rocking-c/uploads

# Point the app's public/uploads at the persistent folder so uploads land there:
rm -rf /var/www/rocking-c/public/uploads
ln -s /var/data/rocking-c/uploads /var/www/rocking-c/public/uploads
```

## 5. Environment variables

Create `/var/www/rocking-c/.env` (this file is git-ignored):

```bash
cd /var/www/rocking-c
cat > .env <<EOF
# Admin panel (/admin) — REQUIRED to enable it
ADMIN_PASSWORD=change-this-to-a-strong-password
ADMIN_SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Keep editable content + analytics on the persistent disk
CONTENT_DIR=/var/data/rocking-c

# Optional — deliver contact-form emails via Resend (resend.com).
# Without these the form falls back to opening the visitor's email app.
# RESEND_API_KEY=re_xxxxxxxx
# CONTACT_TO=info@rockingccattle.com
# CONTACT_FROM=Rocking C Cattle <info@rockingccattle.com>
EOF

nano .env     # set a real ADMIN_PASSWORD
```

The `ADMIN_SESSION_SECRET` line auto-fills a random value. Just set `ADMIN_PASSWORD`.

## 6. Install dependencies + build

```bash
cd /var/www/rocking-c
npm install          # use `npm ci` if a package-lock.json is committed
npm run build
```

> Do **not** export `NODE_ENV=production` before this step, or dev dependencies
> (Tailwind, TypeScript) won't install and the build will fail.

## 7. Run with PM2

```bash
cd /var/www/rocking-c
pm2 start npm --name rocking-c -- start     # runs `next start` on port 3000
pm2 save
pm2 startup                                 # then run the command it prints (boot persistence)

# sanity check — should return HTTP/1.1 200:
curl -sI http://127.0.0.1:3000 | head -1
```

## 8. nginx reverse proxy

```bash
nano /etc/nginx/sites-available/rocking-c
```

Paste:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name rockingccattle.com www.rockingccattle.com;

    # Allow photo uploads (default nginx limit is only 1 MB)
    client_max_body_size 30M;

    # Serve uploaded photos straight from the persistent disk.
    # (Next.js does NOT serve files added to public/ after build time.)
    location /uploads/ {
        alias /var/data/rocking-c/uploads/;
        access_log off;
        expires 7d;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable it and reload:

```bash
ln -sf /etc/nginx/sites-available/rocking-c /etc/nginx/sites-enabled/rocking-c
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Now `http://rockingccattle.com` should load.

## 9. SSL (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d rockingccattle.com -d www.rockingccattle.com
```

Choose **redirect** when asked (forces HTTPS). Certbot rewrites the config to add the
443 block and an http→https redirect, keeping your `client_max_body_size` and
`/uploads/` block. Confirm + test auto-renewal:

```bash
nginx -T | grep -E "client_max_body_size|location /uploads"   # both should still be present
certbot renew --dry-run
```

## 10. Verify end to end

1. Open `https://rockingccattle.com` — padlock, site loads.
2. Go to `/admin`, log in with `ADMIN_PASSWORD`.
3. Edit a bull → upload a photo → it should display immediately.
4. From the server, the raw upload should be a real image:
   ```bash
   curl -sI https://rockingccattle.com/uploads/<the-new-file>.jpg | head -3   # 200 + image/...
   ```

---

## Updating the site later (redeploy)

```bash
cd /var/www/rocking-c
git pull
npm install
npm run build
pm2 restart rocking-c
```

Uploaded photos (`/var/data/rocking-c/uploads`) and content (`/var/data/rocking-c/*.json`,
`*.jsonl`) are untouched because they live outside the repo.

## Backups

Back up the persistent data directory regularly — it holds every uploaded photo, the
bull/cow catalog edits, and analytics:

```bash
tar czf rocking-c-backup-$(date +%F).tgz -C /var/data rocking-c
```

## Quick troubleshooting

| Symptom | Cause / fix |
|---|---|
| `413 Request Entity Too Large` on upload | `client_max_body_size` missing/too small in nginx (step 8). |
| Uploaded photo shows broken / `_next/image` 400 "isn't a valid image" | Two requirements: (a) nginx must serve `/uploads/` from disk (step 8) — verify with `curl -sI https://…/uploads/<file>` → `200 image/...`; and (b) `images.unoptimized` must be `true` in `next.config.ts`. Next's image optimizer fetches sources *through Next itself*, which doesn't serve files uploaded after build, so without `unoptimized` the optimizer 404s on uploads even when nginx serves them. |
| `/admin` login page says it's disabled | `ADMIN_PASSWORD` not set in `.env`, or PM2 not restarted after editing `.env`. |
| Edits/photos vanished after redeploy | `CONTENT_DIR` not set, or `public/uploads` symlink missing (steps 4–5). |
| Site down after reboot | `pm2 startup` step not completed. Re-run it and `pm2 save`. |
| Build killed on small VPS | Add swap (step 1 note). |
