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

export default api;
