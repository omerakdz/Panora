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
import { Clock, Shield, Star } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#9FCAE3]/30 via-white/50 to-white py-20 md:py-24 overflow-hidden mobile-section-padding">
        {/* Decorative gradient orbs with gradient mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-50"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#1792D0]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#044D8E]/10 rounded-full blur-3xl"></div>

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
            transform: 'scale(1)'
          }}
        />

        <div className="container mx-auto px-4 mobile-spacing relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ letterSpacing: '-0.02em' }}
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
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(4, 77, 142, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] text-white px-8 shadow-depth-3 hover:shadow-blue-strong touch-feedback thumb-friendly color-transition">
                  <Link href="#calculator">{UI_TEXT.cta.primary}</Link>
                </Button>
              </motion.div>
            </motion.div>
            {/* Trust indicators */}
            <motion.div
              className="mt-12 pt-8 border-t border-slate-200/50 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1792D0]" />
                <span>Verzekerd & Gecertificeerd</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1792D0]" />
                <span>direct ingepland</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#1792D0]" />
                <span>100% Tevredenheidsgarantie</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Calculator Section */}
      <section id="calculator" className="relative py-20 mobile-section-padding section-overlay-blue">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#9FCAE3]/10"></div>
        <div className="container mx-auto px-4 mobile-spacing relative z-10">
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
      <section className="relative py-16 mobile-section-padding bg-gradient-to-br from-[#044D8E] via-[#0F61AC] to-[#1792D0] text-white overflow-hidden">
        {/* Decorative gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#044D8E]/30 rounded-full blur-3xl"></div>

        {/* Herhalend logo patroon */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/images/panora-logo.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '60px 60px',
            backgroundPosition: 'center'
          }}
        />

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
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
          <div className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" className="bg-white text-[#044D8E] hover:bg-[#9FCAE3] hover:text-white shadow-xl hover:shadow-2xl">
                <Link href="#calculator">Start nu met de calculator</Link>
              </Button>
            </motion.div>
          </div>
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
                  className="h-25 mx-auto"
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
      <section className="relative bg-gradient-to-b from-[#9FCAE3]/20 via-white to-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1792D0]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#044D8E]/10 rounded-full blur-3xl"></div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
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
          <div className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-[#044D8E] to-[#1792D0] hover:from-[#0F61AC] hover:to-[#1792D0] shadow-lg hover:shadow-xl">
                <Link href="#calculator">Start de calculator</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
