"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
    return (
        <section className="bg-background pt-6 pb-2 sticky top-16 z-40 md:static md:z-auto md:pt-12 md:pb-8">
            <div className="page-container">
                <div className="flex flex-col gap-6 md:items-center md:text-center">

                    <div className="space-y-2 md:space-y-4">
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                            What are you looking for?
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto hidden md:block">
                            Expert financial & legal services at your doorstep. Trained professionals, transparent pricing.
                        </p>
                    </div>

                    <div className="relative w-full max-w-2xl mx-auto shadow-sm md:shadow-md rounded-xl">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search for 'GST', 'ITR', 'Loans'..."
                            className="w-full h-12 md:h-14 pl-12 pr-4 bg-muted/30 md:bg-background border-muted-foreground/20 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-primary/20 rounded-xl text-base transition-all"
                        />
                    </div>

                    {/* Mobile Location Prompt if not in header */}
                    <div className="flex md:hidden items-center gap-2 text-xs text-muted-foreground px-1">
                        <MapPin className="w-3 h-3" />
                        <span>Serving in New Delhi, India</span>
                    </div>

                </div>
            </div>
        </section>
    );
}
