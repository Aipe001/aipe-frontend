"use client";

import {
  FileText,
  Calculator,
  TrendingUp,
  Briefcase,
  Shield,
  BarChart,
  Landmark,
  Scale,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    name: "GST",
    color: "bg-blue-100 text-blue-600",
    id: "gst",
  },
  {
    icon: Calculator,
    name: "ITR",
    color: "bg-green-100 text-green-600",
    id: "itr",
  },
  {
    icon: TrendingUp,
    name: "Invest",
    color: "bg-purple-100 text-purple-600",
    id: "mutual-funds",
  },
  {
    icon: Briefcase,
    name: "Loans",
    color: "bg-orange-100 text-orange-600",
    id: "loans",
  },
  {
    icon: Shield,
    name: "Insure",
    color: "bg-red-100 text-red-600",
    id: "insurance",
  },
  {
    icon: BarChart,
    name: "CIBIL",
    color: "bg-indigo-100 text-indigo-600",
    id: "cibil",
  },
  {
    icon: Landmark,
    name: "Bank",
    color: "bg-teal-100 text-teal-600",
    id: "banking",
  }, // New filler
  {
    icon: Scale,
    name: "Trademark",
    color: "bg-amber-100 text-amber-600",
    id: "trademark",
  }, // New filler
];

interface ServiceGridProps {
  onServiceClick: (serviceId: string) => void;
}

export function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  return (
    <section className="py-2 md:py-8">
      <div className="page-container">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Our Services
          </h2>
          <button className="text-primary text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceClick(service.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl ${service.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}
              >
                <service.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="text-xs md:text-sm text-center font-medium text-foreground/80 leading-tight">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
