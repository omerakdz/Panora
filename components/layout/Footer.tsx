
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { CONTACT, COMPANY } from "@/lib/constants";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-[#044D8E] via-[#0F61AC] to-[#1792D0] text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#044D8E]/30 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="mb-4 relative h-[120px] -ml-7 -mt-20">
                            <Image
                                src="/images/PANORA_LOGO_WHITE.png"
                                alt="PANORA"
                                width={200}
                                height={120}
                                quality={90}
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-white/80 mb-4">
                            {COMPANY.description}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/profile.php?id=61584108477064&locale=nl_BE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-11 h-11 bg-white/10 hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="group-hover:text-[#044D8E] transition-colors" />
                            </a>
                            <a
                                href="https://www.instagram.com/panora.ramenwas/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-11 h-11 bg-white/10 hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} className="group-hover:text-[#044D8E] transition-colors" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@panora.ramenwas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-11 h-11 bg-white/10 hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                                aria-label="TikTok"
                            >
                                <svg className="w-5 h-5 group-hover:text-[#044D8E] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Diensten</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/services/exterior" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                    Buiten Glasreiniging
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/premium" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                    Complete Glasreiniging
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/subscription" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                                    Abonnementen
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Bedrijf</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                                    Over Ons
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/#calculator" className="text-white/80 hover:text-white transition-colors">
                                    Bereken Prijs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <a href={`mailto:${CONTACT.email}`} className="text-white/80 hover:text-white transition-colors">
                                    {CONTACT.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <a href={`tel:${CONTACT.phone}`} className="text-white/80 hover:text-white transition-colors">
                                    {CONTACT.phoneDisplay}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">
                                    Gent + randgemeenten
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white/60 text-sm text-center md:text-left">
                        <p>© {new Date().getFullYear()} PANORA. Alle rechten voorbehouden.</p>
                        {COMPANY.vatNumber && (
                            <p className="mt-1">BTW: {COMPANY.vatNumber}</p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-sm justify-center md:justify-end">
                        <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
                            Cookiebeleid
                        </Link>
                        <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                            Algemene Voorwaarden
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;