# 🔓 Hoe Price Manipulation Werkte (Voor de Fix)

## 📋 Overzicht

Voordat we de security fixes implementeerden, kon een gebruiker de prijs manipuleren via de browser developer tools. Dit document legt uit **precies hoe** dit mogelijk was.

---

## 🔍 De Kwetsbaarheid

### Stap 1: Calculator Berekent Prijs Client-Side

**Bestand**: `components/calculator/StepPrice.tsx` (regel 14-32)

```typescript
useEffect(() => {
    const fetchPrice = async () => {
        setIsCalculating(true);
        try {
            const response = await fetch("/api/calculate-price", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                updateData({ calculatedPrice: result.price }); // ⚠️ OPGESLAGEN IN CLIENT STATE
            }
        } catch (error) {
            console.error("Error calculating price:", error);
        } finally {
            setIsCalculating(false);
        }
    };
    fetchPrice();
}, [...]);
```

**Wat gebeurt hier:**

1. Calculator vraagt prijs op van API
2. Prijs wordt teruggegeven (bijv. €5.00 voor 2 ramen)
3. Prijs wordt opgeslagen in React state: `data.calculatedPrice = 5.00`
4. Deze data leeft in de **browser memory** (client-side)

---

### Stap 2: Data Wordt Verzonden bij Boeking

**Bestand**: `components/calculator/StepCustomerDetails.tsx` (regel 53-62)

```typescript
const response = await fetch("/api/book-appointment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...data, // ⚠️ DIT BEVAT data.calculatedPrice!
    selectedDate: selectedDateString,
  }),
});
```

**Wat gebeurt hier:**

1. Gebruiker vult formulier in
2. Alle data (inclusief `calculatedPrice`) wordt naar server gestuurd
3. De server accepteerde deze prijs **zonder verificatie** ❌

---

## 🛠️ Hoe Een Gebruiker Dit Kon Manipuleren

### Methode 1: Browser Developer Tools (Makkelijkst)

**Stappen:**

1. **Open Calculator op Website**
   - Ga naar https://panora.be
   - Vul calculator in (bijv. 2 ramen, €5.00)

2. **Open Developer Tools**
   - Druk F12 of Rechtermuisklik → "Inspect"
   - Ga naar "Console" tab

3. **Vind React State**

   ```javascript
   // React component state is toegankelijk via:
   // 1. React DevTools extension
   // 2. Direct via DOM inspection
   // 3. Via window object als er globals zijn
   ```

4. **Manipuleer de Prijs**

   ```javascript
   // Voorbeeld: verander prijs naar €0.01
   // Dit kan via React DevTools of door het request te intercepten
   ```

5. **Submit het Formulier**
   - Vul klantgegevens in
   - Klik "Boeken"
   - Server accepteert de **gemanipuleerde prijs** ❌

---

### Methode 2: Network Request Interceptie (Geavanceerd)

**Stappen:**

1. **Open Developer Tools → Network Tab**

2. **Vul Calculator In**
   - Normaal proces: 2 ramen = €5.00

3. **Intercept het POST Request**
   - Rechtermuisklik op `/api/book-appointment` request
   - Kies "Copy as cURL" of "Copy as Fetch"

4. **Modificeer het Request**

   ```javascript
   fetch("/api/book-appointment", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       // ... normale data
       totalWindows: 2,
       exteriorWindows: 2,
       calculatedPrice: 0.01, // ⚠️ GEMANIPULEERD!
       // ... rest van data
     }),
   });
   ```

5. **Voer Gemanipuleerd Request Uit**
   - Plak in Console
   - Enter
   - Boeking wordt aangemaakt met €0.01 ❌

---

### Methode 3: Browser Extension (Professioneel)

Tools zoals **Burp Suite**, **OWASP ZAP**, of browser extensions kunnen:

- HTTP requests intercepten
- Data modificeren
- Requests opnieuw versturen met aangepaste waarden

---

## 🚨 Waarom Dit Een Probleem Was

### Voor de Fix:

