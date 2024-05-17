import { useNavigate } from 'react-router-dom';
import { login, resetPassword } from '../api/auth.api';
import { LoginData, ResetPasswordData } from '../models/user.model';
import { useAuthStore } from '../store/authStore'; // useAuthStore import

const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const userLogin = async (data: LoginData) => {
    try {
      const res = await login(data);

      // 토큰을 로컬 스토리지에 저장
      window.localStorage.setItem('token', res.token);

      // Zustand 상태 업데이트
      storeLogin(res.token);

      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error('please check your password and try again.', error);
      alert('please check your password and try again.');
    }
  };

  // const userResetPassword = async (data: ResetPasswordData) => {
  //   try {
  //     const { email, currentPassword, newPassword } = data;
  //     const res = await resetPassword({ email, currentPassword, newPassword });
  //
  //     window.localStorage.removeItem('token'); // 토큰 제거
  //     storeLogout(); // Zustand 상태 업데이트
  //
  //     navigate('/login');
  //
  //     alert('Password reset successful');
  //     navigate('/login'); // 비밀번호를 변경 성공 후 로그인 페이지로 이동
  //   } catch (error) {
  //     console.error(
  //       'Password reset failed, please check your current password and try again.',
  //       error,
  //     );
  //   }
  // };
  const userResetPassword = async (data: ResetPasswordData) => {
    try {
      const { email, currentPassword, newPassword } = data;
      const res = await resetPassword({ email, currentPassword, newPassword });

      if (res) {
        window.localStorage.removeItem('token'); // 토큰 제거
        storeLogout(); // Zustand 상태 업데이트

        navigate('/login');
        alert('Password reset successful');
        navigate('/login'); // 비밀번호를 변경 성공 후 로그인 페이지로 이동
      }
    } catch (error) {
      console.error(
        'Password reset failed, please check your current password and try again.',
        error,
      );
    }
  };

  return { userLogin, userResetPassword };
};

export default useAuth;
