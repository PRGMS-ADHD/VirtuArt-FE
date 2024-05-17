// import { create } from 'zustand';
//
// interface StoreState {
//   isLoggedIn: boolean;
//   storeLogin: (token: string) => void;
//   storeLogout: () => void;
// }
//
// export const getToken = () => {
//   const token = localStorage.getItem('token');
//   return token;
// };
//
// const setToken = (token: string) => {
//   localStorage.setItem('token', token);
// };
//
// export const removeToken = () => {
//   localStorage.removeItem('token');
// };
//
// export const useAuthStore = create<StoreState>((set) => ({
//   isLoggedIn: !!getToken(), // 로컬 스토리지에서 토큰을 확인하여 초기 상태 설정
//   storeLogin: (token: string) => {
//     set({ isLoggedIn: true });
//     setToken(token);
//   },
//   storeLogout: () => {
//     set({ isLoggedIn: false });
//     removeToken();
//   },
// }));
// src/store/authStore.ts
// src/store/authStore.ts
// authStore.ts
import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  token: string | null; // 토큰 상태 추가
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
  token: getToken(), // 초기 토큰 상태 설정
  storeLogin: (token: string) => {
    set({
      isLoggedIn: true,
      token, // 토큰 업데이트
    });
    setToken(token);
  },
  storeLogout: () => {
    set({
      isLoggedIn: false,
      token: null,
    });
    removeToken();
  },
}));
