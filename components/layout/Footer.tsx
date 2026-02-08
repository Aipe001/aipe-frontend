import Link from "next/link";
import { StoreButtons } from "@/components/ui/store-buttons";

const footerLinks = [
  // { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  // { name: "Experts", path: "/experts" },
  { name: "About", path: "/about" },
  { name: "Bookings", path: "/bookings" },
  { name: "FAQs", path: "/#faq" },
];

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="page-container py-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-6">
          {footerLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-sm font-medium hover:text-primary-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* App Store Buttons */}
        <StoreButtons className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6 pt-6 border-t border-footer-foreground/20">
          <a
            href="mailto:hello@aipe.club"
            className="text-base font-medium hover:text-[#1C8AFF] transition-colors"
          >
            hello@aipe.club
          </a>

          <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4 text-sm opacity-80">
            <p>Financial Services More</p>
            <p className="font-medium text-center">
              Made with <span className="text-[#1C8AFF]">💙</span> in India
            </p>
            <p>Copyright © 2025 AIPE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
