"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "@/components/ServiceCard";

// Service Data Interface
export interface Service {
  id: string;
  title: string;
  image: string;
}

// Hardcoded Data
export const servicesData: Record<string, Service[]> = {
  "Credits and Loans": [
    { id: "loan-1", title: "Apply for Loan", image: "/assets/loan_assist.png" },
    {
      id: "loan-2",
      title: "Improve CIBIL",
      image: "/assets/improve_credit_score.png",
    },
    {
      id: "loan-3",
      title: "Foreign Education Loan",
      image: "/assets/loan_experts.png",
    },
  ],
  Taxation: [
    { id: "tax-1", title: "TDS Claim", image: "/assets/taxation.png" },
    {
      id: "tax-2",
      title: "Foreign Remittance",
      image: "/assets/itr_filing.png",
    },
    {
      id: "tax-3",
      title: "Capital Gains Tax",
      image: "/assets/gst_filing.png",
    },
  ],
  Investment: [
    {
      id: "inv-1",
      title: "Setup SIP",
      image: "/assets/mutual_fund_expert.png",
    },
    {
      id: "inv-2",
      title: "Mutual Funds",
      image: "/assets/stock_equity_experts.png",
    },
    {
      id: "inv-3",
      title: "Stock Investment",
      image: "/assets/intraday_trading.png",
    },
    {
      id: "inv-4",
      title: "Future and Options",
      image: "/assets/gold_silver_expert.png",
    },
  ],
  Apply: [
    {
      id: "apply-1",
      title: "GST Registration",
      image: "/assets/apply_new_gst.png",
    },
    {
      id: "apply-2",
      title: "New Business Registration",
      image: "/assets/start_up_register.png",
    },
  ],
  Filing: [
    { id: "file-1", title: "File ITR", image: "/assets/itr_filing.png" },
    {
      id: "file-2",
      title: "File for GST Claim",
      image: "/assets/gst_filing.png",
    },
  ],
  Registrations: [
    {
      id: "reg-1",
      title: "GST Registration",
      image: "/assets/apply_new_gst.png",
    },
    {
      id: "reg-2",
      title: "New Business Registration",
      image: "/assets/start_up_register.png",
    },
  ],
};

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("Credits and Loans");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Banner Section */}
      <section className="bg-[#1C8AFF] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="page-container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Financial Services
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from our wide range of expert financial services tailored for
            you.
          </p>
        </div>

        {/* Decorative background elements matching the theme */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        </div>
      </section>

      {/* Tabs and Content Section */}
      <section className="py-12">
        <div className="page-container">
          <Tabs
            defaultValue="Credits and Loans"
            className="w-full flex flex-col items-center"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto min-h-14 bg-gray-100 p-1 rounded-2xl mb-12">
              {Object.keys(servicesData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-xl data-[state=active]:bg-[#1C8AFF] data-[state=active]:text-white text-gray-600 font-semibold py-2 md:py-3 transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(servicesData).map(([category, services]) => (
              <TabsContent key={category} value={category} className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      variant="default"
                      onClick={() => {}} // No-op for now, or add navigation if needed
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
