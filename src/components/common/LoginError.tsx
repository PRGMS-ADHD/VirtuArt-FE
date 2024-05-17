import { useNavigate } from 'react-router-dom';
import logo from '../../../public/icon/logo.png';
import Button from './Button';

function LoginError() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-10">
      <img src={logo} alt="logo" />
      <p className="font-noto-sans-kr text-xl">This page requires login!</p>
      <Button
        text="GO TO LOGIN"
        type="button"
        onClick={() => navigate('/login')}
      />
    </div>
  );
}

export default LoginError;
