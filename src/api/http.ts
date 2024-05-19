import axios, { AxiosRequestConfig } from 'axios';
import { getToken, useAuthStore } from '../store/authStore';

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

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const store = useAuthStore.getState(); // Zustand 스토어의 상태 직접 접근
        store.storeLogout(); // 로그아웃 처리
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
