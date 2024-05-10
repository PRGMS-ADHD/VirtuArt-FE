import React, { ReactNode, useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { getUserInfo } from '@/api/auth.api';
import ProfileLinks from './ProfileLinks';
import ProfileTextArea from './ProfileTextArea';
import ProfilePicture from './ProfilePicture';
import logo from '../../assets/test1.png';
import image from '../../assets/image1.jpeg';

interface User {
  username: string;
  email: string;
  id: string;
}

interface UserProfileCardProps {
  children?: ReactNode;
}

interface DecodedToken extends JwtPayload {
  email: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const { email } = decoded;

        try {
          const data = await getUserInfo(email);
          setUser(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={image}
        alt="image1.png"
        className="h-[330px] w-[1920px] object-cover opacity-60"
      />
      <div className="relative flex h-[256px] w-[1196px] flex-col justify-end">
        <ProfilePicture
          src={logo}
          className="absolute left-[-54px] top-[-54px]"
        />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <p className="ml-[80px] font-noto-sans-kr text-3xl font-normal leading-normal text-black">
              {user?.username}
            </p>
          </div>
          <div className="flex gap-x-4">{children}</div>
        </div>
        <ProfileLinks />
        <div className="flex flex-1 items-center justify-center">
          <ProfileTextArea />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
