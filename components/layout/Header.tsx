"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  User,
  Bell,
  Settings,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Experts", path: "/experts" },
  { name: "Bookings", path: "/bookings" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [location, setLocation] = useState("New Delhi, India");
  const [isSignedIn, setIsSignedIn] = useState(true);

  // Notification State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      bookingId: "12345",
      title: "Booking Confirmed",
      desc: "Your consultation with Rajesh Kumar is confirmed.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      bookingId: "12346",
      title: "Document Verified",
      desc: "Your GST documents have been verified.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      bookingId: "12347",
      title: "New Service Added",
      desc: "Check out our new Legal Drafting service.",
      time: "1 day ago",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: number, bookingId?: string) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

    // Navigate if bookingId exists
    if (bookingId) {
      router.push(`/consultation/${bookingId}`);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const cities = [
    "New Delhi, India",
    "Mumbai, India",
    "Kolkata, India",
    "Chennai, India",
    "Gandhinagar, India",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4 relative">
          {/* Logo & Location (Left) */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/assets/aipe_logo1.png"
                alt="Aipe Logo"
                className="h-10 w-auto object-contain"
                width={120}
                height={40}
              />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="hidden md:flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary cursor-pointer transition-colors bg-muted/50 px-3 py-1.5 rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium truncate max-w-[150px]">
                    {location}
                  </span>
                  <span className="text-xs text-muted-foreground">▼</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {cities.map((city) => (
                  <DropdownMenuItem
                    key={city}
                    onClick={() => setLocation(city)}
                    className="cursor-pointer"
                  >
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Navigation (Center) - Absolute Centered */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile: Location shows here or simpler header? keeping standard for now */}

            <div className="hidden md:block relative w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1C8AFF]" />
              <Input
                type="search"
                placeholder="Search for services..."
                className="w-full pl-10 h-10 bg-muted/50 hover:bg-gray-200 transition-colors duration-300 border-0 focus-visible:ring-1 focus-visible:ring-[#1C8AFF]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-primary"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background animate-pulse" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                  <span className="font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`px-4 py-3 focus:bg-muted/50 cursor-pointer border-b border-border/50 last:border-0 relative block ${!notification.read ? "bg-primary/5" : ""}`}
                        onSelect={() =>
                          handleNotificationClick(
                            notification.id,
                            notification.bookingId,
                          )
                        }
                      >
                        <div className="flex justify-between items-start gap-3 w-full">
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <p
                                className={`text-sm leading-none ${!notification.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </p>
                              {notification.bookingId && (
                                <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground ml-2 shrink-0">
                                  #{notification.bookingId}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {notification.desc}
                            </p>
                            <p className="text-[10px] text-muted-foreground/70 pt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No notifications
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-2 border-t border-border grid grid-cols-2 gap-2 bg-muted/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 text-muted-foreground hover:text-primary w-full justify-center"
                      onClick={markAllRead}
                    >
                      <Check className="w-3 h-3 mr-1.5" />
                      Mark all read
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10 w-full justify-center"
                      onClick={clearAll}
                    >
                      <Trash2 className="w-3 h-3 mr-1.5" />
                      Clear all
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => setIsSignedIn(!isSignedIn)}
                >
                  {isSignedIn ? (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
