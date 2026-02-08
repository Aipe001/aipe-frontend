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
            className="text-base font-medium hover:text-[#1C8AFF] transition-colors"
          >
            hello@aipe.club
          </a>

          <div className="flex flex-col md:flex-row w-full items-center justify-between gap-4 text-sm opacity-80">
            <p className="md:flex-1 md:text-left">Financial Services More</p>
            <p className="font-medium text-center md:flex-none">
              Made with <span className="text-[#1C8AFF]">💙</span> in India
            </p>
            <div className="flex items-center gap-0 md:flex-1 md:justify-end">
              <img
                src="/assets/aipe_logo2.png"
                alt="Aipe Logo"
                className="h-12 w-auto object-contain" // Keep some size, maybe slightly smaller than the header one? Or match user request "put this image" (the one from before was h-16, maybe too big here? let's try h-8 first as it's beside text)
                // User said "put this image beside copyright". The previous image was h-16. That's huge for a copyright line. Let's try h-8 (32px) first.
                // Wait, user might want the full logo there. Let's do h-8.
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
