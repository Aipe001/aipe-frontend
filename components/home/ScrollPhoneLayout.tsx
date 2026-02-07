"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { OneBookingSection } from "./OneBookingSection";

export function ScrollPhoneLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform phone based on scroll
  // 0 -> Start of Hero
  // 0.5 -> Middle (Transition point)
  // 1 -> End of OneBooking

  // Phone scale/position adjustments
  const scale = useTransform(scrollYProgress, [0, 1, 1], [1, 0.6, 1]); // Slight zoom during transition
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]); // Fade out at very end if needed

  // Controls vertical position:
  // Starts at 500px down (very low) and moves/scrolls UP to -250px (significantly higher than center)
  const y = useTransform(scrollYProgress, [0, 1], [200, -250]);

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Sticky Phone Container */}
      {/* It needs to be z-20 to sit above backgrounds but maybe below some text if needed */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-20 pointer-events-none">
        <motion.div
          style={{ scale, opacity, y }}
          className="relative w-[280px] md:w-[340px] lg:w-[500px]"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 -z-10"></div>
          <Image
            src="/assets/aipeSplash.png"
            alt="Aipe App Interface"
            width={600}
            height={1200}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Hero Section (Content Only) */}
      <div className="relative z-10 -mt-[100vh]">
        <HeroSection hidePhone={true} />
      </div>

      {/* Transition Spacer / Overlap */}
      {/* We want OneBooking to scroll UP over the Hero background, or have the phone stay while background changes */}
      {/* Snabbit style: The "One Booking" section usually slides up or fades in */}

      <div className="relative z-30 bg-primary">
        <OneBookingSection />
      </div>
    </div>
  );
}
