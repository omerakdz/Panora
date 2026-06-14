import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/stickyCTA";
import CookieConsent from "@/components/layout/CookieConsent";
import StructuredData from "@/components/StructuredData";
import ConsentInit from "@/components/ConsentInit";
import { COMPANY } from "@/lib/constants";
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.panora.be'),
  title: {
    default: `${COMPANY.name} - Ruitenwasser Gent | ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name} - Ruitenwasser Gent`
  },
  description: 'Professionele ruitenwasser in Gent en omgeving. Snel, betrouwbaar en transparant. ✓ Direct online boeken ✓ Vaste prijzen ✓ Geen verborgen kosten. Boek nu je afspraak!',
  keywords: [
    'ruitenwasser gent',
    'ramenwasser gent',
    'glazenwasser gent',
    'ramen wassen gent',
    'glasreiniging gent',
    'raampjes wassen gent',
    'professionele ruitenwasser',
    'ramen schoonmaken gent',
    'vensters wassen gent',
    'ruitenwasser prijzen gent'
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://www.panora.be',
    siteName: COMPANY.name,
    title: `${COMPANY.name} - Professionele Ruitenwasser Gent`,
    description: 'Professionele ruitenwasser in Gent. Direct online boeken. Vaste prijzen, geen verborgen kosten.',
    images: [
      {
        url: '/images/PANORA_LOGO_1_1400x1400.png',
        width: 1400,
        height: 1400,
        alt: `${COMPANY.name} - Ruitenwasser Gent Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} - Ruitenwasser Gent`,
    description: 'Professionele ruitenwasser in Gent. Direct online boeken.',
    images: ['/images/PANORA_LOGO_1_1400x1400.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.panora.be',
  },
  icons: {
    icon: '/images/PANORA_LOGO_1_1400x1400.png',
    shortcut: '/images/PANORA_LOGO_1_1400x1400.png',
    apple: '/images/PANORA_LOGO_1_1400x1400.png',
  },
  verification: {
    google: '0zERXeWBtJ3emmd1tkUfI6Dv04Zgz-HgTfXDdwLJZT4',
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="nl" className={`${inter.variable} ${montserrat.variable} ${poppins.variable}`}>
      <head>
        <StructuredData />
        <ConsentInit />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - All tracking handled via GTM */}
        <GoogleTagManager gtmId="GTM-M7G6SHD8" />

        <Navbar />
        {children}
        <Footer />
        <StickyCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
