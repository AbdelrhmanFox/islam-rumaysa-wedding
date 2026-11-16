# Eslam & Romisaa — Wedding Invitation

- **URL:** https://islam-rumaysa.s3odyn8n.tech
- **Host:** GitHub Pages (`AbdelrhmanFox/islam-rumaysa-wedding`) — free static, off VPS
- **Language:** English only
- **Date:** Tuesday 17 November 2026, 7:00 PM (`Africa/Cairo`)
- **Maps:** https://maps.google.com/?q=30.111267,31.243286

## Hosting

| Item | Value |
|------|-------|
| Repo | https://github.com/AbdelrhmanFox/islam-rumaysa-wedding |
| Pages | Actions workflow `.github/workflows/deploy-pages.yml` |
| DNS | Cloudflare `CNAME islam-rumaysa` → `abdelrhmanfox.github.io` (**DNS only**) |
| Custom domain | `public/CNAME` = `islam-rumaysa.s3odyn8n.tech` |

Ahmed & Nada remains on the VPS nginx host (`wedding.s3odyn8n.tech`).

## Deploy

```powershell
# From a clone of AbdelrhmanFox/islam-rumaysa-wedding (or push from projects/islam-rumaysa-wedding)
git push origin main
# GitHub Actions builds and publishes Pages automatically
```

DNS helper (Cloudflare cutover / repair):

```powershell
node scripts/local/islam-rumaysa-pages-dns.mjs
```

Source in this monorepo: `projects/islam-rumaysa-wedding/`
