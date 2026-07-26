"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface WindowHelpDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const WindowHelpDialog = ({ open, onOpenChange }: WindowHelpDialogProps) => {
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-[#044D8E] text-center cursor-pointer">
                            Hoe tel je je ramen?
                        </h2>

                        <div className="relative aspect-4/3 mt-5 rounded-lg overflow-hidden">
                            <Image
                                src="/images/ramen.png"
                                alt="Ramen tellen"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                className="w-full bg-[#044D8E]"
                                onClick={() => onOpenChange(false)}
                            >
                                Begrepen
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WindowHelpDialog;