"use client";
import { MapPin } from "lucide-react";

interface LocationSummaryProps {
    address: string;
    postalCode: string;
    city: string;
    onEdit: () => void;
}

const LocationSummary = ({ address, postalCode, city, onEdit }: LocationSummaryProps) => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-2 bg-[#F0F7FC] border border-[#9FCAE3] rounded-lg px-4 py-2.5">
            <div className="flex items-center gap-2 text-sm md:text-base text-[#044D8E] min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                    <strong>Jouw Locatie:</strong> {address}, {postalCode} {city}
                </span>
            </div>
            <button
                type="button"
                onClick={onEdit}
                className="text-sm md:text-base font-semibold text-[#1792D0] hover:text-[#044D8E] underline underline-offset-2 whitespace-nowrap cursor-pointer"
            >
                Adres wijzigen
            </button>
        </div>
    );
};

export default LocationSummary;