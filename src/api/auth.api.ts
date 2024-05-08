import { httpClient } from './http';
import { LoginData } from '../models/user.model';

const login = async (userData: LoginData) => {
  const response = await httpClient.post('/auth/login', userData);
  return response.data;
};

export default login;
