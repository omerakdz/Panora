import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacybeleid - PANORA",
    description: "Privacybeleid en gegevensbescherming van PANORA Glasreinigingsdiensten",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#044D8E] hover:text-[#0F61AC] mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Terug naar home
                </Link>

                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Privacybeleid
                    </h1>
                    <p className="text-gray-600">
                        Laatst bijgewerkt: {new Date().toLocaleDateString("nl-BE", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            1. Introductie
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            PANORA (&quot;wij&quot;, &quot;ons&quot; of &quot;onze&quot;) respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens. Dit privacybeleid legt uit hoe wij uw persoonlijke informatie verzamelen, gebruiken, delen en beschermen wanneer u onze website bezoekt en gebruik maakt van onze glasreinigingsdiensten.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Dit beleid is van toepassing op alle persoonlijke gegevens die wij verzamelen via onze website, telefonisch contact, e-mail of andere communicatiemiddelen.
                        </p>
                    </section>

                    {/* Data Controller */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. Verantwoordelijke voor gegevensverwerking
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-700 mb-2"><strong>Bedrijfsnaam:</strong> PANORA</p>
                            <p className="text-gray-700 mb-2"><strong>E-mail:</strong> info@panora.be</p>
                            <p className="text-gray-700 mb-2"><strong>Telefoon:</strong> +32 465 91 51 26</p>
                            <p className="text-gray-700"><strong>Locatie:</strong> Gent en randgemeenten</p>
                        </div>
                    </section>

                    {/* Data Collection */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            3. Welke gegevens verzamelen wij?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij kunnen de volgende categorieën persoonlijke gegevens verzamelen:
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.1 Contactgegevens
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Naam en voornaam</li>
                                    <li>Adres</li>
                                    <li>E-mailadres</li>
                                    <li>Telefoonnummer</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.2 Dienstgerelateerde informatie
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Type woning en aantal ramen</li>
                                    <li>Servicevoorkeur (binnen/buiten reiniging)</li>
                                    <li>Gewenste afspraakdatum en tijd</li>
                                    <li>Speciale instructies of opmerkingen</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.3 Technische gegevens
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>IP-adres</li>
                                    <li>Browsertype en -versie</li>
                                    <li>Tijdzone-instelling en locatie</li>
                                    <li>Besturingssysteem en platform</li>
                                    <li>Cookies (zie ons <Link href="/cookies" className="text-[#044D8E] hover:underline">cookiebeleid</Link>)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    3.4 Gebruiksgegevens
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                    <li>Informatie over hoe u onze website gebruikt</li>
                                    <li>Pagina&apos;s die u bezoekt en duur van het bezoek</li>
                                    <li>Klikgedrag en interacties met de website</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Data */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Hoe gebruiken wij uw gegevens?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij gebruiken uw persoonlijke gegevens voor de volgende doeleinden:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Het verwerken en uitvoeren van uw boekingen en afspraken</li>
                            <li>Communicatie over uw diensten en afspraken</li>
                            <li>Het versturen van offertes en facturen</li>
                            <li>Het beantwoorden van uw vragen en verzoeken</li>
                            <li>Het verbeteren van onze website en diensten</li>
                            <li>Het uitvoeren van klanttevredenheidsonderzoeken</li>
                            <li>Marketing en promotionele doeleinden (alleen met uw toestemming)</li>
                            <li>Naleving van wettelijke verplichtingen</li>
                            <li>Detectie en voorkoming van fraude</li>
                        </ul>
                    </section>

                    {/* Legal Basis */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Rechtsgrondslag voor verwerking
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij verwerken uw persoonlijke gegevens op basis van:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Overeenkomst:</strong> Voor het uitvoeren van onze diensten</li>
                            <li><strong>Wettelijke verplichting:</strong> Voor boekhouding en belastingen</li>
                            <li><strong>Gerechtvaardigd belang:</strong> Voor websiteanalyse en verbetering</li>
                            <li><strong>Toestemming:</strong> Voor marketing en niet-essentiële cookies</li>
                        </ul>
                    </section>

                    {/* Data Sharing */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Met wie delen wij uw gegevens?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij kunnen uw persoonlijke gegevens delen met:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Dienstverleners:</strong> Zoals betalingsverwerkers, emaildiensten en websitehosting</li>
                            <li><strong>Analytics providers:</strong> Google Analytics voor websiteanalyse</li>
                            <li><strong>Wettelijke autoriteiten:</strong> Wanneer wettelijk verplicht</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Wij verkopen of verhuren uw persoonlijke gegevens nooit aan derden voor marketingdoeleinden.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            7. Hoe beschermen wij uw gegevens?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij nemen de veiligheid van uw gegevens serieus en hebben passende technische en organisatorische maatregelen getroffen:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>SSL-encryptie voor gegevensoverdracht</li>
                            <li>Beveiligde opslag van gegevens</li>
                            <li>Beperkte toegang tot persoonlijke gegevens</li>
                            <li>Regelmatige beveiligingsupdates</li>
                            <li>Training van medewerkers in gegevensbescherming</li>
                        </ul>
                    </section>

                    {/* Data Retention */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            8. Hoe lang bewaren wij uw gegevens?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Wij bewaren uw persoonlijke gegevens niet langer dan noodzakelijk:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Klantgegevens:</strong> Gedurende de looptijd van de klantrelatie plus 7 jaar (boekhoudkundige verplichting)</li>
                            <li><strong>Marketinggegevens:</strong> Tot u zich afmeldt of na 3 jaar inactiviteit</li>
                            <li><strong>Websitegegevens:</strong> Analytics data wordt na 26 maanden verwijderd</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            9. Uw rechten
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>Recht op inzage:</strong> U kunt opvragen welke gegevens wij van u hebben</li>
                            <li><strong>Recht op rectificatie:</strong> U kunt vragen om onjuiste gegevens te corrigeren</li>
                            <li><strong>Recht op verwijdering:</strong> U kunt vragen uw gegevens te verwijderen</li>
                            <li><strong>Recht op beperking:</strong> U kunt de verwerking van uw gegevens beperken</li>
                            <li><strong>Recht op overdraagbaarheid:</strong> U kunt uw gegevens in een gangbaar formaat opvragen</li>
                            <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen bepaalde verwerkingen</li>
                            <li><strong>Recht om toestemming in te trekken:</strong> U kunt uw toestemming op elk moment intrekken</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Om deze rechten uit te oefenen, kunt u contact met ons opnemen via{" "}
                            <a href="mailto:info@panora.be" className="text-[#044D8E] hover:underline">
                                info@panora.be
                            </a>
                            . Wij reageren binnen 30 dagen op uw verzoek.
                        </p>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            10. Cookies
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Onze website gebruikt cookies om uw gebruikservaring te verbeteren en om ons te helpen begrijpen hoe onze website wordt gebruikt. Voor meer informatie over hoe wij cookies gebruiken, verwijzen wij u naar ons{" "}
                            <Link href="/cookies" className="text-[#044D8E] hover:underline">
                                cookiebeleid
                            </Link>
                            .
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            11. Links naar andere websites
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Onze website kan links bevatten naar websites van derden. Wij zijn niet verantwoordelijk voor het privacybeleid of de inhoud van deze externe sites. Wij raden u aan het privacybeleid van elke website die u bezoekt te lezen.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            12. Privacy van kinderen
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Onze diensten zijn niet gericht op personen jonger dan 16 jaar. Wij verzamelen niet bewust persoonlijke gegevens van kinderen onder de 16 jaar. Als u een ouder of voogd bent en u denkt dat uw kind ons persoonlijke gegevens heeft verstrekt, neem dan contact met ons op.
                        </p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            13. Wijzigingen in dit privacybeleid
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. Wij zullen u op de hoogte brengen van belangrijke wijzigingen door een kennisgeving op onze website te plaatsen. De datum van de laatste wijziging wordt bovenaan deze pagina vermeld.
                        </p>
                    </section>

                    {/* Complaints */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            14. Klachten
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Als u een klacht heeft over hoe wij uw persoonlijke gegevens verwerken, neem dan eerst contact met ons op via{" "}
                            <a href="mailto:info@panora.be" className="text-[#044D8E] hover:underline">
                                info@panora.be
                            </a>
                            . U heeft ook het recht om een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="text-gray-700 mb-2"><strong>Gegevensbeschermingsautoriteit</strong></p>
                            <p className="text-gray-700 mb-2">Drukpersstraat 35, 1000 Brussel</p>
                            <p className="text-gray-700 mb-2">Tel: +32 (0)2 274 48 00</p>
                            <p className="text-gray-700">
                                Website:{" "}
                                <a
                                    href="https://www.gegevensbeschermingsautoriteit.be"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#044D8E] hover:underline"
                                >
                                    www.gegevensbeschermingsautoriteit.be
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            15. Contact
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Voor vragen over dit privacybeleid of over hoe wij uw persoonlijke gegevens verwerken, kunt u contact met ons opnemen:
                        </p>
                        <div className="bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white p-6 rounded-lg">
                            <p className="mb-2"><strong>E-mail:</strong> info@panora.be</p>
                            <p className="mb-2"><strong>Telefoon:</strong> +32 465 91 51 26</p>
                            <p><strong>Website:</strong> www.panora.be</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
