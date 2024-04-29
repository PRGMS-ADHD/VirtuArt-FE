interface TitleProps {
  text: string;
  boldText: string;
}

function Title({ text, boldText }: TitleProps) {
  return (
    <div className="font-noto-sans-kr text-base leading-normal text-black">
      <span className="font-light">{text}</span>
      <span className="font-bold">{boldText}</span>
    </div>
  );
}

export default Title;
