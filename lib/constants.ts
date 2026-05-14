export const COMPANY = {
  name: "PANORA",
  tagline: "Professionele ramenwas in Gent",
  description:
    "Professionele ramenwas in Gent. Transparant, snel en betrouwbaar.",
  region: "Gent + randgemeenten",
  vatNumber: process.env.NEXT_PUBLIC_VAT_NUMBER,
};

// Toegestane postcodes (Gent en max 20km radius)
export const ALLOWED_POSTAL_CODES = [
  "9000", // Gent centrum
  "9030", // Mariakerke
  "9031", // Drongen
  "9032", // Wondelgem
  "9040", // Sint-Amandsberg
  "9041", // Oostakker
  "9042", // Desteldonk
  "9050", // Gentbrugge
  "9051", // Sint-Denijs-Westrem
  "9052", // Zwijnaarde
  "9070", // Destelbergen (~5km)
  "9080", // Lochristi (~10km)
  "9090", // Melle (~7km)
  "9230", // Wetteren (~15km)
  "9270", // Laarne (~12km)
  "9820", // Merelbeke (~5km)
  "9830", // Sint-Martens-Latem (~8km)
  "9831", // Deurle (~15km)
  "9840", // De Pinte (~8km)
  "9940", // Evergem (~8km)
];

// Contact Information
export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE,
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY,
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP,
  workingHours: {
    weekdays: "09:00 - 17:00",
    weekend: "09:00 - 17:00", // Ook weekend beschikbaar
  },
};

export const SOCIAL_MEDIA = {
  facebook:
    "https://www.facebook.com/profile.php?id=61584108477064&locale=nl_BE",
  instagram: "https://www.instagram.com/panora.ramenwas/",
  tiktok: "https://www.tiktok.com/@panora.ramenwas",
};

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Appartement" },
  { value: "townhouse", label: "Rijhuis" },
  { value: "semiDetached", label: "Halfopen woning" },
  { value: "detached", label: "Vrijstaande woning" },
  { value: "commercial", label: "Kantoor/Handelszaak" },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]["value"];

// Helper function to get property type label from value
export function getPropertyTypeLabel(value: string): string {
  const propertyType = PROPERTY_TYPES.find((type) => type.value === value);
  return propertyType ? propertyType.label : value;
}

// Service Types
export const SERVICE_TYPES = {
  exterior: {
    name: "Buiten Glasreiniging",
    slug: "exterior",
    priceFrom: 2.5,
    priceDisplay: "€2,50",
    description: "Strakke ramen zonder strepen",
  },
  premium: {
    name: "Complete Glasreiniging",
    slug: "premium",
    priceFrom: 4.5,
    priceDisplay: "€4,50",
    description: "Volledige behandeling binnen & buiten",
  },
  subscription: {
    name: "Abonnementen",
    slug: "subscription",
    description: "Korting voor vaste klanten",
  },
} as const;

// Subscription Frequencies
export const SUBSCRIPTION_FREQUENCIES = [
  { value: "monthly", label: "1x per maand", discount: 10 },
  { value: "bimonthly", label: "1x per 2 maanden", discount: 7 },
  { value: "quarterly", label: "1x per kwartaal", discount: 5 },
] as const;

// App Configuration
export const APP_CONFIG = {
  locale: "nl-BE",
  currency: "EUR",
  currencySymbol: "€",
  timezone: "Europe/Brussels",
  dateFormat: "dd/MM/yyyy",
};

export const UI_TEXT = {
  cta: {
    primary: "Bereken jouw prijs zonder verborgen kosten",
    secondary: "Plan je ramenwas direct in — zonder telefoontjes",
    calculator: "Bereken nu jouw prijs",
    book: "Plan Direct In",
    whatsapp: "Chat via WhatsApp",
  },
  disclaimers: {
    price: "Exacte prijs wordt bevestigd na inspectie.",
    priceNote:
      "Dit is een richtprijs. De exacte prijs wordt bevestigd na inspectie ter plaatse.",
  },
  hero: {
    title: "Professionele ramenwas in Gent — snel, strak en betrouwbaar",
    subtitle:
      "Bereken direct je prijs en plan je afspraak in minder dan 1 minuut.",
  },
  confirmation: {
    title: "Ontvangen! Jij staat ingepland.",
    subtitle:
      "We hebben je boeking ontvangen en een bevestiging naar je e-mail gestuurd.",
  },
};

