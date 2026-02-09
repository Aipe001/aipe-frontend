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
      "Choose from our wide range of financial services like GST, ITR, or Company Registration.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#CCE5FF] text-[#1C8AFF]",
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 2,
    step: "STEP 2",
    title: "CHOOSE TIME SLOT",
    description:
      "Select a convenient time for your consultation with our experts.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#D4EAFF] text-[#1C8AFF]",
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 3,
    step: "STEP 3",
    title: "PAYMENT",
    description:
      "Securely pay for your selected service using our multiple payment options.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#DCEFFF] text-[#1C8AFF]",
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 4,
    step: "STEP 4",
    title: "BOOKING CONFIRMATION",
    description:
      "Receive instant confirmation of your booking with all the details.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#E4F4FF] text-[#1C8AFF]",
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 5,
    step: "STEP 5",
    title: "EXPERT ASSIGNED",
    description:
      "A dedicated CA, CS, or Legal Expert is assigned to your tasks instantly.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#ECF9FF] text-[#1C8AFF]",
    badgeColor: "bg-[#1C8AFF]",
  },
  {
    id: 6,
    step: "STEP 6",
    title: "WORK DONE",
    description:
      "Track progress in real-time. Receive your filed documents and certificates directly on the app.",
    image: "/assets/aipeSplash.png",
    color: "bg-[#F4FEFF] text-[#1C8AFF]",
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

  /*
   * Animation Logic:
   * With 6 cards, we need to distribute the entrance animations over the scroll progress (0 to 1).
   * Using 0.15 intervals allows the last card (index=5) to start at 0.75 and finish at 0.90.
   * This leaves a little buffer at the end.
   */
  const ySpring = useTransform(
    scrollYProgress,
    [index * 0.15, index * 0.15 + 0.15],
    index === 0
      ? ["0px", "0px"] // First card stays at 0 offset
      : ["120%", `${index * 20}px`], // Reduced offset per card to keep stack tighter
  );

  const opacitySpring = useTransform(
    scrollYProgress,
    [index * 0.15, index * 0.15 + 0.1],
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
      {/* Increased height to accommodate more scroll distance for 6 cards */}
      <div ref={containerRef} className="relative h-[800vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden pt-16 md:pt-24">
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1C8AFF] flex items-center justify-center gap-3">
              HOW{" "}
              <span className="relative h-16 w-24 inline-block">
                <Image
                  src="/assets/aipe_logo3.png"
                  alt="aipe"
                  fill
                  className="object-contain"
                />
              </span>{" "}
              WORKS?
            </h2>
          </div>

          <div className="relative w-full max-w-3xl h-[600px] flex items-center justify-center">
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
