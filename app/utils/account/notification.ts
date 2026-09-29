import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from './auth';
import { BASE_URL } from './auth';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        try {
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error('Error retrieving access token:', error);
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

export interface CreateNotificationData {
    userId: string;
    projectId: string;
    title: string;
    description: string;
}

export interface Notification {
    id: string;
    userId: string;
    projectId: string;
    title: string;
    description: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotificationCountResponse {
    count: number;
}

export interface NotificationResponse {
    success?: boolean;
    notification?: Notification;
    notifications?: Notification[];
    count?: number; 
    message?: string;
    error?: string;
}

export const notificationApi = {
   
    create: async (data: CreateNotificationData): Promise<NotificationResponse> => {
        const response = await api.post<Notification>('/account/notification/notifications', data);
        return { notification: response.data };
    },

    getByUser: async (userId: string): Promise<NotificationResponse> => {
        const response = await api.get<Notification[]>
        (`/account/notification/notifications/user/${userId}`);
        return { notifications: response.data };
    },

    
    getByProject: async (projectId: string): Promise<NotificationResponse> => {
        const response = await api.get<Notification[]>
        (`/account/notification/notifications/project/${projectId}`);
        return { notifications: response.data };
    },

    getUnreadCount: async (projectId: string): Promise<NotificationCountResponse> => {
        const response = await api.get<NotificationCountResponse>
        (`/account/notification/notifications/unread/count/${projectId}`);
        return response.data;
    },

    markAsRead: async (id: string): Promise<NotificationResponse> => {
        const response = await api.put<Notification>(`/account/notification/notifications/read/${id}`);
        return { notification: response.data };
    },

    markAllAsRead: async (projectId: string): Promise<NotificationResponse> => {
        const response = await api.put<NotificationCountResponse>(
            `/account/notification/notifications/read-all/${projectId}`
        );
        return { count: response.data.count, message: `Successfully marked ${response.data.count} notifications as read.` };
    },

    delete: async (id: string): Promise<NotificationResponse> => {
        await api.delete(`/account/notification/notifications/${id}`);
        return { success: true, message: 'Notification deleted successfully.' };
    },
};