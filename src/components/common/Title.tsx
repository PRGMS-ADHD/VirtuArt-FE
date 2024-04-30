import { FC } from 'react';

interface TitleProps {
  text: string;
  boldText: string;
}

const Title: FC<TitleProps> = ({ text, boldText }) => {
  return (
    <div className="mb-4 flex h-auto w-auto items-center justify-center">
      <div className="font-noto-sans-kr text-4xl leading-normal text-black">
        <span className="font-light">{text}</span>
        <span className="font-bold">{boldText}</span>
      </div>
    </div>
  );
};

export default Title;
