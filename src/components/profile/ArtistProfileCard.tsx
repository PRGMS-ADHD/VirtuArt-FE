import React, { ReactNode } from 'react';
import { ArtistModel } from '@/models/artist.model';
import ArtistProfileLinks from '@/components/profile/ArtistProfileLinks';
import ProfileTextArea from '@/components/profile/ProfileTextArea';
import ProfilePicture from './ProfilePicture';
import image from '../../../assets/image3.jpeg';

interface ArtistProfileCardProps {
  children?: ReactNode;
  artist: ArtistModel;
}

const ArtistProfile: React.FC<ArtistProfileCardProps> = ({
  children,
  artist,
}) => {
  const handleTextChange = (text: string) => {
    console.log(text);
  }; // TODO: 임시 함수

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={image}
        alt="image1.png"
        className="h-40 w-full cursor-pointer object-cover opacity-60 custom:h-72"
      />
      <div className="relative flex w-full max-w-screen-lg flex-col justify-end custom:h-64 ">
        <ProfilePicture
          src={artist.profile_image}
          className="absolute bottom-36 left-2 cursor-pointer custom:left-[-3.375rem] custom:top-[-3.375rem]"
        />
        <div className="mt-6 flex items-center justify-between p-4">
          <div className="flex items-center">
            <p className="ml-32 font-noto-sans-kr text-3xl font-normal text-black custom:ml-20">
              {artist.name || 'Loading..'}
            </p>
            <p className="font-noto-sans-kr text-base font-normal leading-normal text-black sm:block custom:block hidden">
              &nbsp;({artist.e_name})
            </p>
          </div>
          <div className="flex gap-x-4">{children}</div>
        </div>
        <ArtistProfileLinks artist={artist} />
        <div className="flex flex-1 items-center justify-center">
          <ProfileTextArea text={artist.intro} onChange={handleTextChange} />
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
