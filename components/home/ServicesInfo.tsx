"use client";
import Link from "next/link";

export function ServicesInfo() {
  return (
    <section className="py-8 md:py-12">
      <div className="page-container">
        <div className="bg-primary/5 rounded-[24px] p-6 md:p-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-xl md:text-3xl font-medium text-foreground leading-relaxed">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                From Improving Credit Score, Loan, Taxation, Filing &
                Registration to Stock Investment, Short Term & Long Term, Mutual
                Funds, SIP, Gold.
              </span>
            </p>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium">
              <span className="text-[#1C8AFF]">
                Book Expert & Services, Fully personalized with hand-holding.
              </span>
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Link
              href="/services/all"
              className="text-sm md:text-base font-semibold text-[#1C8AFF] hover:underline flex items-center gap-1"
            >
              View all Services -&gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
