"use client";

import Script from 'next/script';

/**
 * Initialize Google Consent Mode v2 with default denied state
 * This must load before GTM to ensure proper consent management
 */
export default function ConsentInit() {
    return (
        <Script
            id="consent-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    
                    // Set default consent to 'denied' for EEA regions (GDPR compliance)
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'wait_for_update': 500,
                        'region': ['BE', 'AT', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
                                   'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
                                   'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO']
                    });

                    // Non-EEA regions get granted by default (no GDPR requirement)
                    gtag('consent', 'default', {
                        'analytics_storage': 'granted',
                        'ad_storage': 'granted',
                        'ad_user_data': 'granted',
                        'ad_personalization': 'granted'
                    });
                    
                    // Load saved consent preferences and update if user made a choice
                    try {
                        const consent = localStorage.getItem('cookie-consent');
                        if (consent) {
                            const prefs = JSON.parse(consent);
                            const consentUpdate = {};

                            if (prefs.analytics) {
                                consentUpdate['analytics_storage'] = 'granted';
                            }
                            if (prefs.marketing) {
                                consentUpdate['ad_storage'] = 'granted';
                                consentUpdate['ad_personalization'] = 'granted';
                                consentUpdate['ad_user_data'] = 'granted';
                            }

                            // Only update if user granted at least one permission
                            if (Object.keys(consentUpdate).length > 0) {
                                gtag('consent', 'update', consentUpdate);
                            }
                        }
                    } catch (e) {
                        console.error('Error loading consent preferences:', e);
                    }
                `
            }}
        />
    );
}
