"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    step: "STEP 1",
    title: "SELECT SERVICE",
    description:
      "Choose from our wide range of financial and legal services like GST, ITR, or Company Registration.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#D6EBFF] text-[#1C8AFF]", // Even more distinctive blue tint
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 2,
    step: "STEP 2",
    title: "EXPERT ASSIGNED",
    description:
      "A dedicated CA, CS, or Legal Expert is assigned to your tasks instantly.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#E0F0FF] text-[#1C8AFF]", // Slightly darker blue tint
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 3,
    step: "STEP 3",
    title: "WORK DONE",
    description:
      "Track progress in real-time. Receive your filed documents and certificates directly on the app.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#F0F7FF] text-[#1C8AFF]", // Lightest Blue
    badgeColor: "bg-[#1C8AFF]",
  },
];

const Card = ({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) => {
  // Animation Logic
  // First card is static (already there) from the start.
  // Subsequent cards (index > 0) slide up from bottom.
  // Using 0.25 intervals for stagger.

  const ySpring = useTransform(
    scrollYProgress,
    [index * 0.25, index * 0.25 + 0.25],
    index === 0
      ? ["0px", "0px"] // First card stays at 0 offset
      : ["120%", `${index * 30}px`], // Others slide in to their offset
  );

  const opacitySpring = useTransform(
    scrollYProgress,
    [index * 0.25, index * 0.25 + 0.1],
    index === 0 ? [1, 1] : [0, 1], // First card always visible
  );

  return (
    <motion.div
      style={{
        y: ySpring,
        opacity: opacitySpring,
        zIndex: index + 1,
      }}
      className="absolute top-0 w-full max-w-3xl h-[400px] flex rounded-3xl shadow-2xl overflow-hidden border border-gray-100 bg-white"
    >
      {/* Visual Side */}
      <div
        className={`w-2/5 h-full ${step.color} flex items-center justify-center relative p-8`}
      >
        <div className="relative w-full h-full">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Content Side */}
      <div className="w-3/5 h-full flex flex-col justify-center px-10 bg-white relative">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white mb-6 w-fit ${step.badgeColor}`}
        >
          {step.step}
        </span>
        <h3 className="text-3xl font-bold text-foreground mb-4 font-display uppercase leading-tight">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed font-medium">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-gray-50/50">
      {/* Height defines scroll distance. 3 cards * decent scroll/card = ~500vh */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden pt-20 md:pt-32">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              HOW{" "}
              <span className="brand-text text-5xl font-bold tracking-tight text-primary">
                aipe
              </span>{" "}
              WORKS?
            </h2>
          </div>

          <div className="relative w-full max-w-3xl h-[450px] flex items-center justify-center">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
