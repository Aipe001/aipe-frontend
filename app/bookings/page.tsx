"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  service: string;
  status: "active" | "upcoming" | "pending";
  statusText: string;
  expert: string;
  expertAvatar?: string;
}

const mockBookings: Booking[] = [
  {
    id: "12345",
    service: "GST Registration",
    status: "active",
    statusText: "Active Now",
    expert: "Rajesh Kumar",
  },
  {
    id: "12346",
    service: "ITR Filing",
    status: "upcoming",
    statusText: "Upcoming - Today, 4:00 PM",
    expert: "Priya Sharma",
  },
  {
    id: "12347",
    service: "Business Loan Consultation",
    status: "pending",
    statusText: "Pending Confirmation",
    expert: "Amit Verma",
  },
];

export default function Bookings() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success";
      case "upcoming":
        return "text-foreground";
      case "pending":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const handleJoinCall = (bookingId: string) => {
    router.push(`/consultation/${bookingId}`);
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/consultation/${bookingId}`);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="page-container">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Avatar */}
          <Card className="card-shadow h-fit">
            <CardContent className="p-8 flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-foreground">
                My Bookings
              </h2>
            </CardContent>
          </Card>

          {/* Right Section - Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        Booking ID: {booking.id} - {booking.service}
                      </h3>
                      <p
                        className={`text-sm ${getStatusColor(booking.status)}`}
                      >
                        Status: {booking.statusText}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expert: {booking.expert}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-w-35">
                      {booking.status === "active" ? (
                        <>
                          <Button
                            onClick={() => handleJoinCall(booking.id)}
                            className="w-full"
                          >
                            Join Video Call
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleJoinCall(booking.id)}
                            className="w-full"
                          >
                            Chat
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleViewDetails(booking.id)}
                          className="w-full"
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
