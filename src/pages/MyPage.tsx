import React, { useState } from 'react';
import image from '../assets/image1.jpeg';
import UserProfileCard from '../components/profile/UserProfileCard';
import UserArtPieceLikes from '../data/userArtPieceLike';
import LoadMoreButton from '../components/common/LoadMoreButton';

const MyPage: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState(8);
  const [visibleArtists, setVisibleArtists] = useState(8);
  const userImages = UserArtPieceLikes.filter((like) => like.userId === 1);

  const handleLoadMore = () => {
    if (userImages.length <= visibleImages) {
      setVisibleImages(8); // Reset to initial value
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
        <div className="bg-customGray5 my-6 flex flex-col items-center justify-center">
          <div className="border-b-1 border-customGray6 mx-auto w-5/6">
            <div className="px-8 pt-8">
              <p className="font-helveticaNeue mb-1 ml-1">LIKED WORKS</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                }}
              >
                {userImages.slice(0, visibleImages).map((like) => (
                  <img
                    key={like.id}
                    src={like.imageUrl}
                    alt={`Art Piece ${like.artPieceId}`}
                    style={{
                      width: '376px',
                      height: '211px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
            </div>
            <LoadMoreButton
              onClick={handleLoadMore}
              style={{
                position: 'relative',
                transform: 'translateY(50%)',
                margin: 'auto',
              }}
              isExpanded={isAllImagesVisible}
            />
          </div>
        </div>
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="border-b-1 border-customGray6 mx-auto w-5/6">
            <div className="px-8 pt-8">
              <p className="font-helveticaNeue mb-1 ml-1">LIKED ARTISTS</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                }}
              >
                {userImages.slice(0, visibleArtists).map((like) => (
                  <img
                    key={like.id}
                    src={like.imageUrl}
                    alt={`Art Piece ${like.artPieceId}`}
                    style={{
                      width: '376px',
                      height: '211px',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
            </div>
            <LoadMoreButton
              onClick={handleLoadMoreArtists}
              style={{
                position: 'relative',
                transform: 'translateY(50%)',
                margin: 'auto',
              }}
              isExpanded={isAllArtistsVisible}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
