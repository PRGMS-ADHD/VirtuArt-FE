import React from 'react';
import UserProfileCard from '../components/profile/UserProfileCard';
import LikedWorks from '../components/myPage/LikedWorks';
import LikedArtists from '../components/myPage/LikedArtists';
import LikesCountButton from '../components/common/LikesCountButton.tsx';
import SettingsButton from '../components/common/SettingsButton';

const MyPage: React.FC = () => {
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
