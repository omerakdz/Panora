# SEO Optimalisatie Guide voor PANORA - Ruitenwasser Gent

## ✅ Technische SEO - Geïmplementeerd

De volgende technische SEO optimalisaties zijn al toegepast:

### 1. Sitemap & Robots.txt ✅

- `sitemap.xml` - automatisch gegenereerd voor alle pagina's
- `robots.txt` - zodat Google je site kan indexeren

### 2. Metadata Optimalisatie ✅

- SEO-vriendelijke titles met lokale keywords
- Uitgebreide meta descriptions
- Keywords: ruitenwasser gent, ramenwasser gent, glazenwasser gent
- Open Graph tags voor social media delen
- Twitter Card markup

### 3. Gestructureerde Data (Schema.org) ✅

- LocalBusiness markup - vertelt Google dat je een lokaal bedrijf bent
- Service offering markup - beschrijft je diensten
- Contact informatie - telefoon, email, adres
- Openingstijden - zodat Google dit kan tonen
- Breadcrumb navigatie

### 4. Performance & Technisch ✅

- Security headers geconfigureerd
- Font optimization (display: swap)
- Responsive images

---

## 🚀 Volgende Stappen - Voor Hogere Rankings

### 1. **Google Business Profile Optimalisatie** (BELANGRIJK!)

Aangezien je al een Business Profiel hebt:

#### A. Optimaliseer je profiel volledig:

- ✅ Bedrijfsnaam: "PANORA - Ruitenwasser Gent"
- ✅ Categorie: "Ruitenwasser" (primair) + "Schoonmaakservice", "Glasreiniger"
- ✅ Beschrijving: Gebruik keywords natuurlijk:
  ```
  PANORA is uw professionele ruitenwasser in Gent en omgeving.
  Wij bieden snelle, betrouwbare glasreiniging voor particulieren
  en bedrijven. ✓ Directe online reservatie ✓ Vaste prijzen
  ✓ Geen verborgen kosten. Actief in Gent, Mariakerke, Drongen,
  Sint-Amandsberg en omgeving.
  ```
- ✅ Adres: Volledig en correct (NAP consistentie!)
- ✅ Telefoon: Exact hetzelfde nummer als op je website
- ✅ Website URL: Link naar https://www.panora.be
- ✅ Foto's: Upload minimaal 10-20 kwalitatieve foto's:
  - Logo
  - Voor/na foto's van ruitenwas
  - Team foto's
  - Werkfoto's (aan het werk)
  - Foto's van verschillende types woningen
- ✅ Openingstijden: Correct en up-to-date
- ✅ Attributen: Vink alles aan dat van toepassing is
- ✅ Services: Voeg al je diensten toe
- ✅ Q&A: Beantwoord veelgestelde vragen

#### B. Reviews verzamelen (CRUCIAAL voor ranking!)

- Vraag **elke klant** na een klus om een review
- Minimaal doel: 20+ reviews met 4.5+ sterren
- Reageer op ELKE review (positief én negatief)
- Review template voor klanten:
  ```
  Zou je ons willen helpen met een review?
  Zoek op Google naar "PANORA Gent" en klik op "Review schrijven"
  ```

#### C. Google Posts

- Plaats wekelijks een update/aanbieding
- Gebruik lokale keywords in je posts
- Voeg foto's toe aan elke post

### 2. **NAP Consistentie** (Name, Address, Phone)

Zorg dat EXACT dezelfde bedrijfsgegevens staan op:

- Je website (footer, contact pagina)
- Google Business Profiel
- Facebook bedrijfspagina
- Eventuele andere online vermeldingen

📝 **LET OP**: Gebruik overal exact hetzelfde formaat:

- Bedrijfsnaam: "PANORA"
- Telefoon: "+32 xxx xxx xxx" (exact hetzelfde nummer overal!)
- Adres: Exact hetzelfde formaat

### 3. **Content Marketing voor Lokale SEO**

Voeg een blog toe met lokale content:

#### Artikel ideeën:

1. "Ruitenwasser Gent: Prijzen & Wat U Moet Weten"
2. "Hoe Vaak Moet Je Je Ramen Laten Wassen in Gent?"
3. "Ramen Wassen in de Winter: Tips voor Gentse Huiseigenaren"
4. "Complete Gids: Professionele Ruitenwasser in Gent Kiezen"

#### SEO tips voor artikelen:

