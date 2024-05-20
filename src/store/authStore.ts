import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  token: string | null;
  isLoggedOut: boolean; // 로그아웃 상태 추가
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: !!getToken(),
  token: getToken(),
  isLoggedOut: false, // 초기 로그아웃 상태 설정
  storeLogin: (token: string) => {
    set({
      isLoggedIn: true,
      token,
      isLoggedOut: false, // 로그인 시 로그아웃 상태를 false로 설정
    });
    setToken(token);
  },
  storeLogout: () => {
    set({
      isLoggedIn: false,
      token: null,
      isLoggedOut: true, // 로그아웃 시 로그아웃 상태를 true로 설정
    });
    removeToken();
  },
}));
