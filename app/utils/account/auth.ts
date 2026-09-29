import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const getAccessToken = (): string | null => Cookies.get('accessToken') || null;

export const setTokensAndUserId = (accessToken: string | null, refreshToken: string | null, userId: string | null): void => {
    if (accessToken) {
        Cookies.set('accessToken', accessToken, { expires: 30 });
    }
    if (userId) {
        Cookies.set('userId', userId, { expires: 30 });
    }
    if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, { expires: 30 });
    }
};

//  export const BASE_URL: string =  'http://localhost:8080/api';

//  export const SOCKET_BASE_URL: string =  'http://localhost:8080';

export const BASE_URL: string =  'https://api.infobeatlive.com/api';  

export const SOCKET_BASE_URL: string = 'https://api.infobeatlive.com';  

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

export interface RegisterRequest {
    email: string;
    fullName: string;
    password: string;
}

export interface OnboardRequest {
    email: string; 
    fullName: string;
    companyId: string; 
    projectId: string; 
    roleInCompany: string;  
    country: string;
    company: string; 
    companyWebsite: string;
    projectName: string;
    role: string;
    companyName: string; 
    managerName: string;
}

export interface OnboardResponse {
    success: boolean;
    message: string;
    userId: string;
    email: string;
    isNewUser: boolean;
}

export interface AcceptInvitationRequest {
    userId: string;
    companyId: string;
}

export interface AcceptInvitationResponse {
    success: boolean;
    message: string;
    userCompany: any;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UpdatePasswordRequest {
    email: string;
    newPassword: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    error?: string;
}

export const auth = {
    register: async (data: RegisterRequest): Promise<ApiResponse> => {
        const response = await api.post<ApiResponse>('/account/auth/register/register', data);
        return response.data;
    },

    login: async (data: LoginRequest): Promise<ApiResponse> => {
        const response = await api.post<ApiResponse>('/account/auth/login/login', data);
        return response.data;
    },

    updatePassword: async (data: UpdatePasswordRequest): Promise<ApiResponse> => {
        const response = await api.post<ApiResponse>('/account/auth/forgotPassword/update-password', data);
        return response.data;
    },
};

export const onboarding = {
    onboardUser: async (data: OnboardRequest): Promise<OnboardResponse> => {
        const response = await api.post<OnboardResponse>('/account/auth/register/onboard', data);
        return response.data;
    },

    acceptInvitation: async (data: AcceptInvitationRequest): Promise<AcceptInvitationResponse> => {
        const response = await api.put<AcceptInvitationResponse>('/account/auth/register/onboard/accept-invitation', data);
        return response.data;
    },
};

interface LogoutResponse {
  message: string;
  error: string;
}


export const clearCompanyData = () => {
  if (typeof window === "undefined") return; 
  localStorage.removeItem("unread_count");
  localStorage.removeItem("company_users");
  localStorage.removeItem("company_projects");
  localStorage.removeItem("company_invoices");
};

export const clearMetricsCookies  = () => {
   if (typeof window === "undefined") return; 
  // ✅ 1. Clear cookies
  const allCookies = Cookies.get();

  Object.keys(allCookies).forEach((key) => {
    if (
      key.startsWith("project_") ||
      key.startsWith("main_metrics_") ||
      key.startsWith("custom_metrics_") ||
      key.startsWith("custom_definitions_") ||
      key === "selected_metrics_type" ||
      key === "selected_metric_name"
    ) {
      Cookies.remove(key);
    }
  });

  // ✅ 2. Clear localStorage (if anything is stored there)
  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith("project_") ||
      key.startsWith("main_metrics_") ||
      key.startsWith("custom_metrics_") ||
      key.startsWith("custom_definitions_") ||
      key === "selected_metrics_type" ||
      key === "selected_metric_name"
    ) {
      localStorage.removeItem(key);
    }
  });

  const prefix = "myApp_";

  // Clear cookies
  const allStorageCookies = Cookies.get();
  Object.keys(allStorageCookies).forEach((key) => {
    if (
      key.startsWith(`${prefix}project_`) ||
      key.startsWith(`${prefix}main_metrics_`) ||
      key.startsWith(`${prefix}custom_metrics_`) ||
      key.startsWith(`${prefix}custom_definitions_`) ||
      key === `${prefix}selected_metrics_type` ||
      key === `${prefix}selected_metric_name`
    ) {
      Cookies.remove(key);
    }
  });

  // Clear localStorage
  Object.keys(localStorage).forEach((key) => {
    if (
      key.startsWith(`${prefix}project_`) ||
      key.startsWith(`${prefix}main_metrics_`) ||
      key.startsWith(`${prefix}custom_metrics_`) ||
      key.startsWith(`${prefix}custom_definitions_`) ||
      key === `${prefix}selected_metrics_type` ||
      key === `${prefix}selected_metric_name`
    ) {
      localStorage.removeItem(key);
    }
  });
  clearCompanyData();
};

export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const response: AxiosResponse<LogoutResponse> = await axios.post(`${BASE_URL}/account/auth/logout/logout`);

    if (response.status === 200) {
      const responseData = response.data;

      Cookies.remove('accessToken', { path: '/' });
      Cookies.remove('refreshToken', { path: '/' });
      Cookies.remove('userId', { path: '/' });
      Cookies.remove('isAuthenticated', { path: '/', });

      Cookies.remove("dashboardsUpdate", { path: '/' });
      Cookies.remove("settingsUpdate", { path: '/' });
      Cookies.remove("notificationUpdate", { path: '/' });

      Cookies.remove("unread_count", { path: '/' });
      Cookies.remove("company_users", { path: '/' });
      Cookies.remove("company_projects", { path: '/' });
      Cookies.remove("company_invoices", { path: '/' });
      
      Cookies.remove('user', { path: '/' });
      Cookies.remove('project',  { path: '/',  });
      Cookies.remove('company', { path: '/',  });
      Cookies.remove('companyOwnerId', { path: '/',  });
      Cookies.remove('userCompany', { path: '/',  });

      Cookies.remove('userName',  { path: '/'});
      Cookies.remove('email', { path: '/' });
      Cookies.remove('projectId', { path: '/' });
      Cookies.remove('companyId', { path: '/' });
      Cookies.remove('userCompanyId',  { path: '/' });
      Cookies.remove('currency',  { path: '/',  });

      Cookies.remove('employeesCount', { path: '/' });
      Cookies.remove('projectsCount', { path: '/' });
      Cookies.remove('numberOfUSersAllowed', { path: '/' });
      Cookies.remove('numberOfProjectsAllowed', { path: '/' });
      Cookies.remove('subscriptionType',  { path: '/' });
      Cookies.remove('isCompanySuspended', { path: '/' });
      clearMetricsCookies();

      Cookies.remove("dashboardsUpdate", { path: '/' });
      Cookies.remove("settingsUpdate", { path: '/' });
      Cookies.remove("notificationUpdate", { path: '/' });
      Cookies.remove("dashboardsUpdateLatest", { path: '/' });
      Cookies.remove("settingsUpdateLatest", { path: '/' });
      Cookies.remove("notificationUpdateLatest", { path: '/' });

      return { success: true, message: responseData.message };
    } else {
      console.error('Error during logout:', response.data.error);
      throw new Error(response.data.error || 'Failed to logout');
    }
  } catch (error:any) {
    console.error('Error during logout:', error.message);
    throw new Error('Failed to logout');
  }
};