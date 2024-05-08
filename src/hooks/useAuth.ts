import login from '../api/auth.api';
import { LoginData } from '../models/user.model';

const useAuth = () => {
  const userLogin = async (data: LoginData) => {
    try {
      const res = await login(data);
      console.log(res);
    } catch (error) {
      console.error(
        'Login failed, please check your password and try again.',
        error,
      );
    }
  };

  return { userLogin };
};

export default useAuth;
