"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceCard } from "@/components/ServiceCard";
import {
  getServiceCategories,
  getAllServices,
  Service,
  ServiceCategory,
} from "@/lib/api/services";
import { Loader2 } from "lucide-react";

export default function BookingPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [cats, svcs] = await Promise.all([
          getServiceCategories(),
          getAllServices(),
        ]);

        // Sort categories by displayOrder
        const sortedCats = cats.sort((a, b) => a.displayOrder - b.displayOrder);
        setCategories(sortedCats);
        setServices(svcs);

        if (sortedCats.length > 0) {
          setActiveTab(sortedCats[0].id);
        }
      } catch (err: any) {
        console.error("Failed to fetch services", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#1C8AFF]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#1C8AFF] text-white rounded-lg hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

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
            value={activeTab}
            className="w-full flex flex-col items-center"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full max-w-6xl flex flex-wrap justify-center h-auto min-h-14 bg-gray-100 p-1 rounded-2xl mb-12 gap-2">
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
                (s) => s.categoryId === category.id
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
                          onClick={() => {
                            /* Handle click */
                          }}
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
        </div>
      </section>
    </div>
  );
}
