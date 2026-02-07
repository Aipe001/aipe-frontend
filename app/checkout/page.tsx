"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bookingDetails = {
    serviceId: searchParams.get("serviceId") || "new-gst",
    date: searchParams.get("date") || "February 15, 2026",
    slot: searchParams.get("slot") || "10:00 AM",
  };

  const handlePayNow = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been successfully placed.",
    });
    router.push("/bookings");
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="page-container">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Customer Details
              </h2>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </span>
                Already have an account?
              </span>
            </div>

            <Button className="w-full h-12 text-lg" variant="default">
              Log In
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border" />
              <span className="text-muted-foreground text-sm">or</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button className="text-primary text-sm font-medium hover:underline">
              Continue as Guest
            </button>
          </div>

          {/* Payment Summary */}
          <Card className="card-shadow">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-lg font-semibold">
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground">
                  Service: {bookingDetails.serviceId}
                </span>
                <span className="font-medium">₹4,999</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Date</span>
                <span>{bookingDetails.date}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Slot</span>
                <span>{bookingDetails.slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">Service Fee</span>
                <span className="font-medium">₹500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground flex items-center gap-1">
                  GST (18%)
                  <Info className="w-4 h-4 text-muted-foreground" />
                </span>
                <span className="font-medium">₹989.82</span>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-foreground">
                    Total Payable
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ₹6,488.82
                  </span>
                </div>
              </div>
              <Button
                className="w-full h-12 text-lg mt-4"
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense
      fallback={<div className="py-12 text-center">Loading checkout...</div>}
    >
      <CheckoutContent />
    </Suspense>
  );
}
