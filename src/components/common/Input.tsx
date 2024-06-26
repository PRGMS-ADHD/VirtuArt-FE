import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: string;
  label: string;
  id: string;
  register: UseFormRegisterReturn;
}

const Input: FC<InputProps> = ({ type, label, id, register }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="-mt-7 mb-2 ml-1 font-helvetica text-base font-light leading-normal text-customGray"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        ref={register.ref}
        onChange={register.onChange}
        onBlur={register.onBlur}
        name={register.name}
        className="h-12 w-[23rem] rounded-md border border-gray-700 bg-inputBg pl-5 font-[Helvetica] text-base font-normal leading-normal text-black opacity-100"
      />
    </div>
  );
};

export default Input;
