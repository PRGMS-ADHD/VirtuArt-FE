import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import logo from '../../../public/icon/logo.png';

// interface ExtendedError extends Error {
//   status?: number;
//   statusText?: string;
// }

function Error() {
  // const error = useRouteError() as ExtendedError;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <img src={logo} alt="logo" />
      <div className="text-center font-noto-sans-kr text-xl leading-8">
        <h1>Something went wrong!</h1>
        <p>We&#39;re sorry, there was an error loading your page.</p>
        {/*<p>{error?.statusText || error?.message}</p>*/}
      </div>
      <Button text="GO TO MAIN" type="button" onClick={() => navigate('/')} />
    </div>
  );
}

export default Error;
