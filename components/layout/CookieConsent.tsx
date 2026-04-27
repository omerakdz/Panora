"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShowBanner(true);
        } else {
            // Load saved preferences
            try {
                const savedPrefs = JSON.parse(consent);
                setPreferences(savedPrefs);
            } catch (e) {
                setShowBanner(true);
            }
        }
    }, []);

    const saveConsent = (prefs: typeof preferences) => {
        localStorage.setItem("cookie-consent", JSON.stringify(prefs));
        setShowBanner(false);

        // Update Google Tag Manager consent (Consent Mode v2)
        if (typeof window !== 'undefined') {
            // Use dataLayer for GTM
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
                'event': 'consent_update',
                'consent': {
                    'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                    'ad_personalization': prefs.marketing ? 'granted' : 'denied',
                }
            });

            // Also update gtag for GA4 (if loaded independently)
            if ((window as any).gtag) {
                (window as any).gtag('consent', 'update', {
                    'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                    'ad_storage': prefs.marketing ? 'granted' : 'denied',
                    'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                    'ad_personalization': prefs.marketing ? 'granted' : 'denied',
                });
            }
        }
    };

    const acceptAll = () => {
        const allAccepted = { necessary: true, analytics: true, marketing: true };
        setPreferences(allAccepted);
        saveConsent(allAccepted);
    };

    const rejectNonEssential = () => {
        const essentialOnly = { necessary: true, analytics: false, marketing: false };
        setPreferences(essentialOnly);
        saveConsent(essentialOnly);
    };

    const savePreferences = () => {
        saveConsent(preferences);
        setShowSettings(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Overlay */}
            {showSettings && (
                <div
                    className="fixed inset-0 bg-black/50 z-[9998]"
                    onClick={() => setShowSettings(false)}
                />
            )}

            {/* Cookie Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-2xl border-t-4 border-[#044D8E]">
                <div className="container mx-auto px-4 py-6">
                    {!showSettings ? (
                        // Main Banner
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🍪</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                                            We gebruiken cookies
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            We gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en gepersonaliseerde inhoud te tonen.
                                            Door op &quot;Alles accepteren&quot; te klikken, gaat u akkoord met ons gebruik van cookies.{" "}
                                            <Link href="/privacy" className="text-[#044D8E] hover:underline font-medium">
                                                Lees ons privacybeleid
                                            </Link>
                                            {" "}of{" "}
                                            <Link href="/cookies" className="text-[#044D8E] hover:underline font-medium">
                                                cookiebeleid
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                                >
                                    Instellingen
                                </button>
                                <button
                                    onClick={rejectNonEssential}
                                    className="px-6 py-2.5 border-2 border-[#044D8E] text-[#044D8E] rounded-lg font-medium hover:bg-[#044D8E]/5 transition-colors whitespace-nowrap"
                                >
                                    Alleen noodzakelijk
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white rounded-lg font-medium hover:shadow-lg transition-all whitespace-nowrap"
                                >
                                    Alles accepteren
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Settings Panel
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Sluiten"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="font-bold text-xl text-gray-900 mb-4">
                                Cookie Instellingen
                            </h3>

                            <div className="space-y-4 mb-6">
                                {/* Necessary Cookies */}
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="necessary"
                                        checked={preferences.necessary}
                                        disabled
                                        className="mt-1 w-5 h-5 rounded border-gray-300"
                                    />
                                    <div className="flex-1">
                                        <label htmlFor="necessary" className="font-semibold text-gray-900 block mb-1">
                                            Noodzakelijke Cookies <span className="text-sm text-gray-500">(Altijd actief)</span>
                                        </label>
                                        <p className="text-sm text-gray-600">
                                            Deze cookies zijn essentieel voor het functioneren van de website en kunnen niet worden uitgeschakeld.
                                        </p>
                                    </div>
                                </div>

                                {/* Analytics Cookies */}
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="analytics"
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#044D8E] focus:ring-[#044D8E]"
                                    />
                                    <div className="flex-1">
                                        <label htmlFor="analytics" className="font-semibold text-gray-900 block mb-1 cursor-pointer">
                                            Analytische Cookies
                                        </label>
                                        <p className="text-sm text-gray-600">
                                            Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken door informatie anoniem te verzamelen en te rapporteren.
                                        </p>
                                    </div>
                                </div>

                                {/* Marketing Cookies */}
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        checked={preferences.marketing}
                                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#044D8E] focus:ring-[#044D8E]"
                                    />
                                    <div className="flex-1">
                                        <label htmlFor="marketing" className="font-semibold text-gray-900 block mb-1 cursor-pointer">
                                            Marketing Cookies
                                        </label>
                                        <p className="text-sm text-gray-600">
                                            Deze cookies worden gebruikt om advertenties weer te geven die relevant zijn voor u en uw interesses.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Annuleren
                                </button>
                                <button
                                    onClick={savePreferences}
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Voorkeuren opslaan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
