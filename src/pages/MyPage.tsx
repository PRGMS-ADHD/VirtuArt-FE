import React, { useState } from 'react';
import image from '../assets/image1.jpeg';
import UserProfileCard from '../components/profile/UserProfileCard';
import UserArtPieceLikes from '../data/userArtPieceLike';
import LikedSection from '../components/myPage/LikedSection';
import { ArtPieceLike } from '../models/user.model';

const MyPage: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState(8);
  const [visibleArtists, setVisibleArtists] = useState(8);
  const userImages: ArtPieceLike[] = UserArtPieceLikes.filter(
    (like) => like.userId === 1,
  );

  const handleLoadMore = () => {
    if (userImages.length <= visibleImages) {
      setVisibleImages(8);
    } else {
      setVisibleImages(visibleImages + 8);
    }
  };

  const handleLoadMoreArtists = () => {
    if (userImages.length <= visibleArtists) {
      setVisibleArtists(8);
    } else {
      setVisibleArtists(visibleArtists + 8);
    }
  };

  const isAllImagesVisible = userImages.length <= visibleImages;
  const isAllArtistsVisible = userImages.length <= visibleArtists;

  return (
    <div className="mb-6">
      <img
        src={image}
        alt="image1.png"
        className="h-[330px] w-[1920px] object-cover opacity-60"
      />
      <div className="flex justify-center">
        <UserProfileCard />
      </div>
      <div>
        <LikedSection
          title="LIKED WORKS"
          userImages={userImages}
          visibleCount={visibleImages}
          handleLoadMore={handleLoadMore}
          isExpanded={isAllImagesVisible}
          backgroundColor="bg-customGray5"
        />
        <LikedSection
          title="LIKED ARTISTS"
          userImages={userImages}
          visibleCount={visibleArtists}
          handleLoadMore={handleLoadMoreArtists}
          isExpanded={isAllArtistsVisible}
        />
      </div>
    </div>
  );
};

export default MyPage;
