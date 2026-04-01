# Supabase Database Keep-Alive Setup

Supabase pauzeerd gratis databases na 7 dagen inactiviteit. Deze oplossingen houden je database actief.

## 📋 Wat is er gemaakt?

- **API Endpoint**: `/api/keep-alive` - Doet een simpele database query
- **Vercel Cron**: `vercel.json` - Automatisch op Vercel
- **GitHub Actions**: `.github/workflows/keep-alive.yml` - Gratis alternatief

## 🚀 Kies je methode

### ✅ Optie 1: Vercel Cron (AANBEVOLEN)

**Als je op Vercel host:**

1. De `vercel.json` is al klaar
2. Deploy je website: `git push`
3. Vercel draait automatisch elke woensdag het endpoint

**Voordeel**: Geen extra configuratie nodig!

### ✅ Optie 2: GitHub Actions

1. Open `.github/workflows/keep-alive.yml`
2. Vervang `https://jouw-website.vercel.app` met je echte URL
3. **(Optioneel)** Voeg API key toe als GitHub Secret:
   - Ga naar GitHub repository → Settings → Secrets and variables → Actions
   - Klik "New repository secret"
   - Name: `KEEP_ALIVE_API_KEY`
   - Secret: Jouw geheime sleutel (zelfde als in .env)
4. Commit en push:
   ```bash
   git add .
   git commit -m "Add keep-alive workflow"
   git push
   ```
5. Ga naar GitHub → je repository → Actions tab
6. Klik "Enable Actions" als dat nodig is

**Voordeel**: Werkt altijd, ook als je niet op Vercel host!

### ✅ Optie 3: Externe Cron Service (Geen code)

Gebruik een gratis service zoals [cron-job.org](https://cron-job.org):

1. Maak een gratis account
2. Maak een nieuwe cron job:
   - URL: `https://jouw-website.vercel.app/api/keep-alive`
   - Schedule: Elke week woensdag
3. Klaar!

**Voordeel**: Simpelste optie, geen GitHub/Vercel configuratie nodig!

## 📅 Hoe vaak moet het draaien?

Supabase pauzeerd na **7 dagen** inactiviteit. Elke 3-4 dagen is veilig:

- **Huidige setup**: Elke woensdag om 12:00 (1x per week)
- **Schema aanpassen**:
  - Vercel: Pas `vercel.json` aan → `"schedule": "0 0 * * 1,4"` (ma & do)
  - GitHub Actions: Pas `.github/workflows/keep-alive.yml` aan

### Cron Schedule Voorbeelden

```
0 0 * * 3      → Elke woensdag om 00:00
0 12 * * 1,4   → Elke maandag en donderdag om 12:00
0 0 */3 * *    → Elke 3 dagen om 00:00
```

## 🔒 Beveiliging (Optioneel)

Voor extra veiligheid kun je een API key instellen:

1. Voeg toe aan `.env.local`:

   ```bash
   KEEP_ALIVE_API_KEY=jouw_geheime_sleutel_hier
   ```

2. Voeg dezelfde key toe in Vercel:
   - Dashboard → Settings → Environment Variables
   - Key: `KEEP_ALIVE_API_KEY`
   - Value: Dezelfde sleutel

3. Update je cron jobs om de key mee te sturen:
   ```bash
   curl -H "x-api-key: jouw_sleutel" https://your-site.vercel.app/api/keep-alive
   ```

> **Tip**: Als je geen API key instelt, werkt het endpoint nog steeds maar met alleen rate limiting.

## 🧪 Testen

Test het endpoint direct:

```bash
# Lokaal testen (basis)
curl http://localhost:3000/api/keep-alive

# Live testen met volledige response
curl -i https://jouw-website.vercel.app/api/keep-alive

# Met API key (indien ingesteld)
curl -H "x-api-key: jouw_sleutel" https://jouw-website.vercel.app/api/keep-alive
```

Je zou een response als deze moeten zien:

```json
{
  "success": true,
  "status": "healthy",
  "message": "Database is fully operational",
  "timestamp": "2026-04-01T12:00:00.000Z",
  "metadata": {
    "responseTime": 145,
    "version": "1.0.0",
    "environment": "production"
  }
}
```

### Response Status Codes

- **200**: Alles werkt perfect (`healthy` of `degraded`)
- **429**: Rate limit bereikt (max 10 requests per uur)
- **401**: Ongeldige API key (als je beveiliging hebt ingeschakeld)
- **500/503**: Database error - controleer Supabase

### Health Status Types

- **healthy**: Database reageert snel (< 2 seconden)
- **degraded**: Database werkt maar is traag (> 2 seconden)
- **unhealthy**: Database error of niet bereikbaar

## ❓ FAQ

**Kost dit geld?**

- Vercel Cron: Gratis in Hobby plan
- GitHub Actions: Gratis (2000 minuten/maand)
- Externe cron: Gratis opties beschikbaar

**Wat als ik echte bookings heb?**
Dan is je database al actief en is dit niet nodig! Maar het kan geen kwaad als backup.

**Hoe weet ik of het werkt?**

- Vercel: Check logs in Vercel dashboard
- GitHub Actions: Check Actions tab op GitHub
- Externe cron: Check de service dashboard

## 🎯 Mijn aanbeveling

1. **Gebruik Vercel Cron** als je op Vercel host (al configured!)
2. **Gebruik GitHub Actions** als je elders host
3. **Gebruik externe cron** als je de simpelste setup wilt

Succes! 🚀