- Gebruik lokale keywords: "Gent", "Mariakerke", "Drongen", etc.
- Benoem wijken en randgemeenten waar je actief bent
- Voeg afbeeldingen toe met ALT tags
- Link naar je service pagina's

### 4. **Backlinks Strategie**

Krijg links naar je website van:

#### A. Lokale directories:

- Goudengids.be
- Bel.be
- Trustpilot
- Lokale bedrijvengidsen Gent

#### B. Lokale partnerships:

- Contact makelaar/immobiliën (samenwerking voor klanten)
- Schoonmaakbedrijven (wederzijdse verwijzingen)
- Bouw/renovatiebedrijven
- Lokale blogs over wonen in Gent

#### C. Sociale Media:

- Facebook Business Page (actief onderhouden)
- Instagram met lokale hashtags (#gentcity #gentje #loveghent)

### 5. **Website Optimalisaties**

#### A. Voeg lokale content toe:

In `lib/constants.ts` - voeg bedrijfsadres toe:

```typescript
export const COMPANY = {
  name: "PANORA",
  tagline: "Professionele ramenwas in Gent",
  address: {
    street: "Je straatnaam + nummer", // VOEG TOE
    postalCode: "9000", // VOEG TOE
    city: "Gent",
    country: "België",
  },
  // ... rest
};
```

#### B. Content updates voor homepage:

Voeg een sectie toe over werkgebied:

- "Actief in heel Gent en omgeving"
- Noem specifieke postcodes/wijken
- Dit helpt voor long-tail searches zoals "ruitenwasser mariakerke"

### 6. **Google Search Console Setup**

1. Ga naar: https://search.google.com/search-console
2. Voeg je website toe
3. Verifieer eigendom (via Google Analytics of HTML tag)
4. Dien je sitemap in: `https://www.panora.be/sitemap.xml`
5. Bekijk welke keywords je al binnenhaalt
6. Fix eventuele indexeringsproblemen

#### Voeg verification code toe:

Na verificatie in Search Console, update `app/layout.tsx`:

```typescript
verification: {
  google: 'je_verification_code_hier',
},
```

### 7. **Google Analytics 4 Setup**

Je hebt al Google Ads tracking, voeg ook GA4 toe:

- Volg conversies (geboekte afspraken)
- Bekijk welke zoekwoorden verkeer brengen
- Analyseer gebruikersgedrag

### 8. **Lokale Keywords Toevoegen**

Update content met long-tail keywords:

- "ruitenwasser gent centrum"
- "ramenwasser prijzen gent"
- "goedkope ruitenwasser gent"
- "professionele glazenwasser gent"
- "ramen wassen gent kosten"
- "ruitenwasser gent en omgeving"

### 9. **Page Speed Optimalisatie**

Test je site op: https://pagespeed.web.dev/

Verbeterpunten:

- Comprimeer afbeeldingen (gebruik WebP formaat)
- Implementeer lazy loading voor images
- Minimaliseer JavaScript/CSS

### 10. **Social Proof Uitbreiden**

- Toon Google reviews op je website
- Voeg klantfoto's toe (met toestemming)
- Case studies van tevreden klanten
- Voor/na foto's

---

## 📊 Tracking & Monitoring

### Week 1-2:

- [ ] Google Business Profile volledig geoptimaliseerd
- [ ] Eerste 10 reviews verzameld
- [ ] Google Search Console actief
- [ ] Sitemap ingediend

### Week 3-4:

- [ ] 20+ reviews op Google
- [ ] 3-5 lokale directory listings
- [ ] Eerste blog artikel live
- [ ] Social media actief

### Maand 2:

- [ ] Check rankings voor "ruitenwasser gent"
- [ ] Analyseer Search Console data
- [ ] Optimaliseer op basis van data
- [ ] Meer content toevoegen

### Maand 3+:

- [ ] Top 3 lokale ranking bereikt
- [ ] 50+ reviews
- [ ] Regelmatige content updates
- [ ] Partnership met lokale bedrijven

---

## 🎯 Belangrijkste Succesfactoren

### Top 3 voor Lokale Rankings:

1. **Google Business Profile** - 40% van je succes
   - Volledigheid profiel
   - Aantal & kwaliteit reviews
   - Regelmatige updates

2. **Reviews** - 30% van je succes
   - Minimum 20+ reviews met 4.5+ sterren
   - Reageren op reviews
   - Recente reviews (blijf verzamelen!)

3. **Website Quality** - 30% van je succes
   - Lokale keywords in content
   - Technische SEO (✅ gedaan)
   - NAP consistentie
   - Backlinks van lokale sites

---

## ⚠️ Veelvoorkomende Fouten Vermijden

❌ **NIET DOEN:**

- Keyword stuffing ("ruitenwasser gent" 50x op elke pagina)
- Fake reviews kopen
- Exact dezelfde content als concurrenten
- Adres/telefoonnummer veranderen zonder redirects
- Spammy backlinks kopen

✅ **WEL DOEN:**

- Natuurlijk schrijven met keywords
- Echte klanten vragen om reviews
- Unieke, waardevolle content schrijven
- NAP consistentie behouden
- Kwaliteit backlinks opbouwen

---

## 📞 Quick Wins - Start Vandaag

1. ✅ **Google Business Profile updaten** (30 min)
   - Verbeter beschrijving
   - Upload 10 foto's
   - Voeg services toe

2. ✅ **Vraag eerste 5 reviews** (15 min)
   - Stuur bericht naar recente klanten
   - Geef exacte instructies

3. ✅ **Meld aan bij directories** (1 uur)
   - Goudengids
   - Bel.be
   - Trustpilot

4. ✅ **Post op Social Media** (30 min)
   - Facebook post over diensten in Gent
   - Instagram foto met #gentcity

---

## 🔍 SEO Checklist

### Technisch (✅ Gedaan):

- [x] Sitemap.xml
- [x] Robots.txt
- [x] Structured data (Schema.org)
- [x] Meta tags geoptimaliseerd
- [x] Mobile-friendly design
- [x] HTTPS security
- [x] Fast loading

### Content (TODO):

- [ ] Blog sectie aanmaken
- [ ] Lokale content schrijven
- [ ] Service pagina's uitbreiden
- [ ] FAQ pagina toevoegen
- [ ] Testimonials sectie

### Off-Page (TODO):

- [ ] Google Business volledig
- [ ] 20+ reviews verzamelen
- [ ] Directory listings
- [ ] Social media profielen
- [ ] Lokale backlinks

---

## 📈 Verwachte Resultaten

### Week 1-4:

- Website begint te verschijnen in lokale zoekresultaten
- Google Business Profile krijgt meer views

### Maand 2-3:

- Top 10 positie voor "ruitenwasser gent"
- Eerste organische boekingen via Google

### Maand 4-6:

- Top 3 positie voor "ruitenwasser gent"
- Regelmatige aanvragen via organisch zoekverkeer
- "Local Pack" (Top 3 map resultaten) positie

### Let op:

SEO is een lange-termijn strategie. Eerste resultaten zijn zichtbaar na 4-8 weken, maar volledige impact na 3-6 maanden.

---

## 💡 Extra Tips

### Voice Search Optimalisatie:

Mensen zoeken ook via stem:

- "beste ruitenwasser in de buurt"
- "ruitenwasser gent prijzen"
- "wie wast ramen in gent"

Optimaliseer hiervoor met:

- Natuurlijke taal in content
- FAQ sectie met complete zinnen
- Long-tail keywords

### Seizoensgebonden Content:

- Lente: "Voorjaarsschoonmaak ramen Gent"
- Zomer: "Ramen wassen zomerklaar Gent"
- Herfst: "Ramen schoonmaken na herfst"
- Winter: "Ramen wassen winter Gent"

---

## 🛠️ Handige Tools

- **Google Search Console**: https://search.google.com/search-console
- **Google Business Profile**: https://business.google.com
- **Google Analytics**: https://analytics.google.com
- **Page Speed Test**: https://pagespeed.web.dev
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Schema Markup Validator**: https://validator.schema.org
- **Rich Results Test**: https://search.google.com/test/rich-results

---

## 📝 Domein Update Vereist

In de volgende bestanden moet je **"https://www.panora.be"** vervangen door je echte domein:

1. `app/sitemap.ts` - regel 4
2. `app/layout.tsx` - metadata.metadataBase
3. `components/StructuredData.tsx` - alle URLs

Zoek naar "panora.be" en vervang met je echte domein.

---

**Succes met je SEO! 🚀**

Bij vragen kun je altijd dit document raadplegen of contact opnemen met een SEO specialist voor lokale bedrijven.
