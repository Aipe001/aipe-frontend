"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { toast } from "sonner";
import {
  getExpertBookingRequests,
  acceptBookingRequest,
  rejectBookingRequest,
  BookingRequest
} from "@/lib/api/bookings";
import { Loader2, Wallet, CheckCircle, XCircle, ArrowRightLeft } from "lucide-react";
import { format } from "date-fns";

export default function ExpertDashboard() {
  const router = useRouter();

  // Checking both auth state and potentially Role state if they exist
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Mock Wallet State (Backend missing full wallet endpoints)
  const [walletBalance] = useState(0.00);
  const [completedConsultations] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // In a real scenario, we check if user.role === 'EXPERT'. 
    // If not, we redirect them away.
    // For now we assume they are authorized and try fetching.
    fetchRequests();
  }, [isAuthenticated, router]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getExpertBookingRequests();
      setRequests(data);
    } catch (error) {
      toast.error("Failed to load your incoming requests");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      setProcessingId(id);
      await acceptBookingRequest(id);
      toast.success("Request accepted successfully! A booking has been created.");
      fetchRequests(); // refresh the list to remove the pending request
    } catch (error: any) {
      toast.error(error?.message || "Failed to accept request");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessingId(id);
      await rejectBookingRequest(id, "Expert rejected the request");
      toast.success("Request rejected.");
      fetchRequests(); // refresh the list
    } catch (error: any) {
      toast.error(error?.message || "Failed to reject request");
    } finally {
      setProcessingId(null);
    }
  };

  const handleWithdraw = () => {
    if (walletBalance <= 0) {
      toast.error("Insufficient balance to withdraw!");
      return;
    }
    toast.info("Withdrawal request initiated!");
  };

  // Only show "pending" items to the expert so they can accept/reject
  const pendingRequests = requests.filter(r => r.status === "pending");

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="page-container max-w-6xl mx-auto space-y-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary">
              Expert Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, $\{user?.firstName || 'Expert'}! Manage your earnings and requests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Wallet Card - 1 Column */}
          <div className="md:col-span-1 space-y-6">
            <Card className="card-shadow border border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Wallet Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground mb-4">
                  ₹{walletBalance.toFixed(2)}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                  <span>Available for withdrawal</span>
                </div>
                <Button
                  onClick={handleWithdraw}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>

            <Card className="card-shadow border border-border/50">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Completed Consultations
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {completedConsultations}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Incoming Requests Column - 2 Columns */}
          <div className="md:col-span-2">
            <Card className="card-shadow border border-border/50 h-full">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-xl">Incoming Requests</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review and accept requests from customers. Requests must be paid by the customer before showing up here.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                    <p>No new incoming requests at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground">
                            {req.service?.name || 'Consultation Request'}
                            <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                              {req.serviceType.replace('_', ' ')}
                            </span>
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Requested by: {req.customer?.firstName || 'Customer'} {req.customer?.lastName || ''}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(req.createdAt), 'PPpp')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            size="sm"
                            disabled={processingId === req.id}
                            onClick={() => handleReject(req.id)}
                          >
                            {processingId === req.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="mr-1 h-4 w-4" />
                            )}
                            Reject
                          </Button>
                          <Button
                            className="bg-success hover:bg-success/90 text-success-foreground"
                            size="sm"
                            disabled={processingId === req.id}
                            onClick={() => handleAccept(req.id)}
                          >
                            {processingId === req.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="mr-1 h-4 w-4" />
                            )}
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