// USPs (Unique Selling Points)
export const USPS = [
  { title: "Transparante prijs", description: "Direct duidelijkheid" },
  { title: "Snelle beschikbaarheid", description: "Snel ingepland" },
  { title: "Osmose-techniek", description: "Streeploos resultaat" },
  { title: "Digitale bevestiging", description: "Alles digitaal" },
  { title: "Streeploos resultaat", description: "Perfecte afwerking" },
] as const;

// How It Works Steps
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Bereken je prijs",
    description: "Vul de calculator in en zie direct je richtprijs",
  },
  {
    step: 2,
    title: "Kies datum & tijd",
    description: "Selecteer een beschikbaar moment in onze agenda",
  },
  {
    step: 3,
    title: "Wij komen langs",
    description: "Professionele service op de afgesproken tijd",
  },
  {
    step: 4,
    title: "Foto's + factuur",
    description: "Je ontvangt foto's van het resultaat en de factuur",
  },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/#calculator", label: "Bereken Prijs" },
  { href: "/about", label: "Over Ons" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICE_NAV_LINKS = [
  {
    href: "/services/exterior",
    label: "Buiten Ramenwassen",
    description: "Vanaf €2,50 per raam",
  },
  {
    href: "/services/premium",
    label: "Binnen & Buiten Premium",
    description: "Vanaf €4,50 per raam",
  },
  {
    href: "/services/subscription",
    label: "Abonnementen",
    description: "Korting voor vaste klanten",
  },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  services: SERVICE_NAV_LINKS,
  company: [
    { href: "/about", label: "Over Ons" },
    { href: "/contact", label: "Contact" },
    { href: "/#calculator", label: "Bereken Prijs" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Algemene Voorwaarden" },
  ],
} as const;

// Email Configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM,
  internalEmail: process.env.INTERNAL_EMAIL,
};

// Available Time Slots (1 uur per slot + 30 min reistijd tussen slots)
export const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:30 - 11:30",
  "12:00 - 13:00",
  "13:30 - 14:30",
  "15:00 - 16:00",
  "16:30 - 17:30",
  "18:00 - 19:00",
];

// ?Days to exclude?
export const EXCLUDED_DATES: Date[] = [
  // Add specific dates here, e.g.:
  // new Date(2025, 11, 25), // Christmas
  // new Date(2026, 0, 1), // New Year
];

// Calendar Configuration
export const CALENDAR_CONFIG = {
  timeZone: "Europe/Brussels",
  workingHours: {
    start: parseInt(process.env.WORKING_HOURS_START || "9"), // 9:00
    end: parseInt(process.env.WORKING_HOURS_END || "17"), // 17:00
  },
  workingDays: [0, 1, 2, 3, 4, 5, 6], // Alle dagen (0=zondag, 6=zaterdag)
  slotDuration: 60, // 1 uur per slot (30 min reistijd tussen slots)
  maxBookingDays: 90, // Max days in advance for booking
  slotsPerDay: parseInt(process.env.MAX_SLOTS_PER_DAY || "6"), // Max 6 appointments per day (was 4)
};

// Pricing Constants
export const PRICING = {
  exteriorWindow: 2.5, // €2,50 per exterior window
  interiorExteriorWindow: 4.5, // €4,50 per interior + exterior window
  hardToReachMultiplier: 1.15, // +15% for hard to reach
  firstTimeExtra: 20, // +€20 for first time in long
  cleanFramesExtra: 25, // +€25 for cleaning frames
};

// Helper function to validate postal code
export function isPostalCodeAllowed(postalCode: string): boolean {
  return ALLOWED_POSTAL_CODES.includes(postalCode.trim());
}

export function getPostalCodeErrorMessage(calculatedPrice: number): {
  message: string;
  showContactLink: boolean;
} {
  if (calculatedPrice >= 100) {
    return {
      message:
        "Deze locatie ligt buiten onze standaard service area (max 20km van Gent).",
      showContactLink: true,
    };
  }
  return {
    message:
      "Helaas bedienen we momenteel alleen Gent en directe omstreken (max 20km radius).",
    showContactLink: true,
  };
}
