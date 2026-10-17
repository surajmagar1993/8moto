# 8MOTO — GoDaddy Node.js Hosting Deployment Guide

This guide explains how to deploy the **8Moto Full-Stack Web Platform & Admin Panel** on **GoDaddy Node.js Hosting** (cPanel / CloudLinux Passenger or VPS).

---

## 1. Architecture Overview for GoDaddy
- **Backend**: Express.js server running in [`server.js`](file:///c:/Users/suraj/Desktop/8moto/server.js).
- **Frontend**: High-performance React 19 + Tailwind CSS single-page application compiled into `dist/`.
- **Database**: Zero-configuration, atomic JSON document database in `data/database.json`. No external MySQL or MongoDB database setup is required.
- **Port Handling**: GoDaddy's Phusion Passenger injects `process.env.PORT` automatically. The server automatically binds to this port.

---

## 2. Deployment Steps on GoDaddy cPanel (Setup Node.js App)

### Step 1: Prepare the Files
Run the production build locally:
```bash
npm run build
```
This updates the compiled files in `dist/`.

Create a `.zip` archive containing:
- `dist/`
- `public/`
- `data/` (contains `database.json`)
- `server.js`
- `package.json`
- `package-lock.json`
*(Note: Do not upload the `node_modules` folder; you will install dependencies on GoDaddy).*

### Step 2: Upload Files via cPanel File Manager
1. Log in to your **GoDaddy Account** & open **cPanel**.
2. Go to **File Manager** and navigate to your application root (e.g., `public_html` or a subfolder like `public_html/8moto`).
3. Click **Upload** and upload your `.zip` file.
4. Extract the contents.

### Step 3: Configure Node.js App in cPanel
1. In cPanel, search for and click **"Setup Node.js App"**.
2. Click **"Create Application"**.
3. Fill in the fields:
   - **Node.js version**: Select **18.x**, **20.x**, or **22.x** (LTS recommended).
   - **Application mode**: Select **Production**.
   - **Application root**: Path where files were uploaded (e.g., `public_html` or `8moto`).
   - **Application URL**: Select your domain (e.g., `8moto.in` or `subdomain.8moto.in`).
   - **Application startup file**: Enter `server.js`.
4. Click **"Create"**.

### Step 4: Install Dependencies & Start
1. In the Node.js application management screen, click **"Run NPM Install"** (or use the provided terminal command to run `npm install --omit=dev`).
2. Click **"Restart"** application.
3. Visit your domain!

---

## 3. GoDaddy VPS / Dedicated Server (Alternative via PM2)

If you are using a GoDaddy Linux VPS (Ubuntu/CentOS/AlmaLinux):

1. Connect via SSH:
   ```bash
   ssh root@your-server-ip
   ```
2. Navigate to your project folder:
   ```bash
   cd /var/www/8moto
   ```
3. Install production dependencies & build:
   ```bash
   npm install --production
   npm run build
   ```
4. Start process with PM2 (daemon process manager):
   ```bash
   npm install -g pm2
   pm2 start server.js --name "8moto-app"
   pm2 save
   pm2 startup
   ```
5. Configure Nginx Reverse Proxy:
   ```nginx
   server {
       listen 80;
       server_name 8moto.in www.8moto.in;

       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 4. Admin Panel Credentials
- **Access URL**: Open your website and click the **"ADMIN"** lock button in the header navbar or footer.
- **Default Administrator Passkey**: `8moto2026`
- **Features in Admin**:
  - Edit Header Logo (text / image URL)
  - Edit Footer Logo, Bio, Basecamp location, Head Marshal
  - Switch Hero Background between **MP4 Loop Video** and **Static Image**
  - Add / Edit / Delete Expeditions with stages and gear requirements
  - Update Live Telemetry Stats
  - Review incoming user inquiries
