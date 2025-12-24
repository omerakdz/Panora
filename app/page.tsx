import { Button } from "@/components/ui/button";
import Link from "next/link";
import Calculator from "@/components/calculator/Calculator";
import { UI_TEXT } from "@/lib/constants";
import ImageSlider from "@/components/layout/ImageSlider";
import Review from "@/components/layout/Review";
import Services from "@/components/layout/Services";
import BenefitsSection from "@/components/layout/BenefitsSection";
import HowItWorks from "@/components/layout/HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#9FCAE3]/30 to-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#044D8E]">
              {UI_TEXT.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-[#0F61AC] mb-8 max-w-2xl mx-auto">
              {UI_TEXT.hero.subtitle}
            </p>


            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-[#044D8E] hover:bg-[#0F61AC] text-white">
                <Link href="#calculator">{UI_TEXT.cta.primary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#044D8E] text-[#044D8E] hover:bg-[#9FCAE3]/20">
                <Link href="#calculator">{UI_TEXT.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* USP's Section */}
      <BenefitsSection />

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-b from-white to-[#9FCAE3]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#044D8E]">
                Bereken jouw prijs in 7 eenvoudige stappen
              </h2>
              <p className="text-[#0F61AC] text-lg">
                Direct duidelijkheid over je investering — geen verborgen kosten
              </p>
            </div>
            <Calculator />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Services Section */}
      <Services />

      {/* CTA Halfway */}
      <section className="py-16 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            In één flow geregeld: prijs → datum → bevestiging
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Geen gedoe, geen telefoontjes. Gewoon snel en transparant.
          </p>
          <Button size="lg" className="bg-white text-[#044D8E] hover:bg-[#9FCAE3]">
            <Link href="#calculator">Start nu met de calculator</Link>
          </Button>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
            Voor & Na
          </h2>
          <p className="text-center text-[#0F61AC] mb-12">
            Bekijk het verschil dat PANORA maakt
          </p>

          <ImageSlider
            images={[
              {
                src: "/images/testImage1.png",
                alt: "Voor en na ramenwas resultaat 1",
              },
              {
                src: "/images/testImage2.png",
                alt: "Voor en na ramenwas resultaat 2",
              },
              {
                src: "/images/testImage3.png",
                alt: "Voor en na ramenwas resultaat 3",
              },
            ]}
          />
        </div>
      </section>

      {/* Reviews Section */}
      <Review />

      {/* Final CTA Section */}
      <section className="bg-[#9FCAE3]/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#044D8E]">
            Klaar voor kraakheldere ramen?
          </h2>
          <p className="text-[#0F61AC] text-lg mb-8 max-w-2xl mx-auto">
            Bereken je prijs en plan je afspraak in minder dan 1 minuut.
          </p>
          <Button size="lg" className="bg-[#044D8E] hover:bg-[#0F61AC]">
            <Link href="#calculator">Start de calculator</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
