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
    billingCycle: 'Monthly' | 'Yearly';
}

export interface CheckoutResponse {
    checkoutUrl: string; 
}

export const paymentApi = {

    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createBasicMonthlyCheckout: async ( data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/basic/monthly',  data );
        return response.data;
    },

    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createBasicYearlyCheckout: async (   data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/basic/yearly', data );
        return response.data;
    },


    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createProMonthlyCheckout: async ( data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/pro/monthly',  data );
        return response.data;
    },

    /**
     * @param {CheckoutRequestData} data 
     * @returns {Promise<CheckoutResponse>} 
     */
    createProYearlyCheckout: async (   data: CheckoutRequestData ): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>(
            '/account/payment/create-checkout/pro/yearly', data );
        return response.data;
    },
    
};

