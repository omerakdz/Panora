import Script from 'next/script';
import { COMPANY, CONTACT, SOCIAL_MEDIA } from '@/lib/constants';

export default function StructuredData() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.panora.be/#organization',
        name: COMPANY.name,
        image: 'https://www.panora.be/images/PANORA_LOGO_1_1400x1400.png',
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.panora.be/images/PANORA_LOGO_1_1400x1400.png',
            width: '1400',
            height: '1400'
        },
        url: 'https://www.panora.be',
        telephone: CONTACT.phone,
        email: CONTACT.email,
        priceRange: '€€',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Gent',
            addressRegion: 'Oost-Vlaanderen',
            postalCode: '9000',
            addressCountry: 'BE'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '51.0543',  // Gent centrum
            longitude: '3.7174'
        },
        areaServed: {
            '@type': 'City',
            name: 'Gent',
            '@id': 'https://www.wikidata.org/wiki/Q1296'
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00'
            }
        ],
        sameAs: [
            SOCIAL_MEDIA.facebook,
            SOCIAL_MEDIA.instagram,
            SOCIAL_MEDIA.tiktok
        ],
        description: 'Professionele ruitenwasser in Gent en omgeving. Wij bieden betrouwbare glasreinigingsdiensten voor particulieren en bedrijven.',
        slogan: COMPANY.tagline,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Ruitenwas Diensten',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Buiten Glasreiniging',
                        description: 'Professionele reiniging van ramen aan de buitenkant'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Complete Glasreiniging',
                        description: 'Volledige ramen reiniging binnen en buiten'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Abonnementen',
                        description: 'Regelmatige glasreiniging met korting voor vaste klanten'
                    }
                }
            ]
        }
    };

    // BreadcrumbList voor homepage
    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.panora.be'
            }
        ]
    };

    return (
        <>
            <Script
                id="structured-data-organization"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Script
                id="structured-data-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
        </>
    );
}
