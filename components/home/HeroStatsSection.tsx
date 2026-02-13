"use client";

import Image from "next/image";

export function HeroStatsSection() {
  return (
    <section className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="page-container">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-12">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto md:mr-auto">
              {/* Image Container with decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-3xl transform rotate-3 scale-105" />
              <Image
                src="/assets/hero-2.png"
                alt="AIPE Experts"
                fill
                className="object-cover rounded-3xl shadow-xl relative z-10"
              />
            </div>
          </div>

          {/* Right Side: Stats */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
            <div className="space-y-16 w-full max-w-md">
              {/* Stat 1 */}
              <div className="flex items-center gap-7 border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                <h3 className="text-4xl md:text-5xl font-bold text-[#1C8AFF]">
                  1,000+
                </h3>
                <p className="text-xl md:text-2xl font-medium text-foreground">
                  Experts
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-7 border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                <h3 className="text-4xl md:text-5xl font-bold text-[#1C8AFF]">
                  4.9/5
                </h3>
                <p className="text-xl md:text-2xl font-medium text-foreground">
                  Rated
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-7 border-b pb-4 border-gray-100 last:border-0 last:pb-0">
                <h3 className="text-4xl md:text-5xl font-bold text-[#1C8AFF]">
                  2,000
                </h3>
                <p className="text-xl md:text-2xl font-medium text-foreground">
                  Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
