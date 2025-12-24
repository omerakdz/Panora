"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import client component dynamically to prevent SSR
const ConfirmationContent = dynamic(() => import('./ConfirmationContent').then(mod => ({ default: mod.default })), {
    ssr: false,
    loading: () => (
        <main className="min-h-screen bg-gradient-to-b from-[#9FCAE3]/10 to-white py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-[#0F61AC] text-lg">Laden...</p>
                </div>
            </div>
        </main>
    ),
});

export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-gradient-to-b from-[#9FCAE3]/10 to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-[#0F61AC] text-lg">Laden...</p>
                    </div>
                </div>
            </main>
        }>
            <ConfirmationContent />
        </Suspense>
    );
}
