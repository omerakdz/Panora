"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageSliderProps {
    images: {
        src: string;
        alt: string;
    }[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };


    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative h-[500px] md:h-[600px]">
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
            </div>

            {/* Navigation Buttons Below Image */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white hover:bg-[#9FCAE3]/20 shadow-lg"
                    onClick={goToPrevious}
                    style={{ cursor: "pointer" }}
                >
                    <ChevronLeft className="h-6 w-6 text-[#044D8E]" />
                </Button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? "bg-[#044D8E] w-8"
                                : "bg-[#9FCAE3]"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white hover:bg-[#9FCAE3]/20 shadow-lg"
                    onClick={goToNext}
                    style={{ cursor: "pointer" }}
                >
                    <ChevronRight className="h-6 w-6 text-[#044D8E]" />
                </Button>
            </div>
        </div>
    )
}

export default ImageSlider