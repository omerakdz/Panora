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
3. Commit en push:
   ```bash
   git add .
   git commit -m "Add keep-alive workflow"
   git push
   ```
4. Ga naar GitHub → je repository → Actions tab
5. Klik "Enable Actions" als dat nodig is

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

## 🧪 Testen

Test het endpoint direct:

```bash
# Lokaal testen
curl http://localhost:3000/api/keep-alive

# Live testen
curl https://jouw-website.vercel.app/api/keep-alive
```

Je zou moeten zien:

```json
{
  "success": true,
  "message": "Database is active",
  "timestamp": "2026-03-30T12:00:00.000Z"
}
```

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
