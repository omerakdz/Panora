import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { CONTACT } from "@/lib/constants";

export const metadata = {
    title: "Cookiebeleid - PANORA",
    description: "Cookiebeleid van PANORA Glasreinigingsdiensten",
    alternates: {
        canonical: "https://www.panora.be/cookies",
    },
};

export default function CookiesPage() {
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
                        Cookiebeleid
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
                            Wat zijn cookies?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Cookies zijn kleine tekstbestanden die op uw computer of mobiel apparaat worden geplaatst wanneer u een website bezoekt. Cookies worden veel gebruikt om websites te laten werken of efficiënter te laten werken, en om informatie te verstrekken aan de eigenaren van de website.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Dit cookiebeleid legt uit welke cookies PANORA gebruikt, waarom we ze gebruiken en hoe u ze kunt beheren of verwijderen.
                        </p>
                    </section>

                    {/* How We Use Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Hoe gebruiken wij cookies?
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Wij gebruiken cookies voor verschillende doeleinden: om onze website goed te laten functioneren, om uw gebruikservaring te verbeteren, om inzicht te krijgen in hoe bezoekers onze website gebruiken, en om relevante informatie te tonen.
                        </p>
                    </section>

                    {/* Types of Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Welke cookies gebruiken wij?
                        </h2>

                        <div className="space-y-6">
                            {/* Necessary Cookies */}
                            <div className="border-l-4 border-[#044D8E] pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    1. Noodzakelijke Cookies
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Deze cookies zijn essentieel voor het functioneren van onze website. Zonder deze cookies kunnen bepaalde delen van de website niet goed werken. Deze cookies verzamelen geen informatie over u die gebruikt zou kunnen worden voor marketing of om te onthouden waar u op het internet bent geweest.
                                </p>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 font-semibold text-gray-900">Cookie</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Doel</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Duur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">cookie-consent</td>
                                                <td className="py-3 text-gray-700">Slaat uw cookie voorkeuren op</td>
                                                <td className="py-3 text-gray-700">1 jaar</td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">session</td>
                                                <td className="py-3 text-gray-700">Behoudt uw sessie tijdens het boekingsproces</td>
                                                <td className="py-3 text-gray-700">Sessie</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    2. Analytische Cookies
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Deze cookies stellen ons in staat om het gebruik van onze website te analyseren, zodat we de prestaties ervan kunnen meten en verbeteren. Ze helpen ons te begrijpen welke pagina&apos;s het populairst zijn, welke het minst worden gebruikt en hoe bezoekers door de website navigeren.
                                </p>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 font-semibold text-gray-900">Cookie</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Provider</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Doel</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Duur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">_ga</td>
                                                <td className="py-3 text-gray-700">Google Analytics</td>
                                                <td className="py-3 text-gray-700">Onderscheidt gebruikers</td>
                                                <td className="py-3 text-gray-700">2 jaar</td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">_ga_*</td>
                                                <td className="py-3 text-gray-700">Google Analytics</td>
                                                <td className="py-3 text-gray-700">Behoudt sessiestatus</td>
                                                <td className="py-3 text-gray-700">2 jaar</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-gray-700">_gid</td>
                                                <td className="py-3 text-gray-700">Google Analytics</td>
                                                <td className="py-3 text-gray-700">Onderscheidt gebruikers</td>
                                                <td className="py-3 text-gray-700">24 uur</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-sm text-gray-600 italic">
                                    Alle informatie die door deze cookies wordt verzameld, wordt geaggregeerd en is daarom anoniem. Deze cookies worden alleen met uw toestemming geplaatst.
                                </p>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="border-l-4 border-purple-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    3. Marketing Cookies
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Deze cookies worden gebruikt om bezoekers te volgen wanneer ze verschillende websites bezoeken. Het doel is om advertenties weer te geven die relevant en aantrekkelijk zijn voor de individuele gebruiker en daardoor waardevoller voor uitgevers en externe adverteerders.
                                </p>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 font-semibold text-gray-900">Cookie</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Provider</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Doel</th>
                                                <th className="text-left py-2 font-semibold text-gray-900">Duur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-100">
                                                <td className="py-3 text-gray-700">_gcl_au</td>
                                                <td className="py-3 text-gray-700">Google Ads</td>
                                                <td className="py-3 text-gray-700">Experimenteert met advertentie-efficiëntie</td>
                                                <td className="py-3 text-gray-700">3 maanden</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 text-gray-700">ads/ga-audiences</td>
                                                <td className="py-3 text-gray-700">Google Ads</td>
                                                <td className="py-3 text-gray-700">Gebruikt voor remarketing</td>
                                                <td className="py-3 text-gray-700">Sessie</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-sm text-gray-600 italic">
                                    Deze cookies worden alleen met uw toestemming geplaatst. U kunt uw toestemming op elk moment intrekken.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Cookies van derden
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Naast onze eigen cookies, kunnen we ook cookies van derden gebruiken om het gebruik van onze website te rapporteren en om te adverteren:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>
                                <strong>Google Analytics:</strong> Voor websiteanalyse en rapportage. Meer informatie vindt u in het{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#044D8E] hover:underline"
                                >
                                    privacybeleid van Google
                                </a>
                                .
                            </li>
                            <li>
                                <strong>Google Ads:</strong> Voor het tonen van relevante advertenties. Meer informatie vindt u in het{" "}
                                <a
                                    href="https://policies.google.com/technologies/ads"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#044D8E] hover:underline"
                                >
                                    advertentiebeleid van Google
                                </a>
                                .
                            </li>
                        </ul>
                    </section>

                    {/* Managing Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Hoe kunt u cookies beheren?
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Via onze website
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    U kunt uw cookievoorkeuren op elk moment wijzigen door te klikken op de onderstaande knop:
                                </p>
                                <CookieSettingsButton />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Via uw browser
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    De meeste browsers staan u toe om cookies te weigeren of om bepaalde cookies te verwijderen. Hieronder vindt u instructies voor de meest gebruikte browsers:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>
                                        <a
                                            href="https://support.google.com/chrome/answer/95647"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#044D8E] hover:underline"
                                        >
                                            Google Chrome
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.mozilla.org/nl/kb/cookies-informatie-websites-computer"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#044D8E] hover:underline"
                                        >
                                            Mozilla Firefox
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#044D8E] hover:underline"
                                        >
                                            Safari (macOS)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.apple.com/nl-nl/HT201265"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#044D8E] hover:underline"
                                        >
                                            Safari (iOS)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#044D8E] hover:underline"
                                        >
                                            Microsoft Edge
                                        </a>
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-3">
                                    <strong>Let op:</strong> Als u cookies uitschakelt, is het mogelijk dat bepaalde delen van onze website niet goed functioneren.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Google Analytics uitschakelen
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    U kunt voorkomen dat uw gegevens worden gebruikt door Google Analytics door de{" "}
                                    <a
                                        href="https://tools.google.com/dlpage/gaoptout"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#044D8E] hover:underline"
                                    >
                                        Google Analytics opt-out browser add-on
                                    </a>{" "}
                                    te installeren.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Wijzigingen in dit cookiebeleid
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken of om andere operationele, wettelijke of regelgevende redenen weer te geven. De datum van de laatste wijziging wordt bovenaan deze pagina vermeld.
                        </p>
                    </section>

                    {/* More Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Meer informatie
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Voor meer informatie over hoe wij uw persoonlijke gegevens verwerken, verwijzen wij u naar ons{" "}
                            <Link href="/privacy" className="text-[#044D8E] hover:underline">
                                privacybeleid
                            </Link>
                            .
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Voor algemene informatie over cookies, kunt u terecht op{" "}
                            <a
                                href="https://www.allaboutcookies.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#044D8E] hover:underline"
                            >
                                www.allaboutcookies.org
                            </a>
                            .
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Contact
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Als u vragen heeft over ons gebruik van cookies, kunt u contact met ons opnemen:
                        </p>
                        <div className="bg-gradient-to-r from-[#044D8E] to-[#0F61AC] text-white p-6 rounded-lg">
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
