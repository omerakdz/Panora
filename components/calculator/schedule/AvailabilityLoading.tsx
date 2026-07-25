import { Loader2 } from "lucide-react";

const AvailabilityLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin">
                <Loader2 className="w-12 h-12 text-[#1792D0]" />
            </div>
            <div className="text-center">
                <p className="text-[#044D8E] font-semibold text-lg mb-2">
                    Momentje… We stemmen onze agenda exclusief af op jouw buurt! 🚗✨
                </p>
                <p className="text-slate-600 text-sm">
                    We berekenen de beste momenten voor jouw locatie
                </p>
            </div>
        </div>
    )
}

export default AvailabilityLoading;