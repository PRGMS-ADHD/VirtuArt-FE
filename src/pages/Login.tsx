import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Title from '../components/common/Title';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

type FormData = {
  email: string;
  password: string;
};

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Need 1 letter & 1 number',
    ),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // submit 확인
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6"
      >
        <Title text="VIRTU" boldText="ART" />
        <div>
          <Input
            id="email"
            type="email"
            label="EMAIL"
            register={register('email')}
          />
          <p
            className={`text-sm ${errors.email ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
          >
            {errors.email?.message || 'Placeholder'}
          </p>
        </div>
        <div className="flex w-full flex-col">
          <div>
            <Input
              id="password"
              type="password"
              label="PASSWORD"
              register={register('password')}
            />
            <div className="flex items-center justify-between">
              <p
                className={`text-sm ${errors.password ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
              >
                {errors.password?.message || 'Placeholder'}
              </p>
              <Link
                to="/"
                className="ml-auto mr-2 mt-2 font-helvetica text-xs text-customGray2"
              >
                FORGOT PASSWORD?
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Button text="LOGIN" type="submit" />
          <div className="ml-auto mr-1 mt-2 flex justify-center font-helvetica text-xs">
            <p className="mr-5 font-helvetica text-customGray4">
              Don&#39;t have an account?
            </p>
            <Link to="/join" className="font-helvetica text-customGray2">
              SIGN UP
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
