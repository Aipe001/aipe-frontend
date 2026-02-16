"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { StoreButtons } from "@/components/ui/store-buttons";

import { ChatBot } from "./ChatBot";

const tasks = [
  // { title: "Loan Assist", img: "/assets/loan_assist.png" },
  { title: "Improve Credit Score", img: "/assets/improve_credit_score.png" },
  { title: "Loan Experts", img: "/assets/loan_experts.png" },
  { title: "Stock & Equity Experts", img: "/assets/stock_equity_experts.png" },
  { title: "Mutual Fund Expert", img: "/assets/mutual_fund_expert.png" },
  { title: "Gold & Silver Expert", img: "/assets/gold_silver_expert.png" },
  { title: "Intraday Trading", img: "/assets/intraday_trading.png" },
  { title: "Taxation", img: "/assets/taxation.png" },
  { title: "ITR Filing", img: "/assets/itr_filing.png" },
  { title: "GST Filing", img: "/assets/gst_filing.png" },
  { title: "Apply & Register", img: "/assets/apply_register.png" },
  { title: "Company Reg", img: "/assets/company_reg.png" },
  { title: "Apply New GST", img: "/assets/apply_new_gst.png" },
  { title: "Trademark", img: "/assets/trademark.png" },
  { title: "Start-Up Registeration", img: "/assets/start_up_register.png" },
  { title: "Business Modelling", img: "/assets/business_modelling.png" },
];

export function OneBookingSection() {
  const [isFixed, setIsFixed] = useState(false);
  const [isCardFixed, setIsCardFixed] = useState(false);

  const buttonSentinelRef = useRef<HTMLDivElement>(null);
  const cardSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Sticky button logic
      if (buttonSentinelRef.current) {
        const rect = buttonSentinelRef.current.getBoundingClientRect();
        // The button should be fixed if its original position (sentinel)
        // has moved up past the bottom of the viewport
        const triggerPoint = window.innerHeight - 72; // Moved up by 40px (32 + 40 = 72)
        setIsFixed(rect.bottom < triggerPoint);
      }

      // Sticky card logic
      if (cardSentinelRef.current) {
        const rect = cardSentinelRef.current.getBoundingClientRect();
        // Same trigger point logic for the card
        const triggerPoint = window.innerHeight - 72; // Moved up by 40px
        setIsCardFixed(rect.bottom < triggerPoint);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          animation: scroll 60s linear infinite;
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
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-wider leading-none drop-shadow-lg">
          Book Finance Expert <br />
          <span className="text-white">Service In 10 Minutes</span>
        </h2>
      </motion.div>

      {/* Download App Card Sentinel & Container */}
      <div
        ref={cardSentinelRef}
        className="absolute top-28 left-8 md:block z-20 w-[380px] h-[142px]"
      >
        <div
          className={`${
            isCardFixed
              ? "fixed bottom-[72px] left-8 z-50 transition-none scale-100 origin-bottom-left"
              : "absolute top-0 left-0 scale-100 origin-top-left"
          } bg-white rounded-3xl p-3 shadow-2xl flex items-center gap-2 border border-gray-100 min-w-[200px]`}
        >
          {/* Left Side: Text + Logo */}
          <div className="flex flex-col items-start gap-0">
            <span className="text-lg font-bold text-[#1C8AFF] ml-1 tracking-wide">
              Download the
            </span>
            <div className="relative w-34 h-12">
              <Image
                src="/assets/aipe_logo3.png"
                alt="Aipe"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Right Side: Store Buttons */}
          <StoreButtons
            className="flex-col gap-3"
            buttonClassName="w-40 h-12 py-1 px-3 max-w-none"
          />
        </div>
      </div>

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
                className="w-60 h-60 bg-white rounded-3xl pb-4 flex flex-col gap-4 shadow-xl shrink-0 transition-transform duration-300 overflow-hidden"
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

      {/* Chat Bot Component */}
      <ChatBot />

      {/* Contact Button Container & Sentinel */}
      <div
        ref={buttonSentinelRef}
        className="absolute bottom-8 right-8 z-20 w-[160px] h-[52px]" // Sentinel occupies space
      >
        <div
          className={`${
            isFixed
              ? "fixed bottom-[72px] right-8 z-50 transition-none"
              : "absolute bottom-0 right-0"
          }`}
        >
          <button className="bg-white text-[#1C8AFF] flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
            <span className="text-lg">Write to us</span>
          </button>
        </div>
      </div>
    </section>
  );
}
