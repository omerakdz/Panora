/**
 * GA4 Network Request Checker
 *
 * Dit script checkt of er daadwerkelijk GA4 requests worden verstuurd
 * naar Google Analytics na het accepteren van cookies.
 *
 * INSTRUCTIES:
 * 1. Open DevTools → Network tab
 * 2. Filter op "collect" of "analytics.google.com"
 * 3. Kopieer en plak dit script in de Console
 * 4. Navigeer wat door de website (klik op links, scroll, etc.)
 */

console.log("📊 GA4 Network Request Checker");
console.log("================================\n");

// Test 1: Check if GTM is loaded
function checkGTMLoaded() {
  console.log("TEST 1: GTM Container Status");
  console.log("-----------------------------");

  if (window.google_tag_manager) {
    const gtmContainers = Object.keys(window.google_tag_manager);
    console.log("✅ GTM is geladen");
    console.log("   Containers:", gtmContainers);

    if (gtmContainers.includes("GTM-M7G6SHD8")) {
      console.log("   ✅ Correcte container GTM-M7G6SHD8 gevonden!");
    }
  } else {
    console.log("❌ GTM is niet geladen");
  }
  console.log("\n");
}

// Test 2: Check dataLayer events
function checkDataLayerEvents() {
  console.log("TEST 2: DataLayer Events");
  console.log("------------------------");

  if (window.dataLayer) {
    console.log("✅ DataLayer bestaat");
    console.log(`   Totaal aantal events: ${window.dataLayer.length}`);

    // Show last 5 events
    const lastEvents = window.dataLayer.slice(-5);
    console.log("\n   Laatste 5 events:");
    lastEvents.forEach((event, i) => {
      if (event.event) {
        console.log(`   ${i + 1}. ${event.event}`);
      } else if (event[0]) {
        console.log(`   ${i + 1}. ${event[0]} (${event[1] || "default"})`);
      }
    });
  } else {
    console.log("❌ DataLayer bestaat niet");
  }
  console.log("\n");
}

// Test 3: Check consent state
function checkConsentState() {
  console.log("TEST 3: Huidige Consent Status");
  console.log("-------------------------------");

  const consent = localStorage.getItem("cookie-consent");
  if (consent) {
    const parsed = JSON.parse(consent);
    console.log("✅ Consent is ingesteld:");
    console.log("   Analytics:", parsed.analytics ? "✅ Granted" : "❌ Denied");
    console.log("   Marketing:", parsed.marketing ? "✅ Granted" : "❌ Denied");
  } else {
    console.log("❌ Geen consent gevonden (gebruiker heeft nog niet gekozen)");
  }
  console.log("\n");
}

// Test 4: Monitor Network Requests
function monitorGA4Requests() {
  console.log("TEST 4: Network Request Monitor");
  console.log("--------------------------------");
  console.log("⏳ Monitor is actief voor 30 seconden...");
  console.log("   Wacht op GA4 requests naar analytics.google.com\n");

  let requestCount = 0;
  const startTime = Date.now();

  // Intercept fetch requests
  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    const url = args[0];
    if (
      typeof url === "string" &&
      (url.includes("google-analytics.com") ||
        url.includes("analytics.google.com"))
    ) {
      requestCount++;
      console.log(`📡 GA4 Request #${requestCount} detected!`);
      console.log(`   URL: ${url.substring(0, 100)}...`);
      console.log(`   Time: ${Date.now() - startTime}ms na start\n`);
    }
    return originalFetch.apply(this, args);
  };

  // Check after 30 seconds
  setTimeout(() => {
    console.log("⏱️  30 seconden verstreken");
    console.log("---------------------------");
    if (requestCount > 0) {
      console.log(`✅ SUCCESS! ${requestCount} GA4 request(s) gedetecteerd!`);
      console.log("   Data wordt naar GA4 gestuurd! 🎉\n");
    } else {
      console.log("❌ Geen GA4 requests gedetecteerd");
      console.log("   Mogelijke oorzaken:");
      console.log("   1. Consent is niet granted (check TEST 3)");
      console.log("   2. GTM is niet correct geladen (check TEST 1)");
      console.log("   3. Adblocker blokkeert GA4 requests");
      console.log("   4. Navigeer wat door de site om events te triggeren\n");
    }

    // Restore original fetch
    window.fetch = originalFetch;
  }, 30000);

  console.log("💡 TIP: Klik wat rond op de website om events te triggeren");
  console.log(
    "         (scroll, klik op buttons, navigeer naar andere pagina's)\n",
  );
}

// Test 5: Check Network Tab manually
function checkNetworkTab() {
  console.log("TEST 5: Handmatige Network Tab Check");
  console.log("-------------------------------------");
  console.log("📋 Volg deze stappen:");
  console.log("");
  console.log("1. Open DevTools → Network tab");
  console.log("2. Clear alle requests (🚫 icon)");
  console.log('3. Filter op: "collect" of "google-analytics.com"');
  console.log("4. Herlaad de pagina of navigeer wat rond");
  console.log("5. Zoek naar requests naar:");
  console.log("   • https://www.google-analytics.com/g/collect");
  console.log("   • https://region1.google-analytics.com/g/collect");
  console.log("");
  console.log("Als je deze requests ziet → ✅ GA4 werkt!");
  console.log("Als je deze NIET ziet → Check consent + disable adblocker\n");
}

// Run all tests
console.log("🚀 Running all tests...\n");
checkGTMLoaded();
checkDataLayerEvents();
checkConsentState();

console.log("=========================================");
console.log("NETWORK MONITORING");
console.log("=========================================\n");

console.log("Kies een optie:");
console.log("1. monitorGA4Requests()  → Auto-detect requests (30 sec)");
console.log("2. checkNetworkTab()     → Handmatige instructies");
console.log("\n");

// Make functions available
window.checkGTMLoaded = checkGTMLoaded;
window.checkDataLayerEvents = checkDataLayerEvents;
window.checkConsentState = checkConsentState;
window.monitorGA4Requests = monitorGA4Requests;
window.checkNetworkTab = checkNetworkTab;

console.log("🎯 Voer nu uit: monitorGA4Requests()");
console.log("   En klik wat rond op de website!\n");
