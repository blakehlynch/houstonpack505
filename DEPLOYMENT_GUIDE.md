# Cub Scouts Pack 505 — Website & Deployment Guide

> **Say goodbye to $30/month Wix fees!**  
> This directory contains the complete, modern, standalone HTML5/CSS3/JavaScript website for **Cub Scouts Pack 505 (Houston, Texas)**. It has zero Wix dependencies and can be hosted for **$0/month** on Cloudflare Pages, GitHub Pages, Netlify, or Vercel with your custom domain `houstonpack505.org`.

---

## 🌟 What's Included & Modern Features Added

1. **Clean, Fast, Responsive Architecture:**
   - Pure HTML5 + modern CSS3 (`assets/css/styles.css`) + vanilla JavaScript (`assets/js/main.js`).
   - 100% mobile-friendly with responsive dropdown navigation, smooth touch menus, and high-contrast accessibility.
   - All 76 authentic Pack 505 photos, logos, and badges stored locally in `assets/images/` (no broken image links when Wix is canceled).

2. **Recruitment & High-Impact Usability Features:**
   - **Sticky "Join Pack 505" CTAs & Direct Application Flow:** Direct links to the official BSA registration portal (`my.scouting.org`), plus an interactive inquiry form for prospective parents.
   - **Interactive Den Rank Explorer:** Visual interactive tabs on the homepage letting parents explore ranks from Kindergarten (Lions) through 5th Grade (Arrow of Light).
   - **Interactive Camping Packing Checklist:** Parents can check off items on their smartphones as they pack for campouts; checklist automatically saves state via `localStorage`, tracks packing percentage, and includes a print-friendly view.
   - **First-Timer Camping & New Parent FAQ Accordions:** Expandable Q&As covering gear, food, uniforms, Whittling Chip knife rules, bathroom facilities, and weather policies.
   - **Live Calendar Subscription Guide:** Step-by-step instructions for syncing Scoutbook Plus calendars to Apple iPhone/iCal, Google Calendar, and Outlook.
   - **Legacy URL Redirects:** All old Wix URL slugs (e.g. `links-1.html`, `register-contact.html`, `pinewood-derby.html`, `for-den-leaders.html`, etc.) automatically redirect to ensure old flyers and bookmarks never break.
   - **SEO & Search Visibility:** Complete `sitemap.xml` and `robots.txt` included.

---

## 📂 Site Page Structure

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | `index.html` | Hero, stats, who we are, interactive Den explorer, signature events, recruitment CTA, map |
| **About Us** | `about.html` | History (30+ yrs Pack, 80+ yrs SVdP legacy), Scout Oath/Law, meeting schedules, all-volunteer philosophy, transparent dues |
| **Activities Hub** | `activities.html` | Visual overview of camping, Pinewood Derby, Blue & Gold, Water Balloon Monsoon, service projects, and photo memories |
| **Family Camping** | `family-camping.html` | Complete guide to car camping, interactive packing checklist, camp rules, medical forms, and first-timer FAQ |
| **Pinewood Derby** | `pinewood-derby.html` | Event details, official 5.0 oz rules, car dimensions, speed tips, and demolition derby |
| **STEM Awards** | `stem.html` | STEM Nova pins, Supernova medals, 4-step earning guide, counselor directory, and mentor contacts |
| **Awards** | `awards.html` | Religious emblems (Catholic & all faiths), Recruiter Strip, Texas Badge, San Jacinto Award, Winter Camper |
| **Calendar** | `calendar.html` | Meeting times (1st Thursday @ SVdP), annual rhythm, and Scoutbook live calendar sync guide |
| **Join Pack 505** | `join.html` | Direct BSA registration links, step-by-step joining guide, grade eligibility, prospective scout inquiry form |
| **Resources** | `resources.html` | Scoutbook link, private Facebook group, Houston Scout Shop location/hours, downloadable medical forms |
| **Leaders Hub** | `leaders.html` | Akela's Corner, Youth Protection Training (YPT), BALOO outdoor training, Den Leader playbook, adult awards |
| **News** | `news.html` | Announcements, Rice Owls Scout Day, summer scavenger hunt, pack highlights |

---

## 🚀 How to Preview Locally

You can test and view the website immediately on your computer:

### Option 1: Direct File Open
Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Option 2: Local Python Server (Recommended)
Open a terminal / PowerShell window in this folder and run:
```bash
python -m http.server 8000
```
Then visit **`http://localhost:8000`** in your browser.

---

## 🌐 How to Host for $0/Month (Zero Hosting Fees)

### Option A: Cloudflare Pages (Recommended — Fastest & Free SSL)
1. Sign up for a free account at [Cloudflare.com](https://www.cloudflare.com/).
2. In the dashboard, go to **Workers & Pages** → **Create application** → **Pages**.
3. **Upload Assets:** Drag and drop this website folder directly into Cloudflare Pages.
4. **Custom Domain:** Go to the **Custom domains** tab in your Pages project, enter `www.houstonpack505.org` and `houstonpack505.org`.
5. Cloudflare will provide DNS records (CNAME) to enter at your domain registrar. Cloudflare provides free automated SSL/HTTPS certificates and global CDN caching forever!

---

### Option B: GitHub Pages (100% Free & Easy Version Control)
1. Create a free account at [GitHub.com](https://github.com/).
2. Create a new repository named `houstonpack505` (set to Public).
3. Push or upload all files from this folder to the repository root.
4. Go to **Settings** → **Pages**.
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. Under **Custom domain**, enter `www.houstonpack505.org` (the included `CNAME` file handles this automatically).
7. Check the box for **Enforce HTTPS**.

---

### Option C: Netlify Drop (Instant Drag-and-Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this folder directly into the browser window.
3. Your site is live in under 10 seconds!
4. Go to **Domain management** → **Add custom domain** → enter `www.houstonpack505.org`.

---

## ⚙️ Domain DNS Configuration (Pointing your domain)

At whichever registrar you bought `houstonpack505.org` (e.g. GoDaddy, Namecheap, Google Domains, Squarespace, Cloudflare):

1. **For `www.houstonpack505.org`:**
   - **Type:** `CNAME`
   - **Name / Host:** `www`
   - **Value / Target:** Your Cloudflare Pages URL (e.g. `houstonpack505.pages.dev`) or GitHub Pages URL (`yourusername.github.io`).

2. **For root domain `houstonpack505.org`:**
   - Set up standard URL forwarding/redirect to `https://www.houstonpack505.org` (or set the A records provided by your host).

---

## 🛑 How to Safely Cancel Wix

Once your new site is live on Cloudflare Pages or GitHub Pages:
1. Verify `https://www.houstonpack505.org` opens the new fast website.
2. In your Wix account dashboard, go to **Subscriptions** → **Premium Subscriptions**.
3. Select the Website Plan and choose **Cancel Auto-Renew** (or cancel the plan).
4. *Important:* If your domain `houstonpack505.org` was registered through Wix, you can either keep just the domain renewal active (typically ~$15/year) or transfer the domain registration to Cloudflare Registrar or Namecheap for ~$10/year.
5. **Annual savings:** **$360.00 / year** saved directly for Pack 505!
