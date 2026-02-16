"use client";

import { useState } from "react";
import Link from "next/link";
import { TitleServiceCard } from "@/components/home/TitleServiceCard";
import { Search } from "lucide-react";
import { TrendingServices } from "../../components/home/TrendingServices";
import { KeyFeaturesSection } from "@/components/home/KeyFeaturesSection";
import { ServiceModal } from "@/components/home/ServiceModal";
import { SlotBookingModal } from "@/components/home/SlotBookingModal";
import { ServicesInfo } from "@/components/home/ServicesInfo";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroStatsSection } from "@/components/home/HeroStatsSection";

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(
    null,
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  const handleSubServiceClick = (subServiceId: string) => {
    setSelectedSubService(subServiceId);
    setIsServiceModalOpen(false);
    setIsSlotModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };

  const handleCloseSlotModal = () => {
    setIsSlotModalOpen(false);
    setSelectedSubService(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 bg-background">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="flex flex-col justify-between h-full space-y-8 lg:space-y-0">
              <div className="pt-12">
                <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
                  <span className="text-[#1C8AFF]">Book Finance Expert</span>{" "}
                  <span className="text-foreground">
                    & Services in 10 minutes
                  </span>
                </h1>
              </div>
              <div className="relative max-w-2xl mb-16 lg:mb-30">
                <input
                  type="text"
                  placeholder="Search for services (e.g. GST, ITR, Company Reg)"
                  className="w-full h-16 pl-6 pr-28 rounded-2xl border border-border bg-background text-lg focus:outline-none focus:ring-2 focus:ring-[#1C8AFF] transition-all shadow-sm"
                />
                <button className="absolute right-3 top-3 bottom-3 px-6 rounded-xl bg-[#1C8AFF] text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Right Column - Service Cards Grid */}
            <div className="hidden lg:block">
              <TitleServiceCard />
              <div className="flex justify-end mt-6">
                <Link
                  href="/services/all"
                  className="text-sm md:text-base font-semibold text-[#1C8AFF] hover:underline flex items-center gap-1"
                >
                  View all Services -&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features Section */}
      <KeyFeaturesSection />

      {/* Spotlight Section */}
      <TrendingServices />

      {/* Services Info Section */}
      <ServicesInfo />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection limit={7} />

      {/* Hero Stats Section */}
      <HeroStatsSection />

      {/* Service Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={handleCloseServiceModal}
        serviceId={selectedService}
        onSubServiceClick={handleSubServiceClick}
      />
      {/* Slot Booking Modal */}
      <SlotBookingModal
        isOpen={isSlotModalOpen}
        onClose={handleCloseSlotModal}
        subServiceId={selectedSubService}
      />
    </>
  );
}
