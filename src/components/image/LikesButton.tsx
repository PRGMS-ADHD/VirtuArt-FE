import { IoMdHeartEmpty } from 'react-icons/io';

const LikesButton = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[30px] w-[30px]">
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white bg-opacity-75">
          <IoMdHeartEmpty className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default LikesButton;
