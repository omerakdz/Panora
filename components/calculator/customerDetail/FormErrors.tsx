"use client";

interface FormErrorsProps {
    error?: string;
}

const FormErrors = ({ error }: FormErrorsProps) => {
    if (!error) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
        </div>
    );
};

export default FormErrors;