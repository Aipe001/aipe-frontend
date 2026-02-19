import { apiClient } from "./client";

export interface InitiateBookingPayload {
    serviceId: string;
    serviceType: string;
    customerNotes?: string;
}

export interface PricingBreakdown {
    baseAmount: number;
    serviceFee: number;
    gstAmount: number;
    totalAmount: number;
}

export interface InitiateBookingResponse {
    bookingRequest: {
        id: string;
        serviceId: string;
        serviceType: string;
        status: string;
        razorpayOrderId: string;
        totalAmount: number;
    };
    razorpayOrderId: string;
    razorpayKeyId: string;
    pricing: PricingBreakdown;
}

export interface ConfirmPaymentPayload {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export const initiateBookingPayment = async (
    data: InitiateBookingPayload,
): Promise<InitiateBookingResponse> => {
    return apiClient<InitiateBookingResponse>("/bookings/requests/initiate", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const confirmBookingPayment = async (
    data: ConfirmPaymentPayload,
): Promise<any> => {
    return apiClient<any>("/bookings/requests/confirm-payment", {
        method: "POST",
        body: JSON.stringify(data),
    });
};
