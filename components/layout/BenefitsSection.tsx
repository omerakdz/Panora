import { CheckCircle2, Clock, Droplets, FileCheck, Sparkles } from "lucide-react";


const BenefitsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-[#044D8E]" />
                        </div>
                        <h3 className="font-semibold text-[#044D8E] mb-2">Transparante prijs</h3>
                        <p className="text-sm text-[#0F61AC]">Direct duidelijkheid</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-[#044D8E]" />
                        </div>
                        <h3 className="font-semibold text-[#044D8E] mb-2">Snelle beschikbaarheid</h3>
                        <p className="text-sm text-[#0F61AC]">Snel ingepland</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                            <Droplets className="w-8 h-8 text-[#044D8E]" />
                        </div>
                        <h3 className="font-semibold text-[#044D8E] mb-2">Osmose-techniek</h3>
                        <p className="text-sm text-[#0F61AC]">Streeploos resultaat</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                            <FileCheck className="w-8 h-8 text-[#044D8E]" />
                        </div>
                        <h3 className="font-semibold text-[#044D8E] mb-2">Digitale bevestiging</h3>
                        <p className="text-sm text-[#0F61AC]">Alles digitaal</p>
                    </div>
                    <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
                        <div className="w-16 h-16 bg-[#9FCAE3]/20 rounded-full flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8 text-[#044D8E]" />
                        </div>
                        <h3 className="font-semibold text-[#044D8E] mb-2">Streeploos resultaat</h3>
                        <p className="text-sm text-[#0F61AC]">Perfecte afwerking</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection;