# 🚀 IMAGE OPTIMIZATION GUIDE

## Wat is er gedaan?

### ✅ Code Optimalisaties (KLAAR)

1. **Alle `<img>` tags vervangen door Next.js `<Image>` component**
   - Automatische lazy loading
   - Responsive images (mobiel krijgt kleinere versie)
   - Modern formaten (WebP/AVIF)
   - Blur placeholder tijdens laden

2. **Next.js Image configuratie geoptimaliseerd**
   - WebP en AVIF formats ingeschakeld
   - Responsive device sizes
   - CDN caching

### 📦 Image Compressie Script (KLAAR)

Een automatisch script om je images te optimaliseren van PNG/JPEG → WebP

## 🎯 HOE TE GEBRUIKEN

### Stap 1: Run het optimalisatie script

```bash
npm run optimize:images
```

Dit script zal:

- ✅ Automatisch `sharp` installeren als het niet aanwezig is
- ✅ Alle PNG/JPEG images in `/public/images/` vinden
- ✅ Ze comprimeren naar WebP formaat (85% kwaliteit)
- ✅ Opslaan in `/public/images/optimized/`
- ✅ Een overzicht tonen van hoeveel je bespaart

### Stap 2: Review de geoptimaliseerde images

1. Open `/public/images/optimized/`
2. Vergelijk de kwaliteit met originelen
3. Check de bestandsgrootte

### Stap 3: Vervang originele images (OPTIONEEL)

Als je tevreden bent:

**WINDOWS:**

```bash
# Backup originelen
mkdir public/images/backup
xcopy public\\images\\*.png public\\images\\backup\\
xcopy public\\images\\*.jpg public\\images\\backup\\
xcopy public\\images\\*.jpeg public\\images\\backup\\

# Vervang met geoptimaliseerde versies
xcopy /Y public\\images\\optimized\\*.webp public\\images\\
```

**Linux/Mac:**

```bash
# Backup originelen
mkdir -p public/images/backup
cp public/images/*.{png,jpg,jpeg} public/images/backup/

# Vervang met geoptimaliseerde versies
cp public/images/optimized/*.webp public/images/
```

### Stap 4: Update bestandsextensies in code

Het Image Slider component gebruikt nog de oude PNG paths. Update:

In `app/page.tsx` (regel ~260):

```tsx
// VAN:
const sliderImages = [
  { src: "/images/1.png", alt: "..." },
  { src: "/images/2.png", alt: "..." },
  // ...
];

// NAAR:
const sliderImages = [
  { src: "/images/1.webp", alt: "..." },
  { src: "/images/2.webp", alt: "..." },
  // ...
];
```

## 📊 Verwachte Resultaten

### Voor optimalisatie:

```
1.png:        2.1 MB
2.png:        1.8 MB
3.png:        1.9 MB
4.png:        1.4 MB
testImage1:   1.6 MB
testImage2:   1.4 MB
testImage3:   1.7 MB
─────────────────────
TOTAAL:      11.9 MB
```

### Na optimalisatie:

```
1.webp:       ~150 KB  (-93%)
2.webp:       ~130 KB  (-93%)
3.webp:       ~140 KB  (-93%)
4.webp:       ~100 KB  (-93%)
testImage1:   ~120 KB  (-93%)
testImage2:   ~100 KB  (-93%)
testImage3:   ~130 KB  (-92%)
─────────────────────
TOTAAL:      ~870 KB  (-93% = 11 MB BESPAARD!)
```

## ⚡ Performance Impact

### Laadtijden (geschat):

- **4G mobiel** (10 Mbps): Van ~12s → ~1s
- **3G mobiel** (3 Mbps): Van ~35s → ~3s
- **Desktop** (50 Mbps): Van ~2.5s → ~0.2s

### Extra Next.js Image voordelen:

- Images buiten viewport laden NIET meer automatisch
- Mobiel krijgt 50-70% kleinere images
- Automatische WebP → AVIF upgrade voor moderne browsers

## 🎨 Kwaliteit

Bij 85% WebP kwaliteit:

- ✅ Voor het oog identiek aan origineel
- ✅ Perfect voor websites
- ✅ Geen zichtbare artifacten
- ✅ Scherpe edges blijven scherp

Je kunt de kwaliteit aanpassen in `optimize-images.js` (regel 10):

```js
const QUALITY = 85; // Verhoog naar 90 voor nog betere kwaliteit
```

## 🔧 Troubleshooting

### "Sharp installation failed"

```bash
# Installeer handmatig
npm install sharp
```

### "Permission denied"

Windows: Run terminal als Administrator
Linux/Mac: Voeg `sudo` toe aan commando's

### Images zien er wazig uit

Verhoog quality in script van 85 → 90 en run opnieuw

## 📝 Samenvatting

✅ **Code geoptimaliseerd** - Alle img tags zijn nu Next.js Image components
✅ **Script klaar** - Run `npm run optimize:images`
✅ **Config klaar** - Next.js is geconfigureerd voor beste performance
⏳ **Jouw actie** - Run het script en check de resultaten!

**Expected result:** 10-15x snellere site, geen zichtbaar kwaliteitsverlies! 🚀
