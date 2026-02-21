"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { Service, getAllServices } from "@/lib/api/services";
import Image from "next/image";

const COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-red-100 text-red-600",
  "bg-indigo-100 text-indigo-600",
  "bg-teal-100 text-teal-600",
  "bg-amber-100 text-amber-600",
];

interface ServiceGridProps {
  onServiceClick: (serviceId: string) => void;
  hasContainer?: boolean;
}

export function ServiceGrid({
  onServiceClick,
  hasContainer = true,
}: ServiceGridProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data || []);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const content = (
    <>
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg md:text-2xl font-bold text-foreground">
          Our Services
        </h2>
        <button className="text-[#1C8AFF] text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No services found.
          </div>
        ) : (
          services.map((service, index) => {
            const colorClass = COLORS[index % COLORS.length];

            return (
              <button
                key={service.id}
                onClick={() => onServiceClick(service.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-20 h-20 md:w-28 md:h-28 rounded-[2rem] ${colorClass} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mt-4 overflow-hidden relative`}
                >
                  {service.iconUrl ? (
                    <Image
                      src={service.iconUrl}
                      alt={service.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  ) : (
                    <FileText className="w-10 h-10 md:w-12 md:h-12" />
                  )}
                </div>
                <span className="text-base md:text-lg text-center font-bold text-foreground/80 leading-tight translate-y-3">
                  {service.name}
                </span>
              </button>
            );
          })
        )}
      </div>
    </>
  );

  if (hasContainer) {
    return (
      <section className="py-2 md:py-8">
        <div className="page-container">{content}</div>
      </section>
    );
  }

  return <div className="py-2 md:py-8">{content}</div>;
}
