"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
    {
        id: 1,
        step: "STEP 1",
        title: "SELECT SERVICE",
        description: "Choose from our wide range of financial and legal services like GST, ITR, or Company Registration.",
        image: "/assets/aipeSplash.png", // Using splash as placeholder for app screen
        color: "text-pink-500", // Snabbit uses pink accents
    },
    {
        id: 2,
        step: "STEP 2",
        title: "EXPERT ASSIGNED",
        description: "A dedicated CA, CS, or Legal Expert is assigned to your tasks instantly.",
        image: "/assets/aipeSplash.png",
        color: "text-blue-500",
    },
    {
        id: 3,
        step: "STEP 3",
        title: "WORK DONE",
        description: "Track progress in real-time. Receive your filed documents and certificates directly on the app.",
        image: "/assets/aipeSplash.png",
        color: "text-green-500",
    },
];

export function HowItWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to active step index (0 to 2)
    // 0-0.33 -> Step 1
    // 0.33-0.66 -> Step 2
    // 0.66-1.0 -> Step 3

    return (
        <section className="bg-white">
            <div className="py-12 md:py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                    HOW <span className="text-primary">AIPE</span> WORKS?
                </h2>
            </div>

            <div ref={containerRef} className="relative h-[300vh] bg-white">
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                    {/* Main Card */}
                    <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-gray-100">

                        {/* Left: Phone Visual (Sticky inside card or changing) */}
                        <div className="w-1/2 h-full bg-gray-50 flex items-center justify-center relative overflow-hidden">
                            <div className="relative w-[250px] md:w-[300px] h-[500px] md:h-[600px]">
                                {/* Here we could animate the image or slide it if we had different screens */}
                                <Image
                                    src="/assets/aipeSplash.png"
                                    alt="App Screen"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right: Steps Content */}
                        <div className="w-1/2 h-full flex flex-col justify-center px-8 md:px-16 relative">
                            {steps.map((step, index) => {
                                // Logic to show/hide based on scroll
                                // We can use opacity transforms
                                const startRange = index * 0.33;
                                const endRange = (index + 1) * 0.33;

                                const opacity = useTransform(
                                    scrollYProgress,
                                    [startRange, startRange + 0.1, endRange - 0.1, endRange],
                                    [0, 1, 1, 0]
                                );

                                // For the last item, keep it visible at end until section scrolls away
                                const finalOpacity = index === steps.length - 1
                                    ? useTransform(scrollYProgress, [startRange, startRange + 0.1], [0, 1])
                                    : opacity;

                                return (
                                    <motion.div
                                        key={step.id}
                                        style={{ opacity: index === steps.length - 1 ? finalOpacity : opacity }}
                                        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none"
                                    >
                                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest text-white bg-primary mb-6 w-fit`}>
                                            {step.step}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display uppercase">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>

            {/* Explicit spacer to allow scrolling "past" the pinned section typically handled by the height of containerRef */}
        </section>
    );
}
