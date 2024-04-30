import React from 'react';
import ProfileLinks from './ProfileLinks';
import ProfileTextArea from './ProfileTextArea';
import LikesButton from '../common/LikesButton';
import SettingsButton from '../common/SettingsButton';
import ProfilePicture from './ProfilePicture';
import logo from '../../assets/test1.png';

// export default ProfileCard;
// interface ProfileCardProps {
//   src: string;
//   name: string;
//   englishName: string;
//   onLikeClick?: () => void;
//   onSettingsClick?: () => void;
// }

const ProfileCard: React.FC = () => {
  return (
    <div className="relative flex h-[364px] w-[1304px] items-center justify-center">
      <div className="relative flex h-[256px] w-[1196px] flex-col justify-end border border-transparent">
        <ProfilePicture src={logo} />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-[80px] font-noto-sans-kr text-3xl font-normal leading-normal text-black">
              정센트 반 희호
            </p>
            <p className="font-noto-sans-kr text-sm font-normal leading-normal text-black">
              &nbsp;(Jeongcent Van Heeho)
            </p>
          </div>
          <div className="flex gap-x-4">
            <LikesButton />
            <SettingsButton />
          </div>
        </div>
        <ProfileLinks />
        <div className="flex flex-1 items-center justify-center">
          <ProfileTextArea />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
