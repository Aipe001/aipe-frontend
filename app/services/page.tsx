"use client";

import { useState } from "react";
import { HeroImages } from "@/components/home/HeroImages";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { SpotlightSection } from "@/components/home/SpotlightSection";
import { KeyFeaturesSection } from "@/components/home/KeyFeaturesSection";
import { ServiceModal } from "@/components/home/ServiceModal";
import { SlotBookingModal } from "@/components/home/SlotBookingModal";

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<string | null>(
    null,
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsServiceModalOpen(true);
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-display font-bold leading-tight">
                  <span className="text-[#1C8AFF]">Financial services</span>{" "}
                  <span className="text-foreground">
                    for your business & life
                  </span>
                </h1>
              </div>
              <ServiceGrid
                onServiceClick={handleServiceClick}
                hasContainer={false}
              />
            </div>

            {/* Right Column - Hero Images */}
            <div className="hidden lg:block">
              <HeroImages />
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <SpotlightSection />

      {/* Key Features Section */}
      <KeyFeaturesSection />

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
