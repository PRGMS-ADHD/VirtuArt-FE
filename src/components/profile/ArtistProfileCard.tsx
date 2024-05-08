import React, { ReactNode } from 'react';
import { Artist } from '@/models/artist.model';
import ProfileLinks from './ProfileLinks';
import ProfileTextArea from './ProfileTextArea';
import ProfilePicture from './ProfilePicture';
import image from '../../assets/image1.jpeg';

// export default ProfileCard;
// interface ProfileCardProps {
//   src: string;
//   name: string;
//   englishName: string;
//   onLikeClick?: () => void;
//   onSettingsClick?: () => void;
// }

interface ArtistProfileCardProps {
  children?: ReactNode;
  artist: Artist;
}

const ArtistProfile: React.FC<ArtistProfileCardProps> = ({
  children,
  artist,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={image}
        alt="image1.png"
        className="h-[330px] w-[1920px] object-cover opacity-60"
      />
      <div className="relative flex h-[256px] w-[1196px] flex-col justify-end">
        <ProfilePicture
          src={artist.profile_image}
          className="absolute left-[-54px] top-[-54px]"
        />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-[80px] font-noto-sans-kr text-3xl font-normal leading-normal text-black">
              {artist.name}
            </p>
            <p className="font-noto-sans-kr text-base font-normal leading-normal text-black">
              &nbsp;({artist.e_name})
            </p>
          </div>
          <div className="flex gap-x-4">{children}</div>
        </div>
        <ProfileLinks />
        <div className="flex flex-1 items-center justify-center">
          <ProfileTextArea text={artist.intro} />
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
