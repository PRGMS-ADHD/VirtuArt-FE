import { FC } from 'react';

interface TitleProps {
  text: string;
  boldText: string;
}

const Title: FC<TitleProps> = ({ text, boldText }) => {
  return (
    <div className="font-noto-sans-kr text-base leading-normal text-black">
      <span className="font-light">{text}</span>
      <span className="font-bold">{boldText}</span>
    </div>
  );
};

export default Title;
