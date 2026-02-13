"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Calculator from "@/components/calculator/Calculator";
import { UI_TEXT } from "@/lib/constants";
import ImageSlider from "@/components/layout/ImageSlider";
import Review from "@/components/layout/Review";
import Services from "@/components/layout/Services";
import BenefitsSection from "@/components/layout/BenefitsSection";
import HowItWorks from "@/components/layout/HowItWorks";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#9FCAE3]/30 to-white py-20 md:py-24 overflow-hidden">
        {/* Wazige achtergrond foto - Mobile */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 md:hidden"
          style={{
            backgroundImage: 'url(/images/testImage1.png)',
            filter: 'blur(0.5px)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Wazige achtergrond foto - Desktop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 hidden md:block"
          style={{
            backgroundImage: 'url(/images/BG-IMAGE.jpeg)',
            filter: 'blur(0.2px)',
            transform: 'scale(1.1)'
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent">
                Professionele ramenwas - Gent
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-3 text-[#0F61AC] font-semibold">
                snel, strak en betrouwbaar
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-[#0F61AC] mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {UI_TEXT.hero.subtitle}
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="bg-[#044D8E] hover:bg-[#0F61AC] text-white px-8">
                  <Link href="#calculator">{UI_TEXT.cta.primary}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-b from-white to-[#9FCAE3]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 flex justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent">
                  <img
                    src="/images/LOGO_PANORA_TEXT.png"
                    alt="PANORA"
                    className="h-25 w-auto"
                    style={{ transform: "scale(2.8)", transformOrigin: "center" }}
                  />
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#044D8E]">
                Bereken jouw prijs in 5 eenvoudige stappen
              </h2>
              <p className="text-[#0F61AC] text-lg">
                Direct duidelijkheid over je investering — geen verborgen kosten
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Calculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* USP's Section */}
      <BenefitsSection />

      {/* Services Section */}
      <Services />

      {/* CTA Halfway */}
      <section className="py-16 bg-gradient-to-r from-[#044D8E] to-[#1792D0] text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex justify-center">
            <span className="text-4xl font-bold text-white">
              <img
                src="/images/PANORA_LOGO_WHITE.png"
                alt="PANORA"
                className="h-25 w-auto"
                style={{ transform: "scale(2.8)", transformOrigin: " center" }}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            In één flow geregeld: prijs → datum → bevestiging
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Geen gedoe, geen telefoontjes. Gewoon snel en transparant.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-[#044D8E] hover:bg-[#9FCAE3]">
              <Link href="#calculator">Start nu met de calculator</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent">
                <img
                  src="/images/LOGO_PANORA_TEXT.png"
                  alt="PANORA"
                  className="h-25 w-auto"
                  style={{ transform: "scale(2.8)", transformOrigin: " center" }}
                />
              </span>

            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
              Voor & Na
            </h2>
            <p className="text-center text-[#0F61AC] mb-12">
              Bekijk het verschil dat PANORA maakt
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ImageSlider
              images={[
                {
                  src: "/images/1.png",
                  alt: "Voor en na ramenwas resultaat 1",
                },
                {
                  src: "/images/2.png",
                  alt: "Voor en na ramenwas resultaat 2",
                },
                {
                  src: "/images/3.png",
                  alt: "Voor en na ramenwas resultaat 3",
                },
                {
                  src: "/images/4.png",
                  alt: "Voor en na ramenwas resultaat 4",
                },
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <Review />

      {/* Final CTA Section */}
      <section className="bg-[#9FCAE3]/20 py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex justify-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-[#044D8E] to-[#1792D0] bg-clip-text text-transparent">
              <img
                src="/images/LOGO_PANORA_TEXT.png"
                alt="PANORA"
                className="h-25 w-auto"
                style={{ transform: "scale(2.8)", transformOrigin: " center" }}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#044D8E]">
            Klaar voor kraakheldere ramen?
          </h2>
          <p className="text-[#0F61AC] text-lg mb-8 max-w-2xl mx-auto">
            Bereken je prijs en plan je afspraak in minder dan 1 minuut.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-[#044D8E] hover:bg-[#0F61AC]">
              <Link href="#calculator">Start de calculator</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
