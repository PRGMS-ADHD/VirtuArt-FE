import React, { useEffect, useState } from 'react';
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
  const [likedArtists, setLikedArtists] = useState([]);
  const [likedWorks, setLikedWorks] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (token) {
        try {
          const works = await fetchUserLikedArtworks(token);
          setLikedWorks(works);
        } catch (error) {
          console.error('Failed to fetch liked artworks:', error);
        }
        try {
          const artists = await fetchUserLikedArtists(token);
          setLikedArtists(artists);
        } catch (error) {
          console.error('Failed to fetch liked artists:', error);
        }
      }
    };
    fetchLikes();
  }, [token]);

  if (!isLoggedIn) {
    return (
      <div className="flex w-full items-center justify-center gap-10">
        <LoginError />
      </div>
    );
  }

  return (
    <div className="mb-6 w-full">
      <div className="w-full">
        <UserProfileCard>{/*임시로 버튼 삭제*/}</UserProfileCard>
      </div>
      <div className="w-full">
        <LikedWorks works={likedWorks} />
        <LikedArtists artists={likedArtists} />
      </div>
    </div>
  );
};

export default MyPage;
