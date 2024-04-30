import React from 'react';

interface ProfilePictureProps {
  src: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt="Profile"
      className="img-shadow absolute left-[-54px] top-[-54px] h-[126px] w-[126px] rounded-full border-2 border-white object-cover"
    />
  );
};

export default ProfilePicture;
