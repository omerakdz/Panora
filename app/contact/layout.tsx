import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — Panora Raamreiniging Gent",
    description: "Neem contact op met PANORA voor al uw vragen over raamreiniging in Gent. Bel ons, mail ons of gebruik ons contactformulier voor een snelle reactie.",
    alternates: {
        canonical: "https://www.panora.be/contact",
    },
    openGraph: {
        title: "Contact — Panora Raamreiniging Gent",
        description: "Neem contact op met PANORA. Snel, vriendelijk en altijd bereikbaar voor uw vragen over raamreiniging in Gent.",
        url: "https://www.panora.be/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
