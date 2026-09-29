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

export interface DataIntegrationRequestData {
    fullName: string;
    email: string;
    country: string;
    sourceName: string;
    requestType: string;
    useCaseDescription: string;
    dataUpdateFrequency: string;
    dataVolume: string;
}

export interface DataIntegrationResponse {
    success: boolean;
    newRequest?: any;
    requests?: any[];
    request?: any;
    updatedRequest?: any;
    deletedRequest?: any;
    message?: string;
}

export const dataIntegrations = {
  
    createRequest: async (data: DataIntegrationRequestData): Promise<DataIntegrationResponse> => {
        const response = await api.post<DataIntegrationResponse>('/account/request/create', data);
        return response.data;
    },

    getAllRequests: async (): Promise<DataIntegrationResponse> => {
        const response = await api.get<DataIntegrationResponse>('/account/request/get');
        return response.data;
    },

    getRequestById: async (id: string): Promise<DataIntegrationResponse> => {
        const response = await api.get<DataIntegrationResponse>(`/account/request/get/${id}`);
        return response.data;
    },

    updateRequest: async (id: string, updateData: Partial<DataIntegrationRequestData>): Promise<DataIntegrationResponse> => {
        const response = await api.put<DataIntegrationResponse>(`/account/request/update/${id}`, updateData);
        return response.data;
    },

    deleteRequest: async (id: string): Promise<DataIntegrationResponse> => {
        const response = await api.delete<DataIntegrationResponse>(`/account/request/delete/${id}`);
        return response.data;
    },
};