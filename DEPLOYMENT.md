# 🚀 Deployment Guide - Tanya Joko

Panduan lengkap deployment aplikasi Tanya Joko ke VPS mulai dari awal.

## 📋 Prerequisites

- VPS dengan Ubuntu 20.04/22.04 (minimal 2GB RAM)
- Domain (opsional)
- Akses SSH ke VPS
- Supabase project (sudah ada)
- Gemini API Key

---

## 1️⃣ Clone Project dari GitHub

### Di VPS (via SSH)

```bash
# Login ke VPS
ssh username@your-vps-ip

# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install git -y

# Clone repository
cd /var/www  # atau folder sesuai preferensi
git clone https://github.com/YOUR_USERNAME/tanyajoko.git
cd tanyajoko
```

---

## 2️⃣ Install Node.js & NPM

```bash
# Install Node.js 20.x (recommended untuk Next.js 16)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verifikasi instalasi
node --version  # harus >= 20.0.0
npm --version   # harus >= 10.0.0
```

---

## 3️⃣ Install Dependencies

```bash
# Install dependencies
npm install

# Atau jika ada error, gunakan:
npm install --legacy-peer-deps
```

---

## 4️⃣ Setup Environment Variables

```bash
# Buat file environment
nano .env.local
```

**Isi file `.env.local`:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mimvgestlzmkizdhxhdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbXZnZXN0bHpta2l6ZGh4aGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1Mjk0ODcsImV4cCI6MjA1MzEwNTQ4N30.9CfpYeJrChBCRjG_aM0yVpmJaL_MqBE_3L_c0OVRO48

# Gemini AI
GEMINI_API_KEY=AIzaSyC0utZMhlJq-O0bwm21AZrao3lYGZbCgPQ

# Optional - untuk production
NODE_ENV=production
```

**Save:** Tekan `Ctrl+O`, `Enter`, lalu `Ctrl+X`

---

## 5️⃣ Build Aplikasi

```bash
# Build Next.js untuk production
npm run build

# Output:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

**Jika error saat build:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## 6️⃣ Test Aplikasi (Development)

```bash
# Test dulu sebelum production
npm run dev

# Buka browser: http://your-vps-ip:3000
# Tekan Ctrl+C untuk stop
```

---

## 7️⃣ Install PM2 (Process Manager)

PM2 untuk keep aplikasi running 24/7 dan auto-restart jika crash.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start aplikasi dengan PM2
pm2 start npm --name "tanyajoko" -- start

# Auto-start saat VPS reboot
pm2 startup
pm2 save
```

**PM2 Commands:**
```bash
pm2 status           # Cek status aplikasi
pm2 logs tanyajoko   # Lihat logs
pm2 restart tanyajoko # Restart aplikasi
pm2 stop tanyajoko   # Stop aplikasi
pm2 delete tanyajoko # Hapus dari PM2
```

---

## 8️⃣ Setup Nginx (Reverse Proxy)

### Install Nginx

```bash
sudo apt install nginx -y
```

### Konfigurasi Nginx

```bash
# Buat config file
sudo nano /etc/nginx/sites-available/tanyajoko
```

**Isi config:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # ganti dengan domain kamu

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Jika tidak pakai domain, gunakan IP:**
```nginx
server {
    listen 80;
    server_name your-vps-ip;  # ganti dengan IP VPS kamu

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Aktifkan Config

```bash
# Symlink ke sites-enabled
sudo ln -s /etc/nginx/sites-available/tanyajoko /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Enable Nginx auto-start
sudo systemctl enable nginx
```

---

## 9️⃣ Setup SSL (HTTPS) - Opsional tapi Recommended

Hanya jika pakai domain (bukan IP).

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL Certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (sudah otomatis, tapi cek dulu)
sudo certbot renew --dry-run
```

---

## 🔟 Update Database (Fix Malioboro Image)

```bash
# Akses Supabase SQL Editor di browser
# https://supabase.com/dashboard/project/mimvgestlzmkizdhxhdo/sql

# Jalankan query ini:
```

```sql
UPDATE destinations 
SET image_url = 'https://images.unsplash.com/photo-1555400038-63f526b491e0?w=800&auto=format&fit=crop'
WHERE name = 'Malioboro';
```

---

## ✅ Verification Checklist

- [ ] Aplikasi running di PM2: `pm2 status`
- [ ] Nginx running: `sudo systemctl status nginx`
- [ ] Port 80 terbuka di firewall
- [ ] Bisa akses via browser: `http://your-domain.com` atau `http://your-vps-ip`
- [ ] Halaman homepage load dengan benar
- [ ] Chat AI berfungsi (test kirim pesan)
- [ ] Voice input berfungsi
- [ ] Gambar destinasi load (termasuk Malioboro)
- [ ] SSL certificate active (jika pakai domain)

---

## 🔄 Update Aplikasi (Future)

Jika ada perubahan code:

```bash
cd /var/www/tanyajoko

# Pull latest changes
git pull origin main

# Install new dependencies (jika ada)
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart tanyajoko

# Clear cache Nginx (opsional)
sudo systemctl reload nginx
```

---

## 🐛 Troubleshooting

### 1. PM2 tidak jalan
```bash
pm2 kill
pm2 start npm --name "tanyajoko" -- start
pm2 save
```

### 2. Port 3000 sudah dipakai
```bash
# Cek proses yang pakai port 3000
sudo lsof -i :3000

# Kill proses
sudo kill -9 <PID>
```

### 3. Nginx error
```bash
# Cek error log
sudo tail -f /var/log/nginx/error.log

# Test konfigurasi
sudo nginx -t
```

### 4. Aplikasi lemot
```bash
# Cek memory & CPU
htop

# Cek logs PM2
pm2 logs tanyajoko --lines 100
```

### 5. Firewall blocking
```bash
# Jika pakai UFW
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22  # SSH
sudo ufw enable
```

---

## 📊 Monitoring

```bash
# Monitor resources
pm2 monit

# Lihat logs real-time
pm2 logs tanyajoko

# Cek Nginx access log
sudo tail -f /var/log/nginx/access.log
```

---

## 🔐 Security Recommendations

1. **Ubah default SSH port** (opsional)
2. **Setup firewall** dengan UFW
3. **Disable root login** via SSH
4. **Setup fail2ban** untuk brute-force protection
5. **Backup database** secara berkala (Supabase sudah auto-backup)
6. **Hide `.env.local`** - jangan expose ke public

---

## 📝 Server Specs Recommendation

### Minimum:
- CPU: 1 vCore
- RAM: 2GB
- Storage: 20GB SSD
- Bandwidth: 1TB/month

### Recommended:
- CPU: 2 vCore
- RAM: 4GB
- Storage: 40GB SSD
- Bandwidth: 2TB/month

---

## 🌐 DNS Setup (Jika Pakai Domain)

Di DNS Management (Cloudflare/Namecheap/dll):

```
Type: A Record
Name: @
Value: YOUR_VPS_IP
TTL: Auto

Type: A Record  
Name: www
Value: YOUR_VPS_IP
TTL: Auto
```

Tunggu propagasi DNS (5-60 menit).

---

## 🎉 Done!

Aplikasi sekarang sudah live di:
- **HTTP:** `http://your-domain.com`
- **HTTPS:** `https://your-domain.com` (jika setup SSL)
- **Atau via IP:** `http://your-vps-ip`

Support: jika ada masalah, cek logs dengan `pm2 logs tanyajoko`
