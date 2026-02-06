"use client";

import {
  FileText,
  Calculator,
  TrendingUp,
  Briefcase,
  Shield,
  BarChart
} from "lucide-react";

const services = [
  { icon: FileText, name: "GST Registration", id: "gst" },
  { icon: Calculator, name: "ITR Filing & Planning", id: "itr" },
  { icon: TrendingUp, name: "Mutual Funds & Investment", id: "mutual-funds" },
  { icon: Briefcase, name: "Business Loans", id: "loans" },
  { icon: Shield, name: "Insurance", id: "insurance" },
  { icon: BarChart, name: "CIBIL Score Improvement", id: "cibil" },
];

interface ServiceGridProps {
  onServiceClick: (serviceId: string) => void;
}

export function ServiceGrid({ onServiceClick }: ServiceGridProps) {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow">
      <h3 className="text-foreground font-medium mb-4">
        What are you looking for?
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceClick(service.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-service-bg flex items-center justify-center group-hover:scale-105 transition-transform">
              <service.icon className="w-6 h-6 text-service-icon" />
            </div>
            <span className="text-xs text-center text-foreground font-medium">
              {service.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
