"use client";

import { useState, useEffect, useMemo } from "react";
import { TitleServiceCard } from "@/components/home/TitleServiceCard";
import { Search, Loader2 } from "lucide-react";
import { TrendingServices } from "../../components/home/TrendingServices";
import { KeyFeaturesSection } from "@/components/home/KeyFeaturesSection";
import { ServiceModal } from "@/components/home/ServiceModal";
import { ServicesInfo } from "@/components/home/ServicesInfo";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroStatsSection } from "@/components/home/HeroStatsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "@/components/ServiceCard";
import {
  getServiceCategories,
  getAllServices,
  Service,
  ServiceCategory,
} from "@/lib/api/services";

export default function ServicesPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [cats, svcs] = await Promise.all([
          getServiceCategories(),
          getAllServices(),
        ]);

        const sortedCats = cats.sort((a, b) => a.displayOrder - b.displayOrder);
        setCategories(sortedCats);
        setServices(svcs);

        if (sortedCats.length > 0) {
          setActiveTab(sortedCats[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter services by search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q),
    );
  }, [services, searchQuery]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            </div>
          </div>
        </div>
      </section>

      {/* Browse All Services Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Browse All Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our complete range of financial services by category.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-[#1C8AFF]" />
            </div>
          ) : searchQuery.trim() ? (
            /* Search Results Mode */
            <div>
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {filteredServices.length} result
                {filteredServices.length !== 1 ? "s" : ""} for &quot;
                {searchQuery}&quot;
              </p>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      variant="default"
                      onClick={() => handleServiceClick(service)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No services match your search.
                </div>
              )}
            </div>
          ) : (
            /* Category Tabs Mode */
            <Tabs
              value={activeTab}
              className="w-full flex flex-col items-center"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full max-w-4xl flex flex-wrap justify-center h-auto min-h-14 bg-gray-100 p-1 rounded-2xl mb-10 gap-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-xl data-[state=active]:bg-[#1C8AFF] data-[state=active]:text-white text-gray-600 font-semibold py-2 md:py-3 px-4 transition-all"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => {
                const categoryServices = services.filter(
                  (s) => s.categoryId === category.id,
                );

                return (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="w-full"
                  >
                    {categoryServices.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryServices.map((service) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            variant="default"
                            onClick={() => handleServiceClick(service)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        No services found in this category.
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
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

      {/* Service Booking Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </>
  );
}
