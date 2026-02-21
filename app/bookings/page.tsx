"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { AuthModal } from "@/components/auth/AuthModal";
import { OTPModal } from "@/components/auth/OTPModal";
import { toast } from "sonner";
import { getMyBookings, getMyBookingRequests, getExpertBookings, getExpertBookingRequests, Booking, BookingRequest } from "@/lib/api/bookings";
import { Loader2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Bookings() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const isExpert = user?.isExpert;
      const promises: any[] = [
        getMyBookings(),
        getMyBookingRequests(),
      ];
      if (isExpert) {
        promises.push(getExpertBookings());
        promises.push(getExpertBookingRequests());
      }

      const results = await Promise.all(promises);

      let allBookings: Booking[] = results[0];
      let allRequests: BookingRequest[] = results[1];

      if (isExpert) {
        // Merge expert bookings and remove duplicates
        allBookings = [...allBookings, ...results[2]];
        allRequests = [...allRequests, ...results[3]];
      }

      // Deduplicate bookings by ID
      allBookings = Array.from(new Map(allBookings.map(b => [b.id, b])).values());
      allRequests = Array.from(new Map(allRequests.map(r => [r.id, r])).values());

      setBookings(allBookings);
      setBookingRequests(allRequests);
    } catch (error) {
      toast.error("Failed to load bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthModalClose = () => {
    toast.error("Login process not completed.");
    router.push("/");
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "active":
        return { color: "text-success", label: "Active Now", category: "active" };
      case "upcoming":
      case "confirmed":
        return { color: "text-foreground", label: "Upcoming", category: "upcoming" };
      case "pending_payment":
        return { color: "text-warning", label: "Pending Payment", category: "pending" };
      case "pending_confirmation":
        return { color: "text-warning", label: "Pending Confirmation", category: "pending" };
      case "completed":
        return { color: "text-muted-foreground", label: "Completed", category: "completed" };
      case "cancelled":
        return { color: "text-destructive", label: "Cancelled", category: "cancelled" };
      default:
        return { color: "text-muted-foreground", label: status.replace(/_/g, " "), category: "other" };
    }
  };

  const handleJoinCall = (bookingId: string) => {
    router.push(`/consultation/${bookingId}`);
  };

  const handleViewDetails = (bookingId: string) => {
    router.push(`/consultation/${bookingId}`);
  };

  const getParticipantName = (booking: any) => {
    const isMyExpertBooking = user?.isExpert && booking.expert?.userId === user.id;

    if (isMyExpertBooking) {
      // Booking entity uses .user, BookingRequest uses .customer
      const customer = booking.user || booking.customer;
      if (customer?.firstName) {
        return `Customer: ${customer.firstName} ${customer.lastName || ""}`.trim();
      }
      return "Customer Details";
    }

    if (booking.expert?.user?.firstName) {
      return `Expert: ${booking.expert.user.firstName} ${booking.expert.user.lastName || ""}`.trim();
    }
    return "Expert: Assigned";
  };

  const getServiceName = (booking: Booking | BookingRequest) => {
    if (booking.service?.name) return booking.service.name;
    return "Consultation";
  };

  return (
    <>
      {/* Auth Protection Overlay */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center">
          <AuthModal isOpen={true} onClose={handleAuthModalClose} />
          <OTPModal />
        </div>
      )}

      <div
        className={`py-12 bg-background min-h-screen ${!isAuthenticated ? "blur-sm pointer-events-none" : ""}`}
      >
        <div className="page-container">
          <h1 className="text-3xl font-display font-bold text-[#1C8AFF] mb-8">
            My Bookings
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Avatar */}
            <Card className="card-shadow h-fit">
              <CardContent className="p-8 flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl bg-[#1C8AFF] text-primary-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-foreground">
                  My Bookings
                </h2>
              </CardContent>
            </Card>

            {/* Right Section - Bookings List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Booking Requests */}
              {!loading && bookingRequests.length > 0 && (
                <Accordion type="single" collapsible defaultValue="requests">
                  <AccordionItem value="requests" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-0 mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-display font-medium text-foreground">
                          Booking Requests ({bookingRequests.length})
                        </h2>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                      {bookingRequests.map((request) => (
                        <Card key={request.id} className="card-shadow border-blue-100 bg-blue-50/30">
                          <CardContent className="p-5">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-foreground">
                                  Request for {getServiceName(request)}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {getParticipantName(request)}
                                </p>
                              </div>
                              <div className="flex flex-col gap-1 text-right max-md:text-left">
                                <span className="text-sm font-medium text-warning capitalize">
                                  {request.status.replace(/_/g, " ")}
                                </span>
                                {request.status === "pending_payment" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleViewDetails(request.id)}
                                    className="bg-primary hover:bg-primary/90 mt-2"
                                  >
                                    Complete Payment
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {/* Confirmed Bookings */}
              <div className="space-y-4">
                <h2 className="text-xl font-display font-medium text-foreground mb-4">
                  Confirmed Bookings
                </h2>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : bookings.length === 0 ? (
                  <Card className="card-shadow">
                    <CardContent className="p-12 text-center text-muted-foreground">
                      You have no bookings yet.
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking) => {
                    const statusDisplay = getStatusDisplay(booking.status);

                    return (
                      <Card key={booking.id} className="card-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground">
                                Booking: {booking.bookingNumber} - {getServiceName(booking)}
                              </h3>
                              <p className={`text-sm ${statusDisplay.color}`}>
                                Status: {statusDisplay.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {getParticipantName(booking)}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2 min-w-35">
                              {statusDisplay.category === "active" ? (
                                <>
                                  <Button
                                    onClick={() => handleJoinCall(booking.id)}
                                    className="w-full bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 cursor-pointer"
                                  >
                                    Join Video Call
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleJoinCall(booking.id)}
                                    className="w-full cursor-pointer"
                                  >
                                    Chat
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  onClick={() => handleViewDetails(booking.id)}
                                  className="w-full bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 cursor-pointer"
                                >
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
