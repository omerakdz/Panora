"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!mounted || !open) return null;

    return createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                animation: 'fadeIn 0.2s ease-out',
            }}
        >
            {/* Backdrop */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: -1,
                    animation: 'fadeIn 0.3s ease-out',
                }}
            />
            {/* Dialog Content */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '42rem',
                    animation: 'scaleIn 0.3s ease-out',
                }}
            >
                {children}
            </div>
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>,
        document.body
    );
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}

export function DialogContent({ children, className, onClose }: DialogContentProps) {
    return (
        <div
            className={cn(
                "relative bg-white rounded-lg shadow-2xl w-full overflow-hidden",
                className
            )}
            role="dialog"
            aria-modal="true"
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#044D8E] focus:ring-offset-2 z-10 bg-white/80 p-1"
                    aria-label="Sluiten"
                >
                    <X className="h-5 w-5 text-[#044D8E]" />
                    <span className="sr-only">Sluiten</span>
                </button>
            )}
            {children}
        </div>
    );
}

interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
    return (
        <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left p-6", className)}>
            {children}
        </div>
    );
}

interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
    return (
        <h2 className={cn("text-xl font-semibold text-[#044D8E]", className)}>
            {children}
        </h2>
    );
}

interface DialogDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
    return (
        <p className={cn("text-sm text-[#0F61AC]", className)}>
            {children}
        </p>
    );
}

interface DialogFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0", className)}>
            {children}
        </div>
    );
}
