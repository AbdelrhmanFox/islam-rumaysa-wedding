# Eslam & Romisaa — Wedding Invitation

- **URL:** https://islam-rumaysa.s3odyn8n.tech
- **Language:** English only
- **Date:** Tuesday 17 November 2026, 7:00 PM (`Africa/Cairo`)
- **Maps:** https://maps.google.com/?q=30.111267,31.243286

## Hosting (shared nginx)

Served from the **same** container as Ahmed & Nada (`ahmed-nada-wedding-deploy-web-1`):

| Host | Site root |
|------|-----------|
| `wedding.s3odyn8n.tech` | `/usr/share/nginx/sites/ahmed-nada` |
| `islam-rumaysa.s3odyn8n.tech` | `/usr/share/nginx/sites/islam-rumaysa` |

## Deploy

```powershell
node scripts/local/wedding-deploy.mjs --host
node scripts/local/wedding-deploy.mjs --site islam-rumaysa --quick
```

Source: `projects/islam-rumaysa-wedding/`
