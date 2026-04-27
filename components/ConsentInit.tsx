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
                    
                    // Set default consent to 'denied' as a placeholder
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'wait_for_update': 500
                    });
                    
                    // Load saved consent preferences
                    try {
                        const consent = localStorage.getItem('cookie-consent');
                        if (consent) {
                            const prefs = JSON.parse(consent);
                            gtag('consent', 'update', {
                                'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                                'ad_storage': prefs.marketing ? 'granted' : 'denied',
                                'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                                'ad_personalization': prefs.marketing ? 'granted' : 'denied'
                            });
                        }
                    } catch (e) {
                        console.error('Error loading consent preferences:', e);
                    }
                `
            }}
        />
    );
}
