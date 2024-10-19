import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginRequest, LoginResponse } from './_models';

const LOGIN_URL = `${process.env.API_URL}/api/auth/login`;

const loginRequest = async (payload: LoginRequest) => {
  const response = await axios.post<LoginResponse>(LOGIN_URL, payload);
  return response.data;
};

const logoutRequest = async () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export { loginRequest, logoutRequest };
