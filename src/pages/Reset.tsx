import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Title from '../components/common/Title';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

type FormValues = {
  email: string;
  currentPassword: string;
  password: string;
  passwordConfirm?: string | null | undefined;
};

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  currentPassword: yup.string().required('Current password is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Need 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Need letter & number'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .nullable(),
});

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
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
        <div>
          <Input
            id="currentPassword"
            type="password"
            label="CURRENT PASSWORD"
            register={register('password')}
          />
          <p
            className={`text-sm ${errors.currentPassword ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
          >
            {errors.currentPassword?.message || 'Placeholder'}
          </p>
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="NEW PASSWORD"
            register={register('password')}
          />
          <p
            className={`text-sm ${errors.password ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
          >
            {errors.password?.message || 'Placeholder'}
          </p>
        </div>
        <div>
          <Input
            id="passwordConfirm"
            type="password"
            label="NEW PASSWORD CONFIRM"
            register={register('passwordConfirm')}
          />
          <p
            className={`text-sm ${errors.passwordConfirm ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
          >
            {errors.passwordConfirm?.message || 'Placeholder'}
          </p>
        </div>
        <div className="flex w-full flex-col">
          <Button text="JOIN" type="submit" />
          <div className="ml-auto mr-1 mt-2 flex justify-center font-helvetica text-xs">
            <p className="mr-5 text-gray-400">Already have an account?</p>
            <Link to="/login" className="text-customGray2">
              LOGIN
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Join;
