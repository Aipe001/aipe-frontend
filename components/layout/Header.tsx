"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Experts", path: "/experts" },
  { name: "Bookings", path: "/bookings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Location (Left) */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="brand-text text-2xl font-bold tracking-tight text-primary">aipe</span>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary cursor-pointer transition-colors bg-muted/50 px-3 py-1.5 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium truncate max-w-[150px]">New Delhi, India</span>
              <span className="text-xs text-muted-foreground">▼</span>
            </div>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile: Location shows here or simpler header? keeping standard for now */}

            <div className="hidden md:block relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for services..."
                className="w-full pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
