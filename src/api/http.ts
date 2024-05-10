import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/store/authStore';

const BASE_URL = 'http://localhost:3000';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? `Bearer ${getToken()}` : '',
    },
    withCredentials: true,
    ...config,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use((request) => {
    console.log('Starting Request', request);
    return request;
  });

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response:', response);
      return response;
    },
    (error) => {
      console.log('Error:', error);
      if (error.response.status === 401) {
        // 로그인 만료 처리
        removeToken();
        window.location.href = '/login';
        return;
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청 부분
type RequestMethod = 'get' | 'post' | 'put' | 'delete';
export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T,
) => {
  let response;

  switch (method) {
    case 'get':
      response = await httpClient.get(url);
      break;
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'put':
      response = await httpClient.put(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete(url);
      break;
    default:
      throw new Error('Method not allowed');
  }
  return response.data;
};
