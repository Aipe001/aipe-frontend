"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tasks = [
  { title: "GST Filing", img: "/assets/gst_filing.png" },
  { title: "ITR Filing", img: "/assets/itr_filing.png" },
  { title: "Trademark", img: "/assets/trademark.png" },
  { title: "Company Reg", img: "/assets/company_reg.png" },
  { title: "Loan Assist", img: "/assets/loan_assist.png" },
  { title: "Legal Docs", img: "/assets/legal_docs.png" },
];

export function OneBookingSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#1C8AFF] flex flex-col items-center justify-start overflow-hidden py-20">
      {/* CSS for infinite scroll and pause on hover */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mt-0 mb-32 relative"
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic tracking-wider leading-none drop-shadow-lg">
          ONE BOOKING, <span className="text-white/80">MANY</span> <br />
          <span className="text-white">TASKS</span>
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div className="absolute top-[60%] left-0 w-full -translate-y-1/2 z-0">
        <div
          className="w-full overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Moving Row with Pause on Hover */}
          <div className="flex gap-8 w-max animate-scroll">
            {/* Render items twice for seamless loop */}
            {[...tasks, ...tasks, ...tasks, ...tasks].map((item, i) => (
              <div
                key={i}
                className="w-48 h-60 bg-white rounded-3xl p-4 pb-8 flex flex-col gap-4 shadow-xl shrink-0 transition-transform duration-300"
              >
                <div className="flex-1 bg-secondary rounded-2xl overflow-hidden flex items-center justify-center relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
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
