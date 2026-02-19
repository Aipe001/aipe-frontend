import { apiClient } from "./client";

export interface ServiceCategory {
    id: string;
    name: string;
    description?: string;
    iconUrl?: string;
    displayOrder: number;
}

export enum ServiceType {
    ON_DEMAND = 'on_demand',
    END_TO_END = 'end_to_end',
    BOTH = 'both',
}

export interface Service {
    id: string;
    name: string;
    description?: string;
    shortDescription?: string;
    serviceType: ServiceType;
    categoryId: string;
    basePrice: number;
    onDemandPrice?: number;
    endToEndPrice?: number;
    iconUrl?: string;
    imageUrl?: string;
    isFeatured: boolean;
}

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
    return apiClient<ServiceCategory[]>("/services/categories");
};

export const getAllServices = async (): Promise<Service[]> => {
    return apiClient<Service[]>("/services");
};

export const getServicesByCategory = async (categoryId: string): Promise<Service[]> => {
    return apiClient<Service[]>(`/services/category/${categoryId}`);
};

export const getFeaturedServices = async (): Promise<Service[]> => {
    return apiClient<Service[]>("/services/featured");
};
