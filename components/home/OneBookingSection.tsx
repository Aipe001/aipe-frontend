"use client";

import { motion } from "framer-motion";

const tasks = [
    { title: "GST Filing", img: "/placeholder.svg" },
    { title: "ITR Filing", img: "/placeholder.svg" },
    { title: "Trademark", img: "/placeholder.svg" },
    { title: "Company Reg", img: "/placeholder.svg" },
    { title: "Loan Assist", img: "/placeholder.svg" },
    { title: "Legal Docs", img: "/placeholder.svg" },
];

// Duplicate for infinite scroll
const carouselItems = [...tasks, ...tasks, ...tasks];

export function OneBookingSection() {
    return (
        <section className="relative w-full min-h-screen bg-primary flex flex-col items-center justify-center overflow-hidden py-20">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10 mb-12"
            >
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic tracking-wider leading-none">
                    ONE BOOKING, <span className="text-white/80">MANY</span> <br />
                    <span className="text-primary-foreground">TASKS</span>
                </h2>
            </motion.div>

            {/* Carousel Container */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
                <div
                    className="w-full overflow-hidden relative"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                    }}
                >
                    {/* Moving Row */}
                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {carouselItems.map((item, i) => (
                            <div key={i} className="w-48 h-60 bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-xl shrink-0">
                                <div className="flex-1 bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
                                    <span className="text-4xl">📄</span>
                                </div>
                                <p className="text-center font-bold text-foreground text-sm">{item.title}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Contact Button */}
            <div className="absolute bottom-8 right-8 z-20">
                <button className="bg-white text-primary flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
                    <span className="text-lg">Write to us</span>
                </button>
            </div>

        </section>
    );
}
