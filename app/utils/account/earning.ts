import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../account/auth'; 
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

export interface Earning {
    id: string;
    companyId: string;
    userId: string;
    planType: string;
    billingCycle: string;
    nextBillingDate: string; 
    status: string;
    isCompleted: boolean;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateEarningData {
    planType: string;
    billingCycle: string;
    nextBillingDate: string | Date;
    status: string;
    isCompleted: boolean;
    amount: number;
}

export type UpdateEarningData = Partial<Omit<CreateEarningData, 'nextBillingDate'> & {
    nextBillingDate?: string | Date;
}>;

export const earningApi = {
  
    createEarning: async (
        companyId: string, 
        userId: string, 
        data: CreateEarningData
    ): Promise<Earning> => {
        const response = await api.post<Earning>(`/account/earning/earn/${companyId}/${userId}`, {
            ...data,
            nextBillingDate: data.nextBillingDate instanceof Date ? data.nextBillingDate.toISOString() 
            : data.nextBillingDate,
        });
        return response.data;
    },

    getAllEarnings: async (): Promise<Earning[]> => {
        const response = await api.get<Earning[]>(`/account/earning/earn/get`);
        return response.data;
    },

    getEarningById: async (id: string): Promise<Earning> => {
        const response = await api.get<Earning>(`/account/earning/earn/get/${id}`);
        return response.data;
    },

    updateEarning: async (id: string, data: UpdateEarningData): Promise<Earning> => {
        const response = await api.put<Earning>(`/account/earning/earn/update/${id}`, {
            ...data,
            nextBillingDate: data.nextBillingDate instanceof Date ? data.nextBillingDate.toISOString() : data.nextBillingDate,
        });
        return response.data;
    },

    deleteEarning: async (id: string): Promise<{ message: string }> => {
        await api.delete(`/account/earning/earn/delete/${id}`);
        return { message: `Earning record ${id} deleted successfully.` };
    },
};
