import { apiClient } from "./client";

export enum ServiceType {
    ON_DEMAND = "on_demand",
    END_TO_END = "end_to_end",
    BOTH = "both",
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
