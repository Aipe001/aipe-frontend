import { apiClient } from "./client";

export enum ServiceType {
    ON_DEMAND = "on_demand",
    END_TO_END = "end_to_end",
}

export interface CreateBookingRequestPayload {
    serviceId: string;
    serviceType: ServiceType;
    customerNotes?: string;
}

export interface BookingRequest {
    id: string;
    customerId: string;
    serviceId: string;
    expertId: string;
    serviceType: ServiceType;
    status: string;
    customerNotes?: string;
    createdAt: string;
    service?: any;
    customer?: any;
}

export interface Booking {
    id: string;
    bookingNumber: string;
    userId: string;
    expertId: string;
    serviceId: string;
    bookingRequestId?: string;
    scheduledAt: string;
    durationMinutes: number;
    status: string;
    baseAmount: number;
    serviceFee: number;
    gstAmount: number;
    totalAmount: number;
    agoraChatChannelId?: string;
    notes?: string;
    cancellationReason?: string;
    cancelledAt?: string;
    completedAt?: string;
    startedAt?: string;
    createdAt: string;
    updatedAt: string;
    expert?: any;
    service?: any;
}

export const createBookingRequest = async (
    data: CreateBookingRequestPayload,
): Promise<BookingRequest> => {
    return apiClient<BookingRequest>("/bookings/requests", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const getMyBookingRequests = async (): Promise<BookingRequest[]> => {
    return apiClient<BookingRequest[]>("/bookings/requests/my");
};

export const getMyBookings = async (): Promise<Booking[]> => {
    return apiClient<Booking[]>("/bookings/my");
};

// --- Expert Specific Endpoints ---

export const getExpertBookingRequests = async (): Promise<BookingRequest[]> => {
    return apiClient<BookingRequest[]>("/bookings/requests/expert");
};

export const acceptBookingRequest = async (id: string): Promise<any> => {
    return apiClient<any>(`/bookings/requests/${id}/accept`, {
        method: "PATCH",
    });
};

export const rejectBookingRequest = async (
    id: string,
    reason?: string,
): Promise<any> => {
    return apiClient<any>(`/bookings/requests/${id}/reject`, {
        method: "PATCH",
        body: JSON.stringify({ reason }),
    });
};
