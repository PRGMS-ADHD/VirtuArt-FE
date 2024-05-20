import React, { ReactNode } from 'react';
import { ArtistModel } from '@/models/artist.model';
// import ProfileTextArea from './ProfileTextArea';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

interface HorizonProfileProps {
  children?: ReactNode;
  artist: ArtistModel | null;
}

const HorizonProfileCard: React.FC<HorizonProfileProps> = ({
  children,
  artist,
}) => {
  if (!artist) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center justify-center bg-customGray5 p-6">
      <div className="relative mt-16 flex flex-col 2xl:flex-row">
        <p className="absolute -left-1 -top-9 font-helveticaNeue text-xl">
          ARTIST
        </p>
        <Link to={`/artists/${artist._id}`}>
          {' '}
          {/* 이미지를 Link 컴포넌트로 감쌉니다. */}
          <img
            src={artist.profile_image || logo}
            alt="logo"
            className="h-28 w-28 rounded-full stroke-1 object-cover shadow-profile-shadow"
          />
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-4 font-noto-sans-kr text-3xl font-normal leading-normal text-black">
              {artist.name}
            </p>
            <p className="mr-4 font-noto-sans-kr text-sm font-normal leading-normal text-black">
              &nbsp;({artist.e_name})
            </p>
          </div>
          <div className="mr-3 flex gap-x-4">{children}</div>
        </div>
        <div className="hidden lg:block">
          {/* TODO <ProfileTextArea text={artist.intro} />*/}
        </div>
      </div>
    </div>
  );
};
export default HorizonProfileCard;