```typescript
// app/api/book-appointment/route.ts (OUDE CODE)
const bookingRecord = {
  id: bookingId,
  customer_name: data.customerName,
  // ...
  calculated_price: data.calculatedPrice, // ⚠️ DIRECT VAN CLIENT!
  status: "pending",
};

await supabaseAdmin.from("bookings").insert([bookingRecord]);
```

**Problemen:**

1. ❌ Geen verificatie van `calculatedPrice`
2. ❌ Geen herberekening server-side
3. ❌ Geen validatie of prijs klopt met window counts
4. ❌ Client kan elke waarde sturen

### Voorbeeld Scenario:

```javascript
// Normaal:
{
  totalWindows: 2,
  exteriorWindows: 2,
  calculatedPrice: 5.00  // Correct: 2 × €2.50
}

// Gemanipuleerd:
{
  totalWindows: 2,
  exteriorWindows: 2,
  calculatedPrice: 0.01  // ⚠️ FOUT! Maar werd geaccepteerd
}
```

**Resultaat:**

- Boeking `BK-1779268461979-3vno2la40` kreeg €4.13 voor 2 ramen
- Dit werd opgeslagen in database
- Geen alarm, geen detectie
- Verlies voor het bedrijf

---

## ✅ Hoe De Fix Dit Oplost

### Na de Fix:

```typescript
// app/api/book-appointment/route.ts (NIEUWE CODE)

// 1. HERBEREKEN PRIJS SERVER-SIDE
const serverCalculatedPrice = calculatePrice({
  propertyType: data.propertyType,
  totalWindows: data.totalWindows,
  exteriorWindows: data.exteriorWindows,
  interiorExteriorWindows: data.interiorExteriorWindows,
  hardToReach: data.hardToReach || false,
  firstTimeInLong: data.firstTimeInLong || false,
  cleanFrames: data.cleanFrames || false,
});

// 2. VERGELIJK MET CLIENT PRIJS
const priceDifference = Math.abs(
  serverCalculatedPrice - (data.calculatedPrice || 0),
);

// 3. BLOKKEER BIJ MANIPULATIE
if (priceDifference > 0.01) {
  console.error("🚨 SECURITY: Price manipulation detected!", {
    clientSentPrice: data.calculatedPrice,
    correctServerPrice: serverCalculatedPrice,
  });
  return NextResponse.json(
    { error: "Price validation failed" },
    { status: 400 },
  );
}

// 4. GEBRUIK ALTIJD SERVER PRIJS
const validatedPrice = serverCalculatedPrice;

// 5. SLA SERVER PRIJS OP (niet client prijs)
const bookingRecord = {
  // ...
  calculated_price: validatedPrice, // ✅ SERVER PRICE!
  // ...
};
```

---

## 🎯 Security Principes

### Fundamentele Regel: **Never Trust Client Input**

**Waarom?**

- Client (browser) is volledig onder controle van de gebruiker
- JavaScript kan geïnspecteerd en gemanipuleerd worden
- Network requests kunnen geïntercepteerd worden
- Developer tools geven volledige toegang tot applicatie state

### Oplossingen:

#### ✅ 1. Server-Side Validation

```typescript
// NOOIT:
const price = request.body.price; // ❌

// ALTIJD:
const price = calculatePrice(request.body.data); // ✅
```

#### ✅ 2. Input Validation

```typescript
// Valideer alle inputs
if (typeof totalWindows !== "number" || totalWindows < 1) {
  return error("Invalid input");
}
```

#### ✅ 3. Business Logic op Server

```typescript
// Client: alleen UI en data verzamelen
// Server: alle berekeningen en validatie
```

#### ✅ 4. Logging & Monitoring

```typescript
// Log verdachte activiteit
console.error("🚨 Price manipulation detected!");
```

---

## 📊 Voorbeelden van Manipulatie Pogingen

### Voorbeeld 1: Prijs naar €0

```javascript
// Gemanipuleerd request:
POST /api/book-appointment
{
  "totalWindows": 10,
  "exteriorWindows": 10,
  "calculatedPrice": 0.00  // ⚠️ MANIPULATIE
}

// ❌ VOOR FIX: Geaccepteerd → verlies €25
// ✅ NA FIX: Geblokkeerd → 400 error + log
```

### Voorbeeld 2: Negatieve Prijs

```javascript
POST /api/book-appointment
{
  "totalWindows": 5,
  "calculatedPrice": -10.00  // ⚠️ MANIPULATIE
}

// ✅ NA FIX: Geblokkeerd door minimum price check
```

### Voorbeeld 3: Inconsistente Data

```javascript
POST /api/book-appointment
{
  "totalWindows": 2,
  "exteriorWindows": 10,  // ⚠️ INCONSISTENT!
  "calculatedPrice": 25.00
}

// ✅ NA FIX: Geblokkeerd door window count validation
```

---

## 🔒 Beveiligingslagen Nu Actief

| Laag                        | Check                | Status |
| --------------------------- | -------------------- | ------ |
| **Input Validation**        | Types, ranges, logic | ✅     |
| **Price Recalculation**     | Server herberekent   | ✅     |
| **Price Comparison**        | Client vs Server     | ✅     |
| **Manipulation Detection**  | Logs & blocks        | ✅     |
| **Minimum Price**           | €2.50 minimum        | ✅     |
| **Maximum Price**           | €2000 maximum        | ✅     |
| **Window Count Validation** | 1-200 ramen          | ✅     |
| **Logic Validation**        | Sum must match       | ✅     |

---

## 📚 Belangrijke Lessen

### 1. Client-Side Code is NOOIT Veilig

- JavaScript in browser kan altijd gemanipuleerd worden
- Gebruiker heeft volledige controle
- Developer tools zijn overal beschikbaar

### 2. Altijd Server-Side Valideren

- Elke belangrijke berekening opnieuw doen op server
- Input valideren alsof het van een hacker komt
- Nooit vertrouwen op client-sent data

### 3. Defence in Depth

- Meerdere lagen van beveiliging
- Als één laag faalt, vangen anderen het op
- Logging voor detectie en audit

### 4. Assume Breach Mentality

- Ga ervan uit dat iemand het zal proberen
- Log verdachte activiteit
- Monitor voor patronen

---

## 🧪 Test Het Zelf (Na Fix)

### Probeer Price Manipulation:

1. **Open Browser DevTools**
2. **Ga naar Console**
3. **Probeer dit:**

   ```javascript
   fetch("/api/book-appointment", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       propertyType: "apartment",
       totalWindows: 2,
       exteriorWindows: 2,
       interiorExteriorWindows: 0,
       hardToReach: false,
       firstTimeInLong: false,
       cleanFrames: false,
       calculatedPrice: 0.01, // MANIPULATIE POGING!
       selectedDate: "2026-05-25",
       selectedTime: "10:00",
       customerName: "Test",
       customerEmail: "test@test.com",
       customerPhone: "0412345678",
       customerAddress: "Teststraat 1",
       customerCity: "Gent",
       customerPostalCode: "9000",
     }),
   })
     .then((r) => r.json())
     .then(console.log);
   ```

4. **Verwacht Resultaat:**

   ```json
   {
     "error": "Price validation failed. Please recalculate and try again.",
     "correctPrice": 5.0
   }
   ```

5. **In Server Logs:**
   ```
   🚨 SECURITY: Price manipulation detected!
   {
     clientSentPrice: 0.01,
     correctServerPrice: 5.00,
     difference: 4.99
   }
   ```

---

## ✅ Conclusie

### Voor de Fix:

- ❌ Client bepaalde prijs
- ❌ Server accepteerde blind
- ❌ Geen validatie
- ❌ Geen detectie
- ❌ Verlies voor bedrijf

### Na de Fix:

- ✅ Server bepaalt prijs
- ✅ Client prijs wordt genegeerd
- ✅ Uitgebreide validatie
- ✅ Manipulation detectie & logging
- ✅ Bedrijf beschermd

**Het probleem is volledig opgelost!** 🎉

---

**Geschreven**: 20 mei 2026  
**Auteur**: GitHub Copilot  
**Status**: Voor educatieve doeleinden
