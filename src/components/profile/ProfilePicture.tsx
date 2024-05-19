import React from 'react';

interface ProfilePictureProps {
  src: string;
  className?: string;
  onClick?: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  className,
  onClick,
}) => {
  return (
    <img
      src={src}
      alt="Profile"
      className={`h-32 w-32 flex-shrink-0 rounded-full border-2 border-white fill-current stroke-gray-200 stroke-2 object-cover text-white shadow-custom-dark drop-shadow filter ${className} `}
      onClick={onClick}
    />
  );
};

export default ProfilePicture;
