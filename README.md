# Stop Price Calculator

A clean, mobile-friendly stock stop price calculator. Enter your cost base, current price, and safeline % to instantly see your stop price and gain protected.

**Formula:** `stop price = ((current price - cost base) × safeline%) + cost base`

---

## Project structure

```
stop-price-calculator/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles (add new page styles here)
├── js/
│   └── calculator.js   ← Calculator logic (add new tools here)
└── README.md
```

---

## How to deploy on GitHub Pages (free hosting)

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon → **New repository**
3. Name it `stop-price-calculator`
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload your files

On the repository page, click **uploading an existing file** and drag in all the files — keeping the folder structure:
- `index.html` (root)
- `css/style.css`
- `js/calculator.js`
- `README.md`

Click **Commit changes**.

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `main`, folder: `/ (root)`
4. Click **Save**

Your site will be live in ~60 seconds at:
```
https://YOUR-GITHUB-USERNAME.github.io/stop-price-calculator/
```

---

## How to make updates later

1. Edit files locally (or directly on GitHub)
2. Commit and push to `main`
3. GitHub Pages auto-deploys within ~30 seconds

---

## Adding new features later

- **New tool/page** → add a new `.html` file (e.g. `position-size.html`) and link to it from `index.html`
- **Shared styles** → add to `css/style.css` under a new numbered section
- **New JS logic** → add a new file under `js/` and reference it in the relevant HTML page
- **Custom domain** → add a `CNAME` file to the repo root with your domain name, then point your DNS to GitHub Pages

---

## Tech stack

- Plain HTML, CSS, JavaScript — no build tools, no frameworks, no dependencies to manage
- External: [Tabler Icons](https://tabler-icons.io/) (icon font via CDN)
- Hosting: GitHub Pages (free, HTTPS, auto-deploy)
