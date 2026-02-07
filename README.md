# Talia's Homepage

Static site for Cloudflare Pages free tier.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Add projects

Drop project pages in `projects/` as `.html` files (example:
`projects/hello-world.html`).

To refresh the local project list:

```bash
node scripts/generate-projects-manifest.mjs
```

The deploy workflow generates this manifest automatically on every push to
`main`.

## Auto-deploy to Cloudflare Pages

This repo includes a GitHub Actions workflow at
`.github/workflows/deploy-cloudflare-pages.yml`.

On every push to `main`, GitHub Actions deploys the site to Cloudflare Pages.

### One-time setup

1. Create a Cloudflare Pages project.
2. In GitHub repository settings, add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. In GitHub repository settings, add variable:
   - `CLOUDFLARE_PROJECT_NAME` (your Pages project name)
4. Push to `main`.

Notes:
- Alternate secret names also supported: `CF_API_TOKEN`, `CF_ACCOUNT_ID`.
- Alternate variable name also supported: `CF_PAGES_PROJECT`.
- If no project variable is set, workflow falls back to the GitHub repository name.
- Workflow attempts to create the Pages project automatically before deploy.
