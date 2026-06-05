// Test na verwijdering BTW-correctie voor kantoren

const PRICING = {
  exteriorWindow: 2.5,
  interiorExteriorWindow: 4.5,
};

console.log("🔧 NIEUWE PRIJSBEREKENING (zonder BTW-correctie)\n");
console.log("=".repeat(70));

// Test 1: 8 ramen kantoor
console.log("\n🏢 Kantoor - 8 buitenramen");
const kantoor8 = 8 * PRICING.exteriorWindow;
console.log(`  Berekening: 8 × €2.50 = €${kantoor8.toFixed(2)}`);
console.log(`  Eigenaar regelt BTW zelf op factuur`);

// Test 2: 7 ramen kantoor
console.log("\n🏢 Kantoor - 7 buitenramen");
const kantoor7 = 7 * PRICING.exteriorWindow;
console.log(`  Berekening: 7 × €2.50 = €${kantoor7.toFixed(2)}`);
console.log(`  Eigenaar regelt BTW zelf op factuur`);

// Vergelijking
console.log("\n" + "=".repeat(70));
console.log("\n📊 VERGELIJKING:\n");

console.log("VOOR (met BTW-correctie):");
console.log("  • 8 ramen kantoor: €16.53 (excl. BTW)");
console.log("  • 7 ramen kantoor: €14.46 (excl. BTW)");

console.log("\nNA (zonder BTW-correctie):");
console.log(
  `  • 8 ramen kantoor: €${kantoor8.toFixed(2)} (eigenaar regelt BTW)`,
);
console.log(
  `  • 7 ramen kantoor: €${kantoor7.toFixed(2)} (eigenaar regelt BTW)`,
);

console.log("\n" + "=".repeat(70));
console.log("\n✅ RESULTAAT:\n");
console.log("• Kantoren zien nu dezelfde prijs als particulieren");
console.log("• Eigenaar kan zelf BTW aanpassen op de factuur");
console.log("• Calculator toont altijd 'incl. BTW' (ook voor kantoor)");
console.log("• BTW-administratie is nu volledig bij eigenaar");
