import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata = {
    title: "Algemene Voorwaarden - PANORA",
    description: "Algemene voorwaarden van PANORA Glasreinigingsdiensten",
};

export default function TermsPage() {
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
                        Algemene Voorwaarden
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
                            1. Definities
                        </h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li><strong>PANORA:</strong> De dienstverlener, gevestigd in Gent en omgeving</li>
                            <li><strong>Klant:</strong> De natuurlijke of rechtspersoon die gebruik maakt van de diensten van PANORA</li>
                            <li><strong>Diensten:</strong> Alle glasreinigingsdiensten aangeboden door PANORA</li>
                            <li><strong>Offerte:</strong> Het aanbod van PANORA aan de klant voor het verrichten van diensten</li>
                            <li><strong>Overeenkomst:</strong> De afspraak tussen PANORA en de klant</li>
                        </ul>
                    </section>

                    {/* Applicability */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            2. Toepasselijkheid
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            2.1. Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van PANORA, tenzij schriftelijk anders is overeengekomen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            2.2. Door het accepteren van een offerte of het aangaan van een overeenkomst met PANORA, verklaart de klant kennis te hebben genomen van deze algemene voorwaarden en deze te aanvaarden.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            2.3. Afwijkingen van deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.
                        </p>
                    </section>

                    {/* Offers and Quotes */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            3. Offertes en Prijzen
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            3.1. Alle offertes zijn vrijblijvend en geldig voor 30 dagen, tenzij anders vermeld.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            3.2. De prijzen zijn gebaseerd op de informatie die door de klant is verstrekt. Indien deze informatie onjuist blijkt, behoudt PANORA zich het recht voor om de prijs aan te passen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            3.3. Alle prijzen zijn inclusief BTW, tenzij anders vermeld.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            3.4. PANORA behoudt zich het recht voor om prijzen te wijzigen. Prijswijzigingen hebben geen invloed op reeds bevestigde afspraken.
                        </p>
                    </section>

                    {/* Appointments */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            4. Afspraken en Annuleringen
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            4.1. Afspraken worden gemaakt in onderling overleg tussen PANORA en de klant.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            4.2. De klant kan een afspraak kosteloos annuleren tot 48 uur voor de geplande datum. Bij annulering binnen 48 uur voor de afspraak wordt 50% van het afgesproken bedrag in rekening gebracht.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            4.3. Bij annulering op de dag zelf of no-show wordt het volledige bedrag in rekening gebracht.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            4.4. PANORA behoudt zich het recht voor om een afspraak te verzetten wegens overmacht of onvoorziene omstandigheden. In dat geval zal tijdig contact worden opgenomen met de klant om een nieuwe afspraak te maken.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            4.5. De klant dient ervoor te zorgen dat de werklocatie toegankelijk is op het afgesproken tijdstip. Indien dit niet het geval is, kan dit als annulering worden beschouwd.
                        </p>
                    </section>

                    {/* Service Execution */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            5. Uitvoering van Diensten
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            5.1. PANORA zal de diensten met zorg en vakmanschap uitvoeren.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            5.2. De klant dient PANORA op de hoogte te stellen van bijzondere omstandigheden die van belang kunnen zijn voor de uitvoering van de diensten.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            5.3. Bij extreme weersomstandigheden (storm, vrieskou, etc.) behoudt PANORA zich het recht voor om de afspraak te verzetten in overleg met de klant.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            5.4. Eventuele extra werkzaamheden die niet in de offerte zijn opgenomen, worden alleen uitgevoerd na voorafgaande toestemming van de klant.
                        </p>
                    </section>

                    {/* Payment */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            6. Betaling
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            6.1. Betaling dient te geschieden direct na voltooiing van de dienst, tenzij anders overeengekomen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            6.2. PANORA accepteert betaling via bankoverschrijving, contactloos of cash.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            6.3. Bij abonnementen geldt een automatische incasso of factuurperiode zoals overeengekomen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            6.4. Bij te late betaling is de klant van rechtswege in verzuim en is PANORA gerechtigd vertragingsrente in rekening te brengen van 10% per maand.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            6.5. Alle buitengerechtelijke kosten die PANORA moet maken bij het innen van een niet betaalde factuur, komen voor rekening van de klant.
                        </p>
                    </section>

                    {/* Complaints */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            7. Klachten en Garantie
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            7.1. Klachten over de uitgevoerde diensten dienen binnen 7 dagen na uitvoering schriftelijk (per e-mail) te worden ingediend bij PANORA.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            7.2. PANORA zal klachten zo spoedig mogelijk, maar uiterlijk binnen 14 dagen na ontvangst, behandelen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            7.3. Indien een klacht gegrond is, zal PANORA naar eigen keuze de werkzaamheden opnieuw uitvoeren of de betaalde prijs (gedeeltelijk) terugbetalen.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            7.4. PANORA garandeert schone ramen bij normale weersomstandigheden. Regen en weer kort na de reiniging vallen buiten de garantie.
                        </p>
                    </section>

                    {/* Liability */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            8. Aansprakelijkheid
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            8.1. PANORA is verzekerd voor beroepsaansprakelijkheid en zal zorgvuldig te werk gaan.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            8.2. PANORA is niet aansprakelijk voor schade aan eigendommen van de klant die voortvloeit uit normale slijtage of gebreken die al aanwezig waren voor de dienstverlening.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            8.3. De aansprakelijkheid van PANORA is beperkt tot het bedrag dat in voorkomend geval door de verzekeraar wordt uitgekeerd.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            8.4. PANORA is niet aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            8.5. De klant is verantwoordelijk voor het verwijderen van breekbare voorwerpen of waardevolle items uit het werkgebied.
                        </p>
                    </section>

                    {/* Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            9. Privacy en Gegevensbescherming
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            9.1. PANORA verwerkt persoonlijke gegevens in overeenstemming met de geldende privacywetgeving.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            9.2. Voor meer informatie over hoe wij uw gegevens verwerken, verwijzen wij u naar ons{" "}
                            <Link href="/privacy" className="text-[#044D8E] hover:underline">
                                privacybeleid
                            </Link>
                            .
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            9.3. De klant heeft het recht om zijn persoonsgegevens in te zien, te wijzigen of te laten verwijderen.
                        </p>
                    </section>

                    {/* Force Majeure */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            10. Overmacht
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            10.1. In geval van overmacht is PANORA niet gehouden tot het nakomen van enige verplichting jegens de klant.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            10.2. Onder overmacht wordt verstaan: ziekte, extreme weersomstandigheden, stakingen, brand, overheidsmaatregelen en alle andere omstandigheden die redelijkerwijs niet voorzienbaar waren en buiten de wil van PANORA liggen.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            10.3. Bij overmacht zal PANORA contact opnemen met de klant om een nieuwe afspraak te maken.
                        </p>
                    </section>

                    {/* Subscriptions */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            11. Abonnementen
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            11.1. Abonnementen worden aangegaan voor een minimale periode van 12 maanden, tenzij anders overeengekomen.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            11.2. Abonnementen worden automatisch verlengd, tenzij de klant minimaal 1 maand voor het einde van de looptijd opzegt.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            11.3. Bij abonnementen worden de diensten uitgevoerd volgens een vooraf afgesproken schema.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            11.4. De klant kan verzoeken om wijziging van de planning, maar PANORA kan hier niet altijd aan voldoen afhankelijk van de beschikbaarheid.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            12. Intellectueel Eigendom
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            12.1. Alle intellectuele eigendomsrechten met betrekking tot de door PANORA ontwikkelde materialen berusten uitsluitend bij PANORA.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            12.2. Het is de klant niet toegestaan om foto&apos;s, logo&apos;s of andere materialen van PANORA te gebruiken zonder voorafgaande schriftelijke toestemming.
                        </p>
                    </section>

                    {/* Applicable Law */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            13. Toepasselijk Recht en Geschillen
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            13.1. Op alle overeenkomsten tussen PANORA en de klant is uitsluitend Belgisch recht van toepassing.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            13.2. Geschillen die voortvloeien uit of verband houden met de overeenkomst zullen bij voorkeur in onderling overleg worden opgelost.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            13.3. Indien geen overeenstemming kan worden bereikt, zijn uitsluitend de bevoegde rechters in het arrondissement Gent bevoegd, tenzij de wet dwingend anders voorschrijft.
                        </p>
                    </section>

                    {/* Amendments */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            14. Wijzigingen
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            14.1. PANORA behoudt zich het recht voor om deze algemene voorwaarden te wijzigen.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            14.2. Wijzigingen worden van kracht na publicatie op de website. Indien de klant niet akkoord gaat met de wijzigingen, kan hij de overeenkomst beëindigen.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            15. Contact
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
                        </p>
                        <div className="bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white p-6 rounded-lg">
                            <p className="mb-2"><strong>PANORA</strong></p>
                            <p className="mb-2"><strong>E-mail:</strong> info@panora.be</p>
                            <p className="mb-2"><strong>Telefoon:</strong> {CONTACT.phoneDisplay}</p>
                            <p><strong>Website:</strong> www.panora.be</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
