"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface Review {
    id: string;
    rating: number;
    comment: string;
    author: string;
    location: string;
}

const Review = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        // Check if window is mobile size
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset page when switching between mobile/desktop
    useEffect(() => {
        setCurrentPage(0);
    }, [isMobile]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(res => res.json())
            .then(data => {
                console.log('📥 Reviews loaded:', data);
                // Check if data is an array (reviews) or error object
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error('API returned error:', data);
                    setReviews([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load reviews:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#1792D0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#044D8E]/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 mobile-spacing relative z-10">
                    <div className="text-center mb-4">
                        <span className="inline-block bg-[#1792D0]/10 text-[#1792D0] text-sm font-semibold px-4 py-1.5 rounded-full">
                            ⭐ Klantbeoordelingen
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Wat onze klanten zeggen
                    </h2>
                    <p className="text-center text-slate-600 mb-12">
                        Betrouwbaar, professioneel en altijd tevreden
                    </p>

                    {/* Skeleton Loaders */}
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="border-2 border-slate-200 h-full bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        {/* Star rating skeleton */}
                                        <div className="flex mb-4 gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <div key={s} className="skeleton w-6 h-6 rounded"></div>
                                            ))}
                                        </div>
                                        {/* Comment text skeleton */}
                                        <div className="space-y-2 mb-6">
                                            <div className="skeleton skeleton-text w-full"></div>
                                            <div className="skeleton skeleton-text w-11/12"></div>
                                            <div className="skeleton skeleton-text w-10/12"></div>
                                            <div className="skeleton skeleton-text w-8/12"></div>
                                        </div>
                                        {/* Author info skeleton */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                            <div className="skeleton skeleton-circle w-10 h-10"></div>
                                            <div className="flex-1">
                                                <div className="skeleton skeleton-text w-24 mb-1"></div>
                                                <div className="skeleton skeleton-text w-16"></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (reviews.length === 0) {
        return (
            <section className="py-20 bg-gradient-to-b from-[#9FCAE3]/10 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Wat onze klanten zeggen
                    </h2>
                    <p className="text-center text-[#0F61AC] mb-12">
                        Geen reviews beschikbaar
                    </p>
                </div>
            </section>
        );
    }

    const displayReviews = reviews;
    const REVIEWS_PER_PAGE = isMobile ? 1 : 3;
    const totalPages = Math.ceil(displayReviews.length / REVIEWS_PER_PAGE);

    const goToPrevious = () => {
        setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    const startIndex = currentPage * REVIEWS_PER_PAGE;
    const currentReviews = displayReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

    return (
        <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#1792D0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#044D8E]/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-4">
                        <span className="inline-block bg-[#1792D0]/10 text-[#1792D0] text-sm font-semibold px-4 py-1.5 rounded-full">
                            ⭐ Klantbeoordelingen
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Wat onze klanten zeggen
                    </h2>
                    <p className="text-center text-slate-600 mb-12">
                        Betrouwbaar, professioneel en altijd tevreden
                    </p>
                </motion.div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {currentReviews.map((review, index) => (
                            <div
                                key={`${review.id}-${currentPage}`}
                                className="h-full transition-transform duration-300 ease-out hover:md:-translate-y-3"
                                style={{
                                    opacity: 0,
                                    animation: shouldReduceMotion ? 'none' : `fadeInUp 0.4s ease-out ${index * 0.05}s forwards`,
                                    transform: 'translateZ(0)'
                                }}
                            >
                                <Card className="border-2 border-slate-200 h-full bg-white/80 backdrop-blur-sm hover:border-[#1792D0] transition-all duration-200 relative overflow-hidden group" style={{ transform: 'translateZ(0)' }}>
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#1792D0]/5 rounded-full blur-2xl group-hover:bg-[#1792D0]/10 transition-all duration-700 ease-out"></div>
                                    <CardContent className="p-6 relative z-10">
                                        {/* Quote icon */}
                                        <div className="absolute top-4 right-4 text-[#1792D0]/10 text-6xl font-serif leading-none">
                                            "
                                        </div>

                                        <div className="flex mb-4 gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-2xl transition-transform duration-150 hover:scale-110 ${i < review.rating
                                                            ? 'text-amber-400 drop-shadow-sm'
                                                            : 'text-slate-200'
                                                        }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-slate-700 mb-6 line-clamp-4 leading-relaxed italic relative z-10 mobile-text-spacing">
                                            "{review.comment}"
                                        </p>
                                        <div className="border-t border-slate-200 pt-4">
                                            <p className="font-bold text-[#044D8E] text-sm">
                                                {review.author}
                                            </p>
                                            <p className="text-slate-500 text-xs mt-1">
                                                📍 {review.location}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls - onder de review cards */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white hover:bg-[#044D8E] hover:text-white hover:border-[#044D8E] active:scale-95 transition-all duration-150 w-12 h-12"
                                onClick={goToPrevious}
                                style={{ transform: 'translateZ(0)' }}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>

                            {/* Page Indicator */}
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index)}
                                        className={`h-3 rounded-full transition-all duration-300 touch-feedback ${index === currentPage
                                            ? "bg-[#044D8E] w-8"
                                            : "bg-[#9FCAE3] w-3"
                                            }`}
                                        aria-label={`Go to page ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white hover:bg-[#044D8E] hover:text-white hover:border-[#044D8E] active:scale-95 transition-all duration-150 w-12 h-12"
                                onClick={goToNext}
                                style={{ transform: 'translateZ(0)' }}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Review;