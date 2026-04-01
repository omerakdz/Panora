import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
};

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div
                className={cn(
                    "border-t-[#1792D0] border-r-[#1792D0] border-b-[#9FCAE3] border-l-[#9FCAE3] rounded-full animate-spin",
                    sizeClasses[size]
                )}
            />
        </div>
    );
};

export const LoadingDots = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center justify-center gap-1", className)}>
            <div className="w-2 h-2 bg-[#1792D0] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-[#0F61AC] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-[#044D8E] rounded-full animate-bounce"></div>
        </div>
    );
};

export const LoadingPulse = ({ className, text = "Laden..." }: { className?: string; text?: string }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[#9FCAE3] rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-[#1792D0] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-[#044D8E] font-medium">{text}</p>
        </div>
    );
};
