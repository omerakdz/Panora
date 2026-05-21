/**
 * Test script voor Cookie Consent implementatie
 *
 * Gebruik dit script in de browser console om te verifiëren dat de
 * cookie consent correct werkt en data naar GA4 stuurt.
 *
 * INSTRUCTIES:
 * 1. Open panora.be in Chrome incognito
 * 2. Open DevTools (F12) → Console tab
 * 3. Kopieer en plak dit hele script in de console
 * 4. Voer de test functies uit zoals hieronder beschreven
 */

console.log("🍪 Cookie Consent Test Script geladen");
console.log("=====================================\n");

// Test 1: Check initial consent state (should be 'denied' for EEA)
function testInitialConsent() {
  console.log("TEST 1: Initial Consent State");
  console.log("------------------------------");

  const consentEvents = window.dataLayer.filter((e) => e[0] === "consent");
  console.log("Consent events in dataLayer:", consentEvents);

  if (consentEvents.length > 0) {
    console.log("✅ Consent defaults zijn ingesteld");
  } else {
    console.log("❌ FOUT: Geen consent events gevonden!");
  }
  console.log("\n");
}

// Test 2: Check localStorage before accepting
function testLocalStorageEmpty() {
  console.log("TEST 2: LocalStorage (voor accepteren)");
  console.log("---------------------------------------");

  const stored = localStorage.getItem("cookie-consent");
  console.log("cookie-consent waarde:", stored);

  if (stored === null) {
    console.log("✅ LocalStorage is leeg (correct voor nieuwe bezoeker)");
  } else {
    console.log("ℹ️  Er bestaat al een consent keuze:", stored);
  }
  console.log("\n");
}

// Test 3: Simulate accepting all cookies
function testAcceptAll() {
  console.log('TEST 3: Simuleer "Alles accepteren"');
  console.log("------------------------------------");
  console.log('⚠️  Klik nu op de "Alles accepteren" knop in de cookie banner');
  console.log("   Dan kun je testAfterAccept() uitvoeren...\n");
}

// Test 4: Verify after accepting
function testAfterAccept() {
  console.log("TEST 4: Verificatie na accepteren");
  console.log("----------------------------------");

  // Check localStorage
  const stored = localStorage.getItem("cookie-consent");
  console.log("1. LocalStorage waarde:", stored);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log("   Geparsed:", parsed);

      if (parsed.analytics && parsed.marketing) {
        console.log("   ✅ Analytics EN Marketing zijn geaccepteerd");
      } else if (parsed.analytics) {
        console.log("   ✅ Alleen Analytics geaccepteerd");
      } else {
        console.log("   ✅ Alleen noodzakelijke cookies");
      }
    } catch (e) {
      console.log("   ❌ FOUT: Kan localStorage niet parsen!", e);
    }
  } else {
    console.log("   ❌ FOUT: LocalStorage is nog steeds leeg!");
  }

  // Check dataLayer for consent updates
  console.log("\n2. DataLayer consent events:");
  const allConsent = window.dataLayer.filter((e) => e[0] === "consent");
  allConsent.forEach((event, i) => {
    console.log(`   Event ${i + 1}:`, event);
  });

  const updateEvents = allConsent.filter((e) => e[1] === "update");
  if (updateEvents.length > 0) {
    console.log("   ✅ Consent update is verstuurd!");
  } else {
    console.log("   ❌ FOUT: Geen consent update gevonden!");
  }
  console.log("\n");
}

// Test 5: Check GA4 tags
function testGA4Tags() {
  console.log("TEST 5: GA4 Tag Status");
  console.log("----------------------");
  console.log('ℹ️  Open de Network tab en filter op "collect"');
  console.log("   Je zou GA4 hits moeten zien naar analytics.google.com");
  console.log("   Als je die ziet binnen 10-30 seconden, werkt het! ✅");
  console.log("\n");
}

// Test 6: Clear consent (voor opnieuw testen)
function clearConsent() {
  console.log("TEST 6: Reset Consent");
  console.log("--------------------");
  localStorage.removeItem("cookie-consent");
  console.log("✅ Cookie consent verwijderd uit localStorage");
  console.log("   Herlaad de pagina om opnieuw te testen\n");
}

// Automatisch alle basis tests uitvoeren
console.log("📋 Automatische tests worden uitgevoerd...\n");
testInitialConsent();
testLocalStorageEmpty();

console.log("===========================================");
console.log("VOLGENDE STAPPEN:");
console.log("===========================================");
console.log('1. Klik op "Alles accepteren" in de cookie banner');
console.log("2. Voer uit: testAfterAccept()");
console.log("3. Open Network tab en voer uit: testGA4Tags()");
console.log("4. Check GA4 Realtime rapport (binnen 30 sec)");
console.log("\n");
console.log("💡 TIP: Gebruik clearConsent() om opnieuw te testen");
console.log("===========================================\n");

// Maak functies beschikbaar in console
window.testInitialConsent = testInitialConsent;
window.testLocalStorageEmpty = testLocalStorageEmpty;
window.testAcceptAll = testAcceptAll;
window.testAfterAccept = testAfterAccept;
window.testGA4Tags = testGA4Tags;
window.clearConsent = clearConsent;
