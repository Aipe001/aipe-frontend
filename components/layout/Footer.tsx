import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-[#1C8AFF] text-white">
      <div className="page-container py-8 flex flex-col items-center relative">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-8">
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
        <StoreButtons className="mb-8 w-full max-w-md mx-auto" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-center gap-6 pt-6 border-t border-footer-foreground/20">
          <a
            href="mailto:hello@aipe.club"
            className="text-base font-medium hover:text-[#000000] transition-colors"
          >
            hello@aipe.club
          </a>

          <div className="flex flex-col md:flex-row w-full items-center justify-between gap-4 text-sm opacity-80">
            <p className="md:flex-1 md:text-left">Financial Services More</p>
            <p className="font-medium text-center md:flex-none">
              Made with <span className="text-[#1C8AFF]">🤍</span> in India
            </p>
            <div className="flex items-center gap-0 md:flex-1 md:justify-end">
              <Image
                src="/assets/aipe_logo3.png"
                alt="Aipe Logo"
                className="h-12 w-auto object-contain"
                width={100}
                height={32}
              />
              <p>Copyright © 2025 AIPE</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
