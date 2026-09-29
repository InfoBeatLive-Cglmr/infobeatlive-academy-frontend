
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

export interface FeedbackData {
    name: string;
    email: string;
    reason: string;
    statement: string;
    rating: number;
}

export interface FeedbackResponse {
    success: boolean;
    newFeedback?: any;
    feedbacks?: any[];
    feedback?: any;
    updatedFeedback?: any;
    message?: string;
    error?: string;
}

export const feedback = {
   
    create: async (data: FeedbackData): Promise<FeedbackResponse> => {
        const response = await api.post<FeedbackResponse>('/account/feedback/feedback/create', data);
        return response.data;
    },
    
    getAll: async (): Promise<FeedbackResponse> => {
        const response = await api.get<FeedbackResponse>('/account/feedback/feedback/get-all');
        return response.data;
    },

    getById: async (id: string): Promise<FeedbackResponse> => {
        const response = await api.get<FeedbackResponse>(`/account/feedback/feedback/get/${id}`);
        return response.data;
    },

    update: async (id: string, data: Partial<FeedbackData>): Promise<FeedbackResponse> => {
        const response = await api.put<FeedbackResponse>(`/account/feedback/feedback/update/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<FeedbackResponse> => {
        const response = await api.delete<FeedbackResponse>(`/account/feedback/feedback/delete/${id}`);
        return response.data;
    },
};