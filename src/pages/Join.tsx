import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Title from '../components/common/Title';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const schema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    nickname: z.string().min(1, 'Nickname is required'),
    password: z
      .string()
      .min(8, 'Need 8 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Need 1 letter & 1 number',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="flex h-full items-center justify-center">
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
            className={`text-sm ${errors.email ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[8px] font-light`}
          >
            {errors.email?.message || 'Placeholder'}
          </p>
        </div>
        <div>
          <Input
            id="nickname"
            type="text"
            label="NICKNAME"
            register={register('nickname')}
          />
          <p
            className={`text-sm ${errors.nickname ? 'text-red-500' : 'text-transparent'} ml-1 mt-1 font-helvetica text-[10px] font-light`}
          >
            {errors.nickname?.message || 'Placeholder'}
          </p>
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="PASSWORD"
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
            label="PASSWORD CONFIRM"
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
            <Link to="/signup" className="text-customGray2">
              LOGIN
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Join;
