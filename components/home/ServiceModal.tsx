"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  FileCheck,
  Loader2,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { Service, ServiceType } from "@/lib/api/services";
import {
  initiateBookingPayment,
  confirmBookingPayment,
} from "@/lib/api/payments";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  if (!service) return null;

  const getDisplayPrice = () => {
    if (service.serviceType === ServiceType.ON_DEMAND && service.onDemandPrice) {
      return Number(service.onDemandPrice);
    }
    if (service.serviceType === ServiceType.END_TO_END && service.endToEndPrice) {
      return Number(service.endToEndPrice);
    }
    return Number(service.basePrice);
  };

  const handlePayAndBook = async () => {
    setSubmitting(true);
    try {
      // Step 1: Initiate booking request and get Razorpay order
      const response = await initiateBookingPayment({
        serviceId: service.id,
        serviceType: service.serviceType,
        customerNotes: notes || undefined,
      });

      const { razorpayOrderId, razorpayKeyId, pricing } = response;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: razorpayKeyId,
        amount: Math.round(pricing.totalAmount * 100),
        currency: "INR",
        name: "AIPE",
        description: service.name,
        order_id: razorpayOrderId,
        handler: async (razorpayResponse: any) => {
          try {
            // Step 3: Confirm payment with backend
            await confirmBookingPayment({
              razorpayOrderId: razorpayResponse.razorpay_order_id,
              razorpayPaymentId: razorpayResponse.razorpay_payment_id,
              razorpaySignature: razorpayResponse.razorpay_signature,
            });

            setSuccess(true);
            toast({
              title: "Payment Successful!",
              description:
                "Your booking request has been submitted. An expert will accept it shortly.",
            });

            setTimeout(() => {
              handleClose();
              router.push("/bookings");
            }, 1500);
          } catch (err: any) {
            toast({
              title: "Payment Verification Failed",
              description:
                err.message || "Please contact support if money was deducted.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            toast({
              title: "Payment Cancelled",
              description: "You can try again anytime.",
            });
          },
        },
        prefill: {},
        theme: {
          color: "#1C8AFF",
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Payment gateway not loaded. Please refresh the page.");
      }
    } catch (err: any) {
      toast({
        title: "Failed to initiate payment",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setNotes("");
    setSuccess(false);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-foreground">
            {service.name}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <p className="text-lg font-semibold text-foreground">
              Payment Successful!
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Your request is pending expert acceptance. Redirecting...
            </p>
          </div>
        ) : (
          <div className="mt-2 space-y-5">
            {/* Description */}
            {service.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            )}

            {/* Service Details */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1C8AFF] rounded-full text-white">
                  {service.serviceType === ServiceType.ON_DEMAND ? (
                    <Phone className="w-5 h-5" />
                  ) : (
                    <FileCheck className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {service.serviceType === ServiceType.ON_DEMAND ? "On Demand Consultation" : "End to End Service"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {service.serviceType === ServiceType.ON_DEMAND ? "Quick consultation over call" : "Full process handling by expert"}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Additional Notes{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what you need help with..."
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Base Price</span>
                <span>₹{getDisplayPrice().toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Service Fee</span>
                <span>
                  ₹
                  {Number(service.serviceFee || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>GST ({service.gstPercentage || 18}%)</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-bold text-foreground">Estimated Total</span>
                <span className="text-lg font-bold text-foreground">
                  ₹{Number(getDisplayPrice() + (service.serviceFee || 0)).toLocaleString("en-IN")}+
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayAndBook}
                className="flex-1 bg-[#1C8AFF] hover:bg-blue-600"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <IndianRupee className="w-4 h-4 mr-1" />
                    Checkout & Book
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
