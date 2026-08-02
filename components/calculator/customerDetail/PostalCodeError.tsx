"use client";

import { Button } from "@/components/ui/button";

interface PostalCodeErrorProps {
    error: string;
    showContactLink: boolean;
    contactUrl?: string;
    contactButtonText?: string;
}

const PostalCodeError = ({
    error,
    showContactLink,
    contactUrl,
    contactButtonText
}: PostalCodeErrorProps) => {
    if (!error) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
            <p className="text-red-600 text-sm">{error}</p>
            {showContactLink && contactUrl && (
                <Button
                    type="button"
                    onClick={() => window.open(contactUrl, "_blank")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                    {contactButtonText || "Contacteer ons"}
                </Button>
            )}
        </div>
    );
};

export default PostalCodeError;