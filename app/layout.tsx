import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/stickyCTA";
import { COMPANY, UI_TEXT } from "@/lib/constants";

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
  title: `${COMPANY.name} - ${COMPANY.tagline}`,
  description: UI_TEXT.hero.subtitle,
  icons: {
    icon: '/images/PANORA_LOGO_1_1400x1400.png',
    shortcut: '/images/PANORA_LOGO_1_1400x1400.png',
    apple: '/images/PANORA_LOGO_1_1400x1400.png',
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="nl" className={`${inter.variable} ${montserrat.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
