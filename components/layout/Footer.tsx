
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { CONTACT, COMPANY } from "@/lib/constants";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{COMPANY.name}</h3>
                        <p className="text-white/80 mb-4">
                            {COMPANY.description}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Diensten</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/services/exterior" className="text-white/80 hover:text-white transition-colors">
                                    Buiten Ramenwassen
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/premium" className="text-white/80 hover:text-white transition-colors">
                                    Binnen & Buiten Premium
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/subscription" className="text-white/80 hover:text-white transition-colors">
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
                    <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} PANORA. Alle rechten voorbehouden.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                            Privacy Policy
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