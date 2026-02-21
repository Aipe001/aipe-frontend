"use client";

import { useEffect, useState, useRef } from "react";
import { Service, getFeaturedServices } from "@/lib/api/services";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPOTLIGHT_COLORS = [
  "bg-green-600 text-white",
  "bg-orange-500 text-white",
  "bg-purple-600 text-white",
  "bg-pink-600 text-white",
  "bg-[#1C8AFF] text-white",
];

export function TrendingServices() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getFeaturedServices();
        setServices(data || []);
      } catch (err) {
        console.error("Failed to fetch featured services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
          {loading ? (
            <div className="w-full py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : services.length === 0 ? (
            <div className="w-full py-12 text-center text-muted-foreground">
              No featured services available based on backend configuration.
            </div>
          ) : (
            services.map((item, index) => {
              const bgClass = SPOTLIGHT_COLORS[index % SPOTLIGHT_COLORS.length];

              return (
                <div
                  key={item.id}
                  className={`flex-none w-[90vw] md:w-[400px] lg:w-[480px] h-[240px] md:h-[280px] rounded-[2rem] p-8 flex flex-col justify-between shadow-xl snap-center ${bgClass} relative overflow-hidden`}
                >
                  <div className="relative z-10 translate-y-8 md:translate-y-12 flex flex-col items-center text-center">
                    <h3 className="font-extrabold text-3xl md:text-4xl mb-2">
                      {item.name}
                    </h3>
                    <p className="text-white/95 text-lg md:text-xl font-semibold px-4">
                      {item.shortDescription || item.description || "Discover this premium service today."}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-fit bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm relative z-10"
                  >
                    View Details
                  </Button>

                  {/* Decorative circles */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -right-4 top-4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
