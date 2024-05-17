import React, { useEffect, useState } from 'react';
import { ArtistModel } from '@/models/artist.model';
import { useNavigate } from 'react-router-dom';
import { fetchUserLikedArtists } from '../../api/likes.api';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

const LikedArtists: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // 사용자 토큰 상태
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const getLikedArtists = async () => {
      if (token) {
        try {
          const likedArtists = await fetchUserLikedArtists(token);
          setArtists(likedArtists);
        } catch (error) {
          console.error('Failed to fetch liked artists:', error);
        }
      }
    };
    getLikedArtists();
  }, [token]);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 flex flex-col items-center justify-center px-8">
      <div className="border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">LIKED ARTISTS</p>
          <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
            {artists.map((artist) => (
              <div
                key={artist._id}
                className="relative cursor-pointer"
                onClick={() => navigate(`/artists/${artist._id}`)}
              >
                {artist.profile_image ? (
                  <img
                    src={artist.profile_image}
                    className="h-[200px] w-[350px] object-cover transition-all duration-700"
                  />
                ) : (
                  <img
                    src={errorImage}
                    alt="errorImage"
                    className="h-[200px] w-[350px] object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedArtists;
