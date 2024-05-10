import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from '../components/profile/UserProfileCard';
import LikedWorks from '../components/myPage/LikedWorks';
import LikedArtists from '../components/myPage/LikedArtists';
import LikesCountButton from '../components/common/LikesCountButton';
import SettingsButton from '../components/common/SettingsButton';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        로그인이 필요합니다.{' '}
        <button type="button" onClick={() => navigate('/login')}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-center">
        <UserProfileCard>
          <LikesCountButton />
          <SettingsButton />
        </UserProfileCard>
      </div>
      <div>
        <LikedWorks />
        <LikedArtists />
      </div>
    </div>
  );
};

export default MyPage;
