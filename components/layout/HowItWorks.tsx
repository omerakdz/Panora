
const HowItWorks = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                    Hoe het werkt
                </h2>
                <p className="text-center text-[#0F61AC] mb-12 max-w-2xl mx-auto">
                    In vier eenvoudige stappen tot schone ramen
                </p>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#044D8E] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-[#044D8E]">Bereken je prijs</h3>
                        <p className="text-[#0F61AC]">
                            Vul de calculator in en zie direct je richtprijs
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#0F61AC] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-[#044D8E]">Kies datum & tijd</h3>
                        <p className="text-[#0F61AC]">
                            Selecteer een beschikbaar moment in onze agenda
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#1792D0] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-[#044D8E]">Wij komen langs</h3>
                        <p className="text-[#0F61AC]">
                            Professionele service op de afgesproken tijd
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#044D8E] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                            4
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-[#044D8E]">Foto's + factuur</h3>
                        <p className="text-[#0F61AC]">
                            Je ontvangt foto's van het resultaat en de factuur
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;