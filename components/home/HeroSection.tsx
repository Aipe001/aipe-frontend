"use client";

import Image from "next/image";
import { StoreButtons } from "@/components/ui/store-buttons";

interface HeroSectionProps {
  hidePhone?: boolean;
}

export function HeroSection({ hidePhone = false }: HeroSectionProps) {
  return (
    <section className="relative bg-background pt-8 pb-0 md:pt-12 overflow-hidden">
      <div className="w-full flex flex-col items-center text-center z-10 relative">
        {/* Top Navigation / Pill (Optional, matching Snabbit style) */}
        {/* <div className="hidden md:flex items-center gap-6 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm mb-8 border border-gray-100">
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">Services</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">How it works</span>
                    <span className="text-sm font-bold text-primary cursor-pointer">aipe</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">Why us?</span>
                    <span className="text-sm font-medium text-gray-600 hover:text-primary cursor-pointer">FAQs</span>
                </div> */}

        {/* Hero Text */}
        <div className="page-container w-full">
          <div className="space-y-2 mb-8 md:mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-foreground leading-[1.1] text-balance">
              India&apos;s First <br />
              <span className="relative inline-block whitespace-nowrap text-[#1C8AFF]">
                Quick Finance Service
                <span className="absolute bottom-1 left-0 w-full h-3 md:h-5 bg-[#1C8AFF]/20 -z-10 skew-x-12 transform"></span>
              </span>
              <br />
              App
            </h1>
            <p className="text-muted-foreground text-base md:text-xl lg:text-2xl max-w-2xl mx-auto font-medium pt-2 flex flex-col gap-1">
              <span>On-demand finance experts & services.</span>
              <span>Investment &bull; Credit & Loan &bull; Taxation</span>
            </p>

            {/* App Store Buttons */}
            <StoreButtons className="pt-1" />
          </div>
        </div>

        {/* Hero Images Layout */}
        <div className="relative w-full mx-auto flex justify-center items-end mt-4 md:mt-8 min-h-75 md:min-h-125">
          {/* Expert 1 (Left) */}
          <div className="hidden md:block absolute left-2 md:left-4 lg:left-12 xl:left-24 -bottom-0 w-[300px] lg:w-[480px] xl:w-[550px] transition-transform hover:scale-105 duration-500 rounded-3xl [mask-image:linear-gradient(to_bottom,black_75%,transparent)] z-10">
            <Image
              src="/assets/main_banner_left_side.png"
              alt="Financial Expert"
              width={400}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Central Phone Splash Context (To keep layout flow, hidePhone is handled above this usually but leaving div for balance if needed, phone is injected from ScrollPhoneLayout) */}
          {!hidePhone && (
            <div className="relative z-20 w-[320px] md:w-[480px] lg:w-[650px] xl:w-[750px] mb-4 md:-mb-8 transition-transform hover:-translate-y-2 duration-500">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 -z-10"></div>
              <Image
                src="/assets/aipeSplash.png"
                alt="Aipe App Interface"
                width={750}
                height={1500}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 480px, 750px"
              />
            </div>
          )}

          {/* Expert 2 (Right) */}
          <div className="hidden md:block absolute right-2 md:right-4 lg:right-12 xl:right-24 -bottom-0 w-[300px] lg:w-[480px] xl:w-[550px] transition-transform hover:scale-105 duration-500 rounded-3xl [mask-image:linear-gradient(to_bottom,black_75%,transparent)] z-10">
            <Image
              src="/assets/main_banner_right_side.png"
              alt="Finance Expert"
              width={400}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Decorative Floor/Background */}
      <div className="absolute bottom-0 w-full h-16 md:h-24"></div>
      {/* Note: Using a dark purple similar to Snabbit's floor, or could use primary color */}
    </section>
  );
}
