import { Card, CardContent } from "../ui/card";
import { mockReviews } from "@/app/api/reviews/route";

interface ReviewProps {
    reviews?: Array<{
        id: string;
        rating: number;
        comment: string;
        author: string;
        location: string;
    }>;
}

const Review = ({ reviews = [] }: ReviewProps) => {
    // Fallback naar mockReviews als er geen data is
    const displayReviews = reviews.length > 0 ? reviews : mockReviews;

    return (
        <section className="py-20 bg-gradient-to-b from-[#9FCAE3]/10 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#044D8E]">
                    Wat onze klanten zeggen
                </h2>
                <p className="text-center text-[#0F61AC] mb-12">
                    Betrouwbaar, professioneel en altijd tevreden
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {displayReviews.map((review) => (
                        <Card key={review.id} className="border-[#9FCAE3]">
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
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Review;