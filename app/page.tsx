"use client";

import { ScrollPhoneLayout } from "@/components/home/ScrollPhoneLayout";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { SpotlightSection } from "@/components/home/SpotlightSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleServiceClick = (serviceId: string) => {
    // For now, simpler navigation or opening modal
    // In Snabbit, this usually opens a sub-category page or modal
    router.push(`/services?category=${serviceId}`);
  };

  return (
    <main className="min-h-screen bg-background md:bg-muted/10">
      {/* Scroll Transition Layout handles Hero + OneBooking */}
      <ScrollPhoneLayout />

      <div className="space-y-2 md:space-y-8 pb-24 md:pb-12 bg-background md:bg-transparent">

        {/* Services Grid - The Core Snabbit Feature */}
        <ServiceGrid onServiceClick={handleServiceClick} />

        {/* Promotional/Spotlight Banners */}
        <SpotlightSection />

        {/* How It Works Sticky Section */}
        <HowItWorksSection />

        {/* Trust/Social Proof Section (Filler for now to add page weight) */}
        <section className="py-8 md:py-12">
          <div className="page-container">
            <div className="bg-primary/5 rounded-2xl p-6 md:p-12 text-center">
              <h3 className="text-xl md:text-3xl font-bold text-primary mb-3">Trusted by 6,000+ Businesses</h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                From GST registration to ITR filing, we handle everything so you can focus on your business.
              </p>
              <div className="flex justify-center gap-8 opacity-50 grayscale">
                {/* Placeholders for logos */}
                <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                <div className="h-8 w-24 bg-foreground/20 rounded"></div>
                <div className="h-8 w-24 bg-foreground/20 rounded"></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
