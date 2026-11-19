# Cub Scouts Pack 505 Website

Website for Cub Scouts Pack 505 (Houston, TX): **https://www.houstonpack505.org**

It's plain HTML and CSS: no build step, no framework. The site is hosted on **GitHub Pages** from the `main` branch,
so edit a file, commit, push to `main`, and the site updates within a minute or two.

## Pages

| File | What's on it |
| --- | --- |
| `index.html` | Home: what Cub Scouting is, ranks by grade, meeting time/place, contact |
| `about.html` | About & Activities: who we are, how dens/pack meetings work, activities, photos |
| `join.html` | How to join, cost, common questions |
| `resources.html` | Official Scouting links, pack links, forms |
| `leaders.html` | Leader training, tips, adult awards |
| `404.html` | "Page not found" page |

Other files:

- `assets/css/styles.css`: all styling (colors are set at the top under `:root`)
- `assets/js/main.js`: mobile menu, plus highlighting the current page in the nav
- `assets/images/`: photos, the logo, and the rank badges
- `sitemap.xml`: list of pages for search engines (update it if you add or remove a page)

## Common Updates

**Each year, check:**
- Pack dues amount: `join.html` (search for "Pack 505 dues")
- Meeting day/time/location: `index.html`, `about.html`, `join.html`, and the footer
- That external links still work (Scouting.org sometimes moves pages)

**Change the header or footer (nav links, address, email):**
The header and footer are copied into every page between the comments
`<!-- ===== HEADER ... -->` / `<!-- ===== END HEADER ===== -->` and
`<!-- ===== FOOTER ... -->` / `<!-- ===== END FOOTER ===== -->`.
Edit one page, then paste the same block into the other pages. They should stay identical.
You don't need to mark the current page in the nav; `main.js` does that automatically.

**Add a photo to the gallery:**
Put the image in `assets/images/` (use a short lowercase name like `campout-2026-fall.jpg`, ideally under 500 KB),
then copy one `<div class="gallery-item">` line in `about.html` and change the file name, alt text, and caption.

**Add a new page:**
Copy an existing page (e.g. `leaders.html`), replace the content between `<main>` and `</main>`,
add a nav link to the header on *every* page, and add the page to `sitemap.xml`.
Before you add one, consider whether the content fits on an existing page or whether a link to an official site would do.

## Content Guidelines

- Keep it short. Link to official sources (scouting.org, shacbsa.org) for program details, rules, and fees instead of copying them here, so they don't go out of date.
- Use the role email `pack505svdp@gmail.com` rather than leaders' personal names or emails.
- Time-sensitive announcements belong in the pack Facebook group, not on the website.

## Preview Locally

Open `index.html` in a browser, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.
