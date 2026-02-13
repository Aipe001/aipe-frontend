"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    title: "TDS Refund",
    subtitle: "Get your TDS refund in 30 days",
    buttonText: "Claim Refund",
    bgClass: "bg-green-600 text-white",
  },
  {
    id: 2,
    title: "Mutual Funds",
    subtitle: "Invest in stocks, sip & mutual funds",
    buttonText: "Invest",
    bgClass: "bg-orange-500 text-white",
  },
  {
    id: 3,
    title: "Improve CIBIL Score",
    subtitle: "Get your CIBIL score improved by the help of our experts",
    buttonText: "Improve Now",
    bgClass: "bg-purple-600 text-white",
  },
  {
    id: 4,
    title: "GST Registration",
    subtitle: "Get your GST registration done in 2 days",
    buttonText: "Apply",
    bgClass: "bg-pink-600 text-white",
  },
];

export function TrendingServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 md:py-8">
      <div className="page-container">
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Trending Services
          </h2>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 md:w-10 md:h-10 hidden md:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 md:w-10 md:h-10 hidden md:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 md:-mx-4 md:px-4 scrollbar-hide snap-x snap-mandatory" // Increased pb, added md:-mx-4 md:px-4
        >
          {spotlightItems.map((item) => (
            <div
              key={item.id}
              className={`flex-none w-[85vw] md:w-[300px] lg:w-[340px] h-40 md:h-48 rounded-2xl p-6 flex flex-col justify-between shadow-lg snap-center ${item.bgClass} relative overflow-hidden`} // Reduced widths
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
