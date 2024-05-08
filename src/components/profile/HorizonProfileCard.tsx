import React, { ReactNode } from 'react';
import ProfileTextArea from './ProfileTextArea';
import logo from '../../assets/test1.png';

interface HorizonProfileProps {
  children?: ReactNode;
}

const HorizonProfileCard: React.FC<HorizonProfileProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-customGray5 p-6">
      <div className="relative mt-16 flex flex-col 2xl:flex-row">
        <p className="absolute -left-1 -top-9 font-helveticaNeue text-xl">
          ARTIST
        </p>
        <img
          src={logo}
          alt="logo"
          className="shadow-profile-shadow h-28 w-28 rounded-full stroke-1 object-cover"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-4 font-noto-sans-kr text-3xl font-normal leading-normal text-black">
              정센트 반 희호
            </p>
            <p className="mr-4 font-noto-sans-kr text-sm font-normal leading-normal text-black">
              &nbsp;(Jeongcent Van Heeho)
            </p>
          </div>
          <div className="mr-3 flex gap-x-4">{children}</div>
        </div>
        <div className="hidden lg:block">
          <ProfileTextArea />
        </div>
      </div>
    </div>
  );
};
export default HorizonProfileCard;
