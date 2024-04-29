import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ text, type, onClick }) => {
  return (
    <button
      type={type}
      className="h-[50px] w-[400px] flex-shrink-0 rounded-md bg-black font-helvetica text-base font-bold leading-normal text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
