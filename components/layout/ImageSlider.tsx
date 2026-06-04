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
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const goToPrevious = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };


    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-slate-100">
                <div className="relative h-[350px] md:h-[450px]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-all duration-500 ease-in-out"
                            style={{
                                opacity: index === currentIndex ? 1 : 0,
                                transform: index === currentIndex
                                    ? 'translateX(0)'
                                    : index < currentIndex
                                        ? 'translateX(-100%)'
                                        : 'translateX(100%)',
                                pointerEvents: index === currentIndex ? 'auto' : 'none'
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover object-center"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons Below Image */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white hover:bg-[#9FCAE3]/20 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
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
                            className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${index === currentIndex
                                ? "bg-[#044D8E] w-8"
                                : "bg-[#9FCAE3]"
                                }`}
                            onClick={() => {
                                setDirection(index > currentIndex ? 'right' : 'left');
                                setCurrentIndex(index);
                            }}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white hover:bg-[#9FCAE3]/20 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
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