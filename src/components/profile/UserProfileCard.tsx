import React, { useEffect, useState } from 'react';
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
import { UserData } from '../../models/user.model';
import ProfileLinks from './ProfileLinks';
import ProfileTextArea from './ProfileTextArea';
import ProfilePicture from './ProfilePicture';
import defaultProfileImage from '../../../assets/logo.png';
import defaultCoverImage from '../../../assets/image3.jpeg';

interface DecodedToken extends JwtPayload {
  email: string;
}

const userSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters long'),
});

type UserFormData = z.infer<typeof userSchema>;

const UserProfileCard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const coverFileInputRef = React.useRef<HTMLInputElement>(null);

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
        await uploadProfileImage(user.email, file);
        const newProfileImageUrl = await fetchProfileImage(user.email);
        setUser({ ...user, profile_image: newProfileImageUrl });
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
        await uploadCoverImage(user.email, file);
        const newCoverImage = await fetchCoverImage(user.email);
        setUser({ ...user, cover_image: newCoverImage });
      } catch (error) {
        console.error('Failed to upload cover image', error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const { email } = decoded;

        try {
          const userData = await getUserInfo(email);
          setUser(userData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (user) {
        try {
          const fetchedProfileImageUrl = await fetchProfileImage(user.email);
          const fetchedCoverImageUrl = await fetchCoverImage(user.email);
          setProfileImageUrl(fetchedProfileImageUrl);
          setCoverImageUrl(fetchedCoverImageUrl);
        } catch (error) {
          console.error('Error:', error);
          setProfileImageUrl(defaultProfileImage);
          setCoverImageUrl(defaultCoverImage);
        }
      }
    };

    fetchImages();
  }, [user]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     if (user) {
  //       try {
  //         const profileImageUrl = await fetchProfileImage(user.email);
  //         const coverImageUrl = await fetchCoverImage(user.email);
  //         setUser({
  //           ...user,
  //           profile_image: profileImageUrl,
  //           cover_image: coverImageUrl,
  //         });
  //       } catch (error) {
  //         console.error('Error:', error);
  //         setUser({
  //           ...user,
  //           profile_image: defaultProfileImage,
  //           cover_image: defaultCoverImage,
  //         });
  //       }
  //     }
  //   };
  //
  //   fetchImages();
  // }, [user]);

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
        src={coverImageUrl || defaultCoverImage}
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
          key={profileImageUrl || ''}
          src={profileImageUrl || defaultProfileImage}
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
                  defaultValue={user?.username}
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
                  {user?.username || 'name'}
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
            {/* 여기에 다른 컴포넌트를 렌더링합니다. */}
          </div>
        </div>
        <ProfileLinks />
        <div className="flex flex-1 items-center justify-center">
          {isEditing ? (
            <ProfileTextArea
              text={user?.intro || ''}
              onChange={(newIntro) =>
                setUser({ ...user, intro: newIntro } as UserData)
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
