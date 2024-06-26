import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import Title from '../components/common/Title';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import React from 'react';
import { useAuthStore } from '@/store/authStore.ts';
import { jwtDecode } from 'jwt-decode';

type FormValues = {
  email: string;
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

const schema = z
  .object({
    email: z.string().email('Invalid email'),
    currentPassword: z.string().min(1, 'password is required'),
    newPassword: z
      .string()
      .min(8, 'Need 8 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Need 1 letter & 1 number',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

function Reset() {
  const token = useAuthStore((state) => state.token); // 토큰 가져오기
  const email = token ? jwtDecode<{ email: string }>(token).email : ''; // 토큰 디코드하여 이메일 가져오기

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
  });

  React.useEffect(() => {
    setValue('email', email); // 이메일 필드에 이메일 설정
  }, [email, setValue]);

  const { userResetPassword } = useAuth();

  const onSubmit = async (data: FormValues) => {
    console.log('onSubmit called', data);
    const { passwordConfirm, ...resetPasswordData } = data;
    await userResetPassword(resetPasswordData);
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-6"
      >
        <Title text="VIRTU" boldText="ART" />
        <div>
          <input
            id="email"
            type="email"
            {...register('email', {
              disabled: true,
            })}
            className="h-12 w-[23rem] rounded-md border border-gray-700 bg-customGray4 pl-5 font-[Helvetica] text-base font-normal leading-normal text-black opacity-100"
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
            register={register('currentPassword')}
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
            register={register('newPassword')}
          />
          <p
            className={`text-sm ${errors.newPassword ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10.5px] font-light`}
          >
            {errors.newPassword?.message || 'Placeholder'}
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
          <Button text="RESET PASSWORD" type="submit" />
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

export default Reset;
