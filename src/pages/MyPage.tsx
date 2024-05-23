import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoginError from '@/components/common/LoginError';
import UserProfileCard from '../components/profile/UserProfileCard';
import LikedWorks from '../components/myPage/LikedWorks';
import LikedArtists from '../components/myPage/LikedArtists';
import {
  fetchUserLikedArtists,
  fetchUserLikedArtworks,
} from '../api/likes.api';
import { useAuthStore } from '../store/authStore';

const MyPage: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const token = useAuthStore((state) => state.token);

  const {
    data: likedWorks,
    isLoading: isLoadingWorks,
    isError: isErrorWorks,
    error: errorWorks,
  } = useQuery({
    queryKey: ['likedWorks', token],
    queryFn: () => fetchUserLikedArtworks(token),
    enabled: !!token,
  });

  const {
    data: likedArtists,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
  } = useQuery({
    queryKey: ['likedArtists', token],
    queryFn: () => fetchUserLikedArtists(token),
    enabled: !!token,
  });

  if (!isLoggedIn) {
    return (
      <div className="flex w-full items-center justify-center gap-10">
        <LoginError />
      </div>
    );
  }

  if (isLoadingWorks || isLoadingArtists) {
    return <div>Loading...</div>;
  }

  if (isErrorWorks || isErrorArtists) {
    return (
      <div>
        Error loading data: {errorWorks?.message || errorArtists?.message}.
        Please try again later.
      </div>
    );
  }

  return (
    <div className="mb-6 w-full">
      <div className="w-full">
        <UserProfileCard />
      </div>
      <div>
        <LikedWorks works={likedWorks || []} isLoading={isLoadingWorks} />
        <LikedArtists
          artists={likedArtists || []}
          isLoading={isLoadingArtists}
        />
      </div>
    </div>
  );
};
//   return (
//     <div className="mb-6 w-full">
//       <div className="w-full">
//         <UserProfileCard />
//       </div>
//       <div>
//         <LikedWorks works={likedWorks} isLoading={isLoadingWorks} />
//         <LikedArtists artists={likedArtists} />
//       </div>
//     </div>
//   );
// };

export default MyPage;
