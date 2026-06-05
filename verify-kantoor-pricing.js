// Verificatie: Zijn €16.53 en €14.46 correct voor kantoor?

const PRICING = {
  exteriorWindow: 2.5,
  interiorExteriorWindow: 4.5,
};

console.log("🏢 KANTOOR PRIJSBEREKENING VERIFICATIE\n");
console.log("=".repeat(70));

// Test 1: 8 ramen kantoor
console.log("\n📊 AFSPRAAK 1: Kantoor - 8 ramen voor €16.53");
console.log("─".repeat(70));

// Mogelijkheid 1: 8 buitenramen
const test1_exterior = 8 * PRICING.exteriorWindow;
const test1_kantoor = test1_exterior / 1.21;
console.log("\nScenario A: 8 buitenramen");
console.log(`  Base prijs: 8 × €2.50 = €${test1_exterior.toFixed(2)}`);
console.log(`  Kantoor (÷ 1.21): €${test1_kantoor.toFixed(2)}`);
console.log(
  `  Match met €16.53: ${test1_kantoor.toFixed(2) === "16.53" ? "✅ JA" : "❌ NEE"}`,
);

// Mogelijkheid 2: Mix van ramen
console.log("\nScenario B: Mix (bijv. 4 buiten + 4 binnen+buiten)");
const test1_mix =
  4 * PRICING.exteriorWindow + 4 * PRICING.interiorExteriorWindow;
const test1_mix_kantoor = test1_mix / 1.21;
console.log(`  Base prijs: (4×€2.50) + (4×€4.50) = €${test1_mix.toFixed(2)}`);
console.log(`  Kantoor (÷ 1.21): €${test1_mix_kantoor.toFixed(2)}`);
console.log(
  `  Match met €16.53: ${test1_mix_kantoor.toFixed(2) === "16.53" ? "✅ JA" : "❌ NEE"}`,
);

// Test 2: 7 ramen kantoor
console.log("\n" + "=".repeat(70));
console.log("\n📊 AFSPRAAK 2: Kantoor - 7 ramen voor €14.46");
console.log("─".repeat(70));

// Mogelijkheid 1: 7 buitenramen
const test2_exterior = 7 * PRICING.exteriorWindow;
const test2_kantoor = test2_exterior / 1.21;
console.log("\nScenario A: 7 buitenramen");
console.log(`  Base prijs: 7 × €2.50 = €${test2_exterior.toFixed(2)}`);
console.log(`  Kantoor (÷ 1.21): €${test2_kantoor.toFixed(2)}`);
console.log(
  `  Match met €14.46: ${test2_kantoor.toFixed(2) === "14.46" ? "✅ JA" : "❌ NEE"}`,
);

// Mogelijkheid 2: Mix
console.log("\nScenario B: Mix (bijv. 3 buiten + 4 binnen+buiten)");
const test2_mix =
  3 * PRICING.exteriorWindow + 4 * PRICING.interiorExteriorWindow;
const test2_mix_kantoor = test2_mix / 1.21;
console.log(`  Base prijs: (3×€2.50) + (4×€4.50) = €${test2_mix.toFixed(2)}`);
console.log(`  Kantoor (÷ 1.21): €${test2_mix_kantoor.toFixed(2)}`);
console.log(
  `  Match met €14.46: ${test2_mix_kantoor.toFixed(2) === "14.46" ? "✅ JA" : "❌ NEE"}`,
);

// Conclusie
console.log("\n" + "=".repeat(70));
console.log("\n💡 CONCLUSIE:\n");

if (
  test1_kantoor.toFixed(2) === "16.53" &&
  test2_kantoor.toFixed(2) === "14.46"
) {
  console.log("✅ BEIDE PRIJZEN ZIJN CORRECT!");
  console.log("");
  console.log("De prijzen kloppen perfect voor:");
  console.log("  • Afspraak 1: 8 buitenramen kantoor = €16.53 (excl. BTW)");
  console.log("  • Afspraak 2: 7 buitenramen kantoor = €14.46 (excl. BTW)");
  console.log("");
  console.log("📐 Berekening uitgelegd:");
  console.log("  1. Base prijs voor particulier (incl. BTW)");
  console.log("  2. Voor kantoor: ÷ 1.21 (BTW verwijderen)");
  console.log("  3. Resultaat: prijs excl. BTW");
  console.log("");
  console.log("🔢 Ter vergelijking:");
  console.log(
    `  • 8 ramen particulier: €${test1_exterior.toFixed(2)} (incl. BTW)`,
  );
  console.log(
    `  • 8 ramen kantoor:     €${test1_kantoor.toFixed(2)} (excl. BTW)`,
  );
  console.log(
    `  • Verschil: €${(test1_exterior - test1_kantoor).toFixed(2)} (= BTW)`,
  );
  console.log("");
  console.log(
    `  • 7 ramen particulier: €${test2_exterior.toFixed(2)} (incl. BTW)`,
  );
  console.log(
    `  • 7 ramen kantoor:     €${test2_kantoor.toFixed(2)} (excl. BTW)`,
  );
  console.log(
    `  • Verschil: €${(test2_exterior - test2_kantoor).toFixed(2)} (= BTW)`,
  );
} else {
  console.log("❌ ER IS EEN PROBLEEM!");
  console.log("");
  console.log("De prijzen komen niet overeen met de verwachte berekening.");
  console.log("Dit zou kunnen duiden op:");
  console.log("  1. Verkeerde window counts in de database");
  console.log(
    "  2. Extra kosten (hardToReach, firstTime, frames) werden vergeten",
  );
  console.log("  3. Een bug in de prijsberekening");
}

console.log("\n" + "=".repeat(70));
console.log("\n🔍 AANBEVELING:");
console.log("");
console.log("Controleer in de database voor beide boekingen:");
console.log("  • exterior_windows (aantal buitenramen)");
console.log("  • interior_exterior_windows (aantal binnen+buiten)");
console.log("  • hard_to_reach (boolean)");
console.log("  • first_time_in_long (boolean)");
console.log("  • clean_frames (boolean)");
console.log("  • property_type (moet 'kantoor' zijn)");
console.log("");
console.log("Dan kunnen we exact verifiëren of de berekening klopt.");
