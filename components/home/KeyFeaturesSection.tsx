"use client";

import { Zap, IndianRupee, Activity } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  subtitle?: string; // Optional since user didn't specify subtitles
  icon: React.ReactNode;
  bgClass: string;
}

const featureItems: FeatureItem[] = [
  {
    id: 1,
    title: "Get Expert help in 10 minutes",
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bgClass: "bg-blue-600 text-white",
  },
  {
    id: 2,
    title: "Services starting from just ₹99",
    icon: <IndianRupee className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bgClass: "bg-blue-600 text-white",
  },
  {
    id: 3,
    title: "Real-time Tracking and Updates",
    icon: <Activity className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    bgClass: "bg-blue-600 text-white",
  },
];

export function KeyFeaturesSection() {
  return (
    <section className="py-4 md:py-8">
      <div className="page-container">
        <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Key Features
          </h2>
        </div>

        {/* 
           Using a grid for exactly 3 items without overflow.
           On mobile, they might stack or scroll if too tight, but user requested "this carousel will not overflow".
           Given "adjust just 3 cards", a grid or flex with flex-1 is best.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-1">
          {featureItems.map((item) => (
            <div
              key={item.id}
              className={`h-40 md:h-48 rounded-2xl p-6 flex flex-col justify-between shadow-lg ${item.bgClass} relative overflow-hidden group`}
            >
              <div className="relative z-10">
                <div className="mb-4 p-2 bg-white/20 w-fit rounded-xl backdrop-blur-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl md:text-2xl leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Decorative circles */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/20 transition-colors" />
              <div className="absolute -right-4 top-4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
