import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor untuk menyisipkan token authorization
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = Cookies.get('access_token');

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }

  return config as InternalAxiosRequestConfig<any>;
});

export const uploadData = (url: string, formData: any) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return api.post(url, formData, config);
};

export const updateData = (url: string, formData: any) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return api.put(url, formData, config);
};

export default api;
