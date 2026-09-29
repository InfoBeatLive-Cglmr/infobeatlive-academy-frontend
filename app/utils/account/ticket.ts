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


export interface TicketData {
    id?:string;
    userId: string;
    companyId: string;
    employeeId?:string;
    employeeName?:string;
    name: string;
    email: string;
    issue: string;
    reason: string;
    status: string, 
    priority:string,
    createdAt:string;
}

export interface TicketResponse {
    success: boolean;
    message: string;
    ticket: any; 
}

export interface TicketListResponse {
    success: boolean;
    tickets: any[];
}

export interface ApiResponse {
    success: boolean;
    message: string;
    error?: string;
}

export const tickets = {
  
    createTicket: async (data: TicketData): Promise<TicketResponse> => {
        const response = await api.post<TicketResponse>('/account/support/ticket/create', data);
        return response.data;
    },

    getTickets: async (): Promise<TicketListResponse> => {
        const response = await api.get<TicketListResponse>('/account/support/ticket/get-all');
        return response.data;
    },

   
    getTicketsByCompany: async (companyId:string): Promise<TicketListResponse> => {
        const response = await api.get<TicketListResponse>(`/account/support/ticket/get-all-by-company/${companyId}`);
        return response.data;
    },

    getTicketById: async (id: string): Promise<TicketResponse> => {
        const response = await api.get<TicketResponse>(`/account/support/ticket/get/${id}`);
        return response.data;
    },

    
    getTicketByUserId: async (userId:string): Promise<TicketListResponse> => {
        const response = await api.get<TicketListResponse>(`/account/support/ticket/get/${userId}`);
        return response.data;
    },

    updateTicket: async (id: string, updateData: Partial<TicketData>): Promise<TicketResponse> => {
        const response = await api.put<TicketResponse>(`/account/support/ticket/update/${id}`, updateData);
        return response.data;
    },

    deleteTicket: async (id: string): Promise<TicketResponse> => {
        const response = await api.delete<TicketResponse>(`/account/support/ticket/delete/${id}`);
        return response.data;
    },
};
