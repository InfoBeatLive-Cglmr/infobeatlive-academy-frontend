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

export interface CheckoutRequestData {
    email: string;
    userId: string;
    companyId: string;
    amount: number;
    type: 'Basic' | 'Pro' | 'Enterprise'; 
    billingCycle: 'Life Time' | 'Life Time';
}

export interface CheckoutResponse {
    checkoutUrl: string; 
}

export const lifeTimePaymentApi = {

    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createBasicCheckout: async ( data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/basic/one-time',  data );
        return response.data;
    },

    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createProCheckout: async ( data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/pro/one-time',  data );
        return response.data;
    },
};

