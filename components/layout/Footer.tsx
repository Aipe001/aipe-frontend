import Link from "next/link";
import { StoreButtons } from "@/components/ui/store-buttons";

const footerLinks = [
  // { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  // { name: "Experts", path: "/experts" },
  { name: "About", path: "/about" },
  { name: "Bookings", path: "/bookings" },
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
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-footer-foreground/20 gap-4">
          <p className="text-sm opacity-80">Financial Services More</p>
          <p className="text-sm opacity-80">Copyright © 2025 aipe content</p>
        </div>
      </div>
    </footer>
  );
}
