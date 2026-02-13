"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

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
            <section className="py-20 bg-gradient-to-b from-[#9FCAE3]/10 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Wat onze klanten zeggen
                    </h2>
                    <p className="text-center text-[#0F61AC] mb-12">
                        Reviews worden geladen...
                    </p>
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
    const REVIEWS_PER_PAGE = 3;
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
        <section className="py-20 bg-gradient-to-b from-[#9FCAE3]/10 to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                        Wat onze klanten zeggen
                    </h2>
                    <p className="text-center text-[#0F61AC] mb-12">
                        Betrouwbaar, professioneel en altijd tevreden
                    </p>
                </motion.div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="grid md:grid-cols-3 gap-8">
                        {currentReviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                className="h-full"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border-[#9FCAE3] h-full">
                                    <CardContent className="p-6">
                                        <div className="flex mb-4">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <span key={i} className="text-[#1792D0] text-xl">★</span>
                                            ))}
                                        </div>
                                        <p className="text-[#0F61AC] mb-4 line-clamp-4">
                                            "{review.comment}"
                                        </p>
                                        <p className="font-semibold text-[#044D8E]">
                                            — {review.author}, {review.location}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Buttons - alleen tonen als er meer dan 3 reviews zijn */}
                    {totalPages > 1 && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/90 hover:bg-white shadow-lg"
                                onClick={goToPrevious}
                            >
                                <ChevronLeft className="h-6 w-6 text-[#044D8E]" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/90 hover:bg-white shadow-lg"
                                onClick={goToNext}
                            >
                                <ChevronRight className="h-6 w-6 text-[#044D8E]" />
                            </Button>

                            {/* Page Indicator */}
                            <div className="flex justify-center gap-2 mt-8">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentPage
                                            ? "bg-[#044D8E] w-8"
                                            : "bg-[#9FCAE3]"
                                            }`}
                                        onClick={() => setCurrentPage(index)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Review;