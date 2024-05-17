import { httpClient } from './http';
import { LoginData, ResetPasswordData, SignUpData } from '../models/user.model';

export const login = async (userData: LoginData) => {
  const response = await httpClient.post('/auth/login', userData);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
  const response = await httpClient.post('/auth/change-password', data);
  return response.data;
};

export const signUp = async (data: SignUpData) => {
  const response = await httpClient.post('/auth/register', data);
  return response.data;
};

export const getUserInfo = async (email: string) => {
  const response = await httpClient.get(`/auth/${email}`);
  return response.data;
};
