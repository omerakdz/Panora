# PANORA

PANORA is een online boekingsplatform voor professionele ramenwas in Gent en omgeving. Bezoekers berekenen online de prijs, bekijken beschikbare tijdsloten en kunnen meteen een afspraak aanvragen.

## Wat kan het platform?

- Een stapsgewijze calculator voor ramen, woningtype en extra diensten.
- Online afspraken boeken en klantgegevens veilig laten valideren.
- Beschikbaarheid combineren uit boekingen in Supabase en, wanneer ingesteld, Google Calendar.
- Klant- en interne e-mailbevestigingen versturen via SMTP.
- Diensten, klantreviews, contactinformatie en bedrijfsinformatie presenteren.
- Een responsieve website aanbieden voor desktop en mobiel.

## Technologie

- Next.js 16 met App Router
- React 19 en TypeScript
- Tailwind CSS 4
- Supabase voor boekingsgegevens
- Google Calendar API voor beschikbaarheid en afspraken
- Nodemailer voor e-mail

## Lokaal starten

Vereist: Node.js 20.9 of hoger en npm.

1. Installeer de dependencies:

   ```bash
   npm install
   ```

2. Maak in de projectroot een `.env.local`-bestand aan en voeg de benodigde configuratie toe (zie hieronder).
3. Start de ontwikkelserver:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Om een productiebuild te maken en lokaal te starten:

```bash
npm run build
npm run start
```

## Omgevingsvariabelen

### Supabase (vereist voor boekingen)

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

De app verwacht een Supabase-tabel `bookings`. De server gebruikt de service-role key voor boekingen; houd deze key geheim en zet hem nooit in een `NEXT_PUBLIC_`-variabele.

### Google Calendar (optioneel)

Zonder deze instellingen gebruikt de beschikbaarheidscontrole de boekingen uit Supabase. Voeg de volgende variabelen toe om ook agenda-events mee te nemen:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=primary
```

Voor meerdere agenda's kun je `GOOGLE_CALENDAR_ID` vervangen door `GOOGLE_CALENDAR_IDS`, met komma-gescheiden agenda-ID's. De volledige configuratie staat in [GOOGLE-CALENDAR-SYNC-SETUP.md](GOOGLE-CALENDAR-SYNC-SETUP.md).

### E-mail (optioneel)

Vereist voor het versturen van boekingsbevestigingen en contactmails:

```env
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=
INTERNAL_EMAIL=
```

### Google Reviews (optioneel)

Als deze waarden niet zijn ingesteld, gebruikt de reviews-route de ingebouwde terugvalreviews.

```env
GOOGLE_PLACE_ID=
GOOGLE_MAPS_API_KEY=
```

De website ondersteunt daarnaast optionele publieksinstellingen, zoals `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY`, `NEXT_PUBLIC_CONTACT_WHATSAPP` en `NEXT_PUBLIC_VAT_NUMBER`.

> Zet echte sleutels en wachtwoorden nooit in Git. Gebruik lokaal `.env.local` en configureer productievariabelen via de hostingprovider.

## Projectstructuur

```text
app/                 Pagina's en API-routes van Next.js
  api/               Prijs, beschikbaarheid, boekingen, contact en reviews
components/          Interface- en calculatorcomponenten
hooks/               Hooks voor calculator en boekingsflow
lib/                 Prijslogica, agenda, Supabase en hulpfuncties
public/              Afbeeldingen en andere statische bestanden
```

## Beschikbare scripts

| Script                    | Doel                              |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Start de lokale ontwikkelserver   |
| `npm run build`           | Maakt een productiebuild          |
| `npm run start`           | Start de productiebuild           |
| `npm run lint`            | Voert ESLint uit                  |
| `npm run optimize:images` | Optimaliseert projectafbeeldingen |

## Licentie

© 2026 Ömer Akdeniz\. Alle rechten voorbehouden\.

Dit project is eigendom van de auteursrechthebbende\. De broncode en andere originele materialen in deze repository mogen niet zonder voorafgaande schriftelijke toestemming worden gekopieerd, gewijzigd, verspreid, gepubliceerd of commercieel gebruikt\.

Zie het [`LICENSE`](./LICENSE)\-bestand voor de volledige licentievoorwaarden\.
