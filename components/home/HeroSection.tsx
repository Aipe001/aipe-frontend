"use client";

import Image from "next/image";
import { StoreButtons } from "@/components/ui/store-buttons";

interface HeroSectionProps {
  hidePhone?: boolean;
}

export function HeroSection({ hidePhone = false }: HeroSectionProps) {
  return (
    <section className="relative bg-background pt-8 pb-0 md:pt-12 overflow-hidden">
      <div className="page-container flex flex-col items-center text-center z-10 relative">
        {/* Top Navigation / Pill (Optional, matching Snabbit style) */}
        {/* <div className="hidden md:flex items-center gap-6 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm mb-8 border border-gray-100">
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">Services</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">How it works</span>
                    <span className="text-sm font-bold text-primary cursor-pointer">aipe</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">Why us?</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">FAQs</span>
                </div> */}

        {/* Hero Text */}
        <div className="space-y-2 mb-8 md:mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground uppercase leading-tight">
            INDIA&apos;S FIRST <br />
            <span className="text-primary relative inline-block">
              QUICK FINANCE SERVICE
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10 skew-x-12 transform"></span>
            </span>{" "}
            APP
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg max-w-lg mx-auto font-medium pt-1">
            On-demand financial & legal services to empower urban businesses.
          </p>

          {/* App Store Buttons */}
          <StoreButtons className="pt-1" />
        </div>

        {/* Hero Images Layout */}
        <div className="relative w-full max-w-6xl mx-auto flex justify-center items-end mt-4 md:mt-8 min-h-75 md:min-h-125">
          {/* Expert 1 (Left) */}
          <div className="hidden md:block absolute left-0 bottom-0 w-62.5 lg:w-87.5 transition-transform hover:scale-105 duration-500">
            <Image
              src="/assets/expert1.svg"
              alt="Financial Expert"
              width={400}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          {/* Central Phone Splash */}
          {!hidePhone && (
            <div className="relative z-20 w-70 md:w-85 lg:w-125 mb-4 md:-mb-8 transition-transform hover:-translate-y-2 duration-500">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 -z-10"></div>
              <Image
                src="/assets/aipeSplash.png"
                alt="Aipe App Interface"
                width={600}
                height={1200}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 500px"
              />
            </div>
          )}

          {/* Expert 2 (Right) */}
          <div className="hidden md:block absolute right-0 bottom-0 w-62.5 lg:w-87.5 transition-transform hover:scale-105 duration-500">
            <Image
              src="/assets/expert2.svg"
              alt="Legal Expert"
              width={400}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Decorative Floor/Background */}
      <div className="absolute bottom-0 w-full h-16 md:h-24 bg-[#4a0e4e]"></div>
      {/* Note: Using a dark purple similar to Snabbit's floor, or could use primary color */}
    </section>
  );
}
