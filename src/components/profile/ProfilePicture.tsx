import React from 'react';

interface ProfilePictureProps {
  src: string;
  className?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src, className }) => {
  return (
    <img
      src={src}
      alt="Profile"
      className={`shadow-custom-dark h-32 w-32 flex-shrink-0 rounded-full border-2 border-white fill-current stroke-gray-200 stroke-2 object-cover text-white drop-shadow filter ${className}`}
    />
  );
};

export default ProfilePicture;
