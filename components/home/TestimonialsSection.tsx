"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    review:
      "The expert I booked helped me sort out my GST filing in significantly less time than I expected. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Freelance Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    review:
      "I was confused about my investment options. The consultation provided clarity and a clear path forward for my portfolio.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    review:
      "Excellent service! The seamless process of booking and connecting with a verifiable expert gave me great peace of mind.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="page-container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Side - Title */}
          <div className="md:w-1/4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Testimonial
            </h2>
            <div className="h-1 w-20 bg-[#1C8AFF] mt-4 rounded-full"></div>
          </div>

          {/* Right Side - Cards Grid */}
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full border-2 border-primary/10"
                  />
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#1C8AFF] text-[#1C8AFF]"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                  &quot;{testimonial.review}&quot;
                </p>

                <div className="mt-auto">
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
