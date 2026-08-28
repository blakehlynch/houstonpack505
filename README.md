# Cub Scouts Pack 505 — Website Codebase

Official website recreation for **Cub Scouts Pack 505** (Houston, Texas), chartered by St. Vincent de Paul Catholic Church.

## Structure

```
├── assets/
│   ├── css/
│   │   └── styles.css          # Modern, responsive, accessible styles
│   ├── js/
│   │   └── main.js             # Mobile nav, rank tabs, checklist, FAQ accordions
│   └── images/                 # All authentic pack photos & logo assets
├── index.html                  # Homepage with hero, stats, den explorer & CTAs
├── about.html                  # About Pack 505, history, Oath/Law, dues & dens
├── activities.html             # Signature activities & traditions hub
├── family-camping.html         # Camping guide, interactive packing checklist & FAQ
├── pinewood-derby.html         # Derby rules, car specs, speed tips & photos
├── stem.html                   # STEM Nova & Supernova awards + mentor directory
├── awards.html                 # Religious emblems, Texas badge & recognitions
├── calendar.html               # Schedule & Scoutbook live sync guide
├── join.html                   # Registration guide & prospective parent inquiry
├── resources.html              # Scoutbook, Scout Shop, forms & links
├── leaders.html                # Akela's Corner, YPT, BALOO & den leader playbook
├── news.html                   # Announcements & pack highlights
├── CNAME                       # Custom domain for GitHub Pages / Cloudflare
├── sitemap.xml                 # Search engine sitemap
├── robots.txt                  # Search engine crawling rules
└── DEPLOYMENT_GUIDE.md         # $0/month free hosting & DNS setup guide
```

## Quick Start
Open `index.html` in any web browser or run:
```bash
python -m http.server 8000
```
Visit `http://localhost:8000`.
