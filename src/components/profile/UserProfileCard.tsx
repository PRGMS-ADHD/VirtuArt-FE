import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { getUserInfo } from '@/api/auth.api';
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  editUsername,
  uploadProfileImage,
  fetchProfileImage,
  fetchCoverImage,
  uploadCoverImage,
} from '@/api/user.api';
import ProfileLinks from './ProfileLinks';
import ProfileTextArea from './ProfileTextArea';
import ProfilePicture from './ProfilePicture';
import logo from '../../../assets/logo.png';
import image from '../../../assets/image1.jpeg';

interface User {
  username: string;
  email: string;
  id: string;
  intro: string;
  profile_image: string;
  cover_image: string;
}

interface UserProfileCardProps {
  children?: ReactNode;
}

interface DecodedToken extends JwtPayload {
  email: string;
}

const userSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters long'),
});

type UserFormData = z.infer<typeof userSchema>;

const UserProfileCard: React.FC<UserProfileCardProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImageClick = () => {
    coverFileInputRef.current?.click();
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        await uploadProfileImage(user.email, file); // 이미지를 업로드합니다.
        const profileImageUrl = await fetchProfileImage(user.email); // 새 프로필 이미지 URL을 가져옵니다.
        setUser({ ...user, profile_image: profileImageUrl }); // user 상태를 업데이트합니다.
      } catch (error) {
        console.error('Failed to upload profile image', error);
      }
    }
  };

  const handleCoverFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        await uploadCoverImage(user.email, file); // 이미지를 업로드합니다.
        const coverImageUrl = await fetchCoverImage(user.email); // 새 커버 이미지 URL을 가져옵니다.
        setUser({ ...user, cover_image: coverImageUrl }); // user 상태를 업데이트합니다.
      } catch (error) {
        console.error('Failed to upload cover image', error);
      }
    }
  };

  useEffect(() => {
    setEditUser(user);
  }, [user, isEditing]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = window.localStorage.getItem('token');
  //     if (token) {
  //       const decoded: DecodedToken = jwtDecode(token);
  //       const { email } = decoded;
  //
  //       try {
  //         const data = await getUserInfo(email);
  //         setUser(data);
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //     }
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const { email } = decoded;

        try {
          const data = await getUserInfo(email);
          const profileImageUrl = await fetchProfileImage(email);
          const coverImageUrl = await fetchCoverImage(email);
          setUser({
            ...data,
            profile_image: profileImageUrl,
            cover_image: coverImageUrl,
          });
          // setUser(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditUser(user);
    setIsEditing(false);
  };

  const handleSaveClick = async (data: UserFormData) => {
    const token = window.localStorage.getItem('token');
    if (token && user) {
      const decoded: DecodedToken = jwtDecode(token);
      try {
        await editUsername(decoded.email, data.username);
        setUser({ ...user, username: data.username });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to edit username', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={user?.cover_image || image}
        key={user?.profile_image}
        alt="Cover image"
        className="h-40 w-full cursor-pointer object-cover opacity-60 custom:h-72"
        onClick={handleCoverImageClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={coverFileInputRef}
        style={{ display: 'none' }}
        onChange={handleCoverFileChange}
      />
      <div className="relative flex w-full max-w-screen-lg flex-col justify-end custom:h-64 ">
        <ProfilePicture
          key={user?.profile_image} // user 상태를 key 속성에 바인딩
          src={user?.profile_image || logo}
          className="absolute bottom-36 left-2 cursor-pointer custom:left-[-3.375rem] custom:top-[-3.375rem]"
          onClick={handleProfilePictureClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            {isEditing ? (
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex items-center"
              >
                <input
                  {...register('username')}
                  className="ml-36 inline-block max-w-[5rem] font-noto-sans-kr text-3xl font-normal text-black custom:ml-20"
                  defaultValue={editUser?.username}
                />
                <button type="submit">
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button type="button" onClick={handleCancelClick}>
                  <XMarkIcon className="ml-2 h-5 w-5" />
                </button>
                {errors.username && (
                  <p className="ml-2 text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </form>
            ) : (
              <div className="flex items-center">
                <p className="fonnamet-noto-sans-kr ml-36 text-3xl font-normal text-black custom:ml-20">
                  {user?.username || 'Loading..'}
                </p>
                <button
                  type="button"
                  className="ml-4"
                  onClick={handleEditClick}
                >
                  <PencilSquareIcon className="h-5 w-5 fill-customGray3" />
                </button>
              </div>
            )}
          </div>
          <div className="mr-2 flex gap-x-4 sm:mr-2 custom:mr-0">
            {children}
          </div>
        </div>
        <ProfileLinks />
        <div className="flex flex-1 items-center justify-center">
          {isEditing ? (
            <ProfileTextArea
              text={editUser?.intro}
              onChange={(newIntro) =>
                setEditUser({ ...editUser, intro: newIntro } as User)
              }
            />
          ) : (
            <ProfileTextArea text={user?.intro} onChange={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
