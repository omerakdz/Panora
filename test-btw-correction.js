// Test om te verifiëren of BTW-correctie werkt voor kantoor

const PRICING = {
  exteriorWindow: 2.5,
  interiorExteriorWindow: 4.5,
};

function calculatePrice(data) {
  let basePrice = 0;

  basePrice += data.exteriorWindows * PRICING.exteriorWindow;
  basePrice += data.interiorExteriorWindows * PRICING.interiorExteriorWindow;

  console.log(`Base price: €${basePrice.toFixed(2)}`);
  console.log(`Property type: "${data.propertyType}"`);
  console.log(`Check kantoor: ${data.propertyType === "kantoor"}`);

  // BTW correctie voor kantoor
  if (data.propertyType === "kantoor") {
    console.log("✅ Applying BTW correction (÷ 1.21)");
    basePrice = basePrice / 1.21;
  } else {
    console.log("❌ NO BTW correction applied");
  }

  return Math.round(basePrice * 100) / 100;
}

console.log("=".repeat(60));
console.log("TEST 1: Kantoor met 2 binnen+buiten ramen");
console.log("=".repeat(60));

const testKantoor = {
  propertyType: "kantoor",
  totalWindows: 2,
  exteriorWindows: 0,
  interiorExteriorWindows: 2,
};

const priceKantoor = calculatePrice(testKantoor);
console.log(`\n➡️ Final price: €${priceKantoor.toFixed(2)}`);
console.log(`Expected: €7.44`);
console.log(`Match: ${priceKantoor === 7.44 ? "✅ YES" : "❌ NO"}`);

console.log("\n" + "=".repeat(60));
console.log("TEST 2: Appartement met 2 binnen+buiten ramen");
console.log("=".repeat(60));

const testAppartement = {
  propertyType: "appartement",
  totalWindows: 2,
  exteriorWindows: 0,
  interiorExteriorWindows: 2,
};

const priceAppartement = calculatePrice(testAppartement);
console.log(`\n➡️ Final price: €${priceAppartement.toFixed(2)}`);
console.log(`Expected: €9.00`);
console.log(`Match: ${priceAppartement === 9.0 ? "✅ YES" : "❌ NO"}`);

console.log("\n" + "=".repeat(60));
console.log("\n🔍 DIAGNOSE:");
if (priceKantoor !== 7.44) {
  console.log("❌ PROBLEEM: BTW-correctie wordt NIET toegepast voor kantoor!");
  console.log("   Mogelijke oorzaken:");
  console.log("   1. Property type waarde komt niet overeen");
  console.log("   2. Type mismatch (string vs literal type)");
  console.log("   3. Extra spaties of casing issues");
} else {
  console.log("✅ GOED: BTW-correctie werkt correct voor kantoor");
}
