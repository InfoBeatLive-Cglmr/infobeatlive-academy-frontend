import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from './auth';

export const getGoogleOAuthUrl = (): string => {
  return `${BASE_URL}/account/auth/googleAuth/google`;
};

export interface GoogleAuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    handle: string;
  };
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

export const handleGoogleCallback = async (): Promise<GoogleAuthResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/account/auth/googleAuth/google/callback`, {
      withCredentials: true,
    });

    const { user, accessToken } = response.data;

    if (user && accessToken) {
      Cookies.set('accessToken', accessToken, { path: '/', expires: 7 });
      Cookies.set('userId', user.id, { path: '/', expires: 7 });
    }

    return {
      success: true,
      user,
      accessToken,
    };
  } catch (error: any) {
    console.error('OAuth failed:', error.message);
    return { success: false, error: 'OAuth login failed' };
  }
};
