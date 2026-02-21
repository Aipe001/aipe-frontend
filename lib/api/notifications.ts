import { apiClient } from "./client";

export interface AppNotification {
    id: string;
    userId: string;
    title: string;
    body: string;
    type: string;
    data?: Record<string, any>;
    isRead: boolean;
    readAt?: string;
    createdAt: string;
}

export const getMyNotifications = async (): Promise<AppNotification[]> => {
    return apiClient<AppNotification[]>("/notifications");
};

export const getUnreadNotifications = async (): Promise<AppNotification[]> => {
    return apiClient<AppNotification[]>("/notifications/unread");
};

export const countUnreadNotifications = async (): Promise<number> => {
    return apiClient<number>("/notifications/unread/count");
};

export const markNotificationAsRead = async (id: string): Promise<AppNotification> => {
    return apiClient<AppNotification>(`/notifications/${id}/read`, {
        method: "PATCH",
    });
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
    return apiClient<void>("/notifications/read-all", {
        method: "PATCH",
    });
};

export const deleteNotification = async (id: string): Promise<void> => {
    return apiClient<void>(`/notifications/${id}`, {
        method: "DELETE",
    });
};
