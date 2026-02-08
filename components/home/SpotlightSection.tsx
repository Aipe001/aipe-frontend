"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface SpotlightItem {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  bgClass: string;
  image?: string; // Placeholder for future images
}

const spotlightItems: SpotlightItem[] = [
  {
    id: 1,
    title: "Start a New Business",
    subtitle: "Register your company in 7 days",
    buttonText: "Consult Now",
    bgClass: "bg-blue-600 text-white",
  },
  {
    id: 2,
    title: "Tax Season Special",
    subtitle: "Flat 20% off on ITR filing",
    buttonText: "Claim Offer",
    bgClass: "bg-purple-600 text-white",
  },
  {
    id: 3,
    title: "Legal Agreements",
    subtitle: "Rent, Lease & Vendor Contracts",
    buttonText: "Draft Now",
    bgClass: "bg-orange-500 text-white",
  },
  {
    id: 4,
    title: "Trademark Registration",
    subtitle: "Protect your brand identity",
    buttonText: "Apply",
    bgClass: "bg-pink-600 text-white",
  },
];

export function SpotlightSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-4 md:py-8">
      <div className="page-container">
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            In the Spotlight
          </h2>
          {/* <Button variant="ghost" size="icon" className="rounded-full md:hidden">
            <ChevronRight className="w-5 h-5" />
          </Button> */}
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
        >
          {spotlightItems.map((item) => (
            <div
              key={item.id}
              className={`flex-none w-[85vw] md:w-[350px] lg:w-[400px] h-40 md:h-48 rounded-2xl p-6 flex flex-col justify-between shadow-lg snap-center ${item.bgClass} relative overflow-hidden`}
            >
              <div className="relative z-10 z-0">
                <h3 className="font-bold text-xl md:text-2xl mb-1">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base font-medium">
                  {item.subtitle}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-fit bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm relative z-10"
              >
                {item.buttonText}
              </Button>

              {/* Decorative circles */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -right-4 top-4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
