
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/constants";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-lg border-b border-gray-200">
            <div className="container mx-auto px-4 relative">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center -ml-6 mt-2">
                        <div className="flex items-center justify-center relative w-[170px] h-[70px]">
                            <Image
                                src="/images/LOGO_PANORA_TEXT.png"
                                alt="PANORA"
                                width={170}
                                height={70}
                                priority
                                quality={90}
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/#calculator"
                            className="text-gray-700 hover:text-[#044D8E] transition-all duration-200 font-medium relative group"
                        >
                            <span className="relative">
                                Bereken Prijs
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#044D8E] group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>

                        <div className="relative group">
                            <button className="text-gray-700 hover:text-[#044D8E] transition-colors font-medium">
                                Diensten
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 overflow-hidden">
                                <Link
                                    href="/services/exterior"
                                    className="block px-4 py-3 hover:bg-[#9FCAE3]/20 transition-all duration-200"
                                >
                                    <div className="font-semibold text-[#044D8E]">{SERVICE_TYPES.exterior.name}</div>
                                    <div className="text-sm text-gray-600">Vanaf {SERVICE_TYPES.exterior.priceDisplay} per raam</div>
                                </Link>
                                <Link
                                    href="/services/premium"
                                    className="block px-4 py-3 hover:bg-[#9FCAE3]/20 transition-all duration-200"
                                >
                                    <div className="font-semibold text-[#044D8E]">{SERVICE_TYPES.premium.name}</div>
                                    <div className="text-sm text-gray-600">Vanaf {SERVICE_TYPES.premium.priceDisplay} per raam</div>
                                </Link>
                                <Link
                                    href="/services/subscription"
                                    className="block px-4 py-3 hover:bg-[#9FCAE3]/20 transition-all duration-200 border-t border-gray-200"
                                >
                                    <div className="font-semibold text-[#044D8E]">{SERVICE_TYPES.subscription.name}</div>
                                    <div className="text-sm text-gray-600">{SERVICE_TYPES.subscription.description}</div>
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-[#044D8E] transition-all duration-200 font-medium relative group"
                        >
                            <span className="relative">
                                Over Ons
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#044D8E] group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-[#044D8E] transition-all duration-200 font-medium relative group"
                        >
                            <span className="relative">
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#044D8E] group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>

                        <Button
                            asChild
                            className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:opacity-90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <Link href="/#calculator">Plan Direct In</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden p-2 text-gray-700 hover:text-[#044D8E] transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}
                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation Backdrop */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black/20 z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ top: '64px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="absolute left-0 right-0 bg-white shadow-xl md:hidden z-50 border-t border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <motion.div
                                className="flex flex-col gap-4 py-4 px-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                <Link
                                    href="/#calculator"
                                    className="text-gray-700 hover:text-[#044D8E] transition-colors font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Bereken Prijs
                                </Link>

                                <div>
                                    <div className="font-semibold text-gray-900 mb-2">Diensten</div>
                                    <div className="pl-4 flex flex-col gap-2">
                                        <Link
                                            href="/services/exterior"
                                            className="text-gray-700 hover:text-[#044D8E] transition-colors py-1"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Buiten Ramenwassen
                                        </Link>
                                        <Link
                                            href="/services/premium"
                                            className="text-gray-700 hover:text-[#044D8E] transition-colors py-1"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Binnen & Buiten Premium
                                        </Link>
                                        <Link
                                            href="/services/subscription"
                                            className="text-gray-700 hover:text-[#044D8E] transition-colors py-1"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Abonnementen
                                        </Link>
                                    </div>
                                </div>

                                <Link
                                    href="/about"
                                    className="text-gray-700 hover:text-[#044D8E] transition-colors font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Over Ons
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-gray-700 hover:text-[#044D8E] transition-colors font-medium py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>

                                <div className="pt-2">
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-[#044D8E] to-[#1792D0]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Link href="/#calculator">Plan Direct In</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;