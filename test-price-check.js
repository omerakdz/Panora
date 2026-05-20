// Quick test om prijsberekening te verifiëren

const PRICING = {
  exteriorWindow: 2.5,
  interiorExteriorWindow: 4.5,
};

// Test 1: Particulier - 2 binnen+buiten ramen
const particulier = {
  propertyType: "apartment",
  totalWindows: 2,
  interiorExteriorWindows: 2,
};

let priceParticulier =
  particulier.interiorExteriorWindows * PRICING.interiorExteriorWindow;
console.log("🏠 Particulier (2 binnen+buiten ramen):");
console.log(
  `   Berekening: 2 × €${PRICING.interiorExteriorWindow} = €${priceParticulier.toFixed(2)}`,
);
console.log(`   Status: incl. BTW`);

// Test 2: Kantoor - 2 binnen+buiten ramen
const kantoor = {
  propertyType: "kantoor",
  totalWindows: 2,
  interiorExteriorWindows: 2,
};

let priceKantoor =
  kantoor.interiorExteriorWindows * PRICING.interiorExteriorWindow;
priceKantoor = priceKantoor / 1.21; // Excl. BTW
console.log("\n🏢 Kantoor (2 binnen+buiten ramen):");
console.log(
  `   Berekening: (2 × €${PRICING.interiorExteriorWindow}) ÷ 1.21 = €${priceKantoor.toFixed(2)}`,
);
console.log(`   Status: excl. BTW`);

console.log("\n" + "=".repeat(60));
console.log("\n📊 CONCLUSIE:");
console.log("   Voor PARTICULIER: €7.44 is FOUT → correct is €9.00");
console.log("   Voor KANTOOR:     €7.44 is GOED → correct blijft €7.44");
console.log("\n   De boeking BK-1779268461979-3vno2la40:");
console.log("   Als het een particulier was, dan was €4.13 FOUT.");
console.log("   Voor 2 ramen moet het minimaal €5.00 zijn (2 buitenramen)");
console.log("   of €9.00 (2 binnen+buiten ramen).");
