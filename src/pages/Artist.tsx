import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLikeButton from '@/hooks/useLikeButton';

// Additional component imports
import Collectors from '@/components/collectors/Collectors';
import ArtistProfileCard from '@/components/profile/ArtistProfileCard';
import LikesCountButton from '../components/common/LikesCountButton';
import ArtWorks from '../components/artist/ArtWorks';

// API and model imports
import { ArtistModel } from '../models/artist.model';
import { fetchArtistById } from '../api/images.api';

import logo from '../../assets/logo.png';

// const Artist: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [artist, setArtist] = useState<ArtistType | null>(null);
//   const { token } = useAuthStore();
//   const [likedArtists, setLikedArtists] = useState<string[]>([]);
//
//   const getUserDetailsFromToken = () => {
//     if (!token) return null;
//     try {
//       const decoded = jwtDecode<any>(token);
//       return decoded.email;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return null;
//     }
//   };
//
//   useEffect(() => {
//     const fetchLikes = async () => {
//       const userEmail = getUserDetailsFromToken();
//       if (userEmail) {
//         try {
//           const likedArtistsData = await fetchUserLikes(userEmail);
//           setLikedArtists(likedArtistsData);
//         } catch (error) {
//           console.error('Error fetching liked artists:', error);
//         }
//       }
//     };
//
//     fetchLikes();
//   }, [token, id]); // 아티스트 ID가 변경될 때마다 좋아요 상태를 새로 가져옴
//
//   useEffect(() => {
//     const fetchArtistData = async () => {
//       try {
//         const artistData = await fetchArtistById(id);
//         setArtist(artistData);
//       } catch (error) {
//         console.error('작가 정보를 불러오는 데 실패했습니다:', error);
//       }
//     };
//
//     fetchArtistData();
//   }, [id]);
//
//   if (!artist) {
//     return <div>Loading...</div>;
//   }
//
//   const isLiked = likedArtists.includes(id);
//
//   const handleLikeStatusChange = async () => {
//     const userEmail = getUserDetailsFromToken();
//     if (userEmail && id) {
//       try {
//         const toggleResult = await apiToggleLike(token, 'artist', id);
//         setLikedArtists((prev) => {
//           const newLikedArtists = prev.includes(id)
//             ? prev.filter((artistId) => artistId !== id)
//             : [...prev, id];
//           return newLikedArtists;
//         });
//         // 좋아요 수 업데이트
//         setArtist((prev) => {
//           if (prev) {
//             return {
//               ...prev,
//               likes: toggleResult ? prev.likes + 1 : prev.likes - 1,
//             };
//           }
//           return prev;
//         });
//       } catch (error) {
//         console.error('Failed to update like status:', error);
//       }
//     } else {
//       alert('로그인이 필요합니다.');
//     }
//   };
//   return (
//     <div>
//       <ArtistProfileCard artist={artist}>
//         <LikesCountButton
//           likes={artist.likes}
//           isLiked={isLiked}
//           onLikeStatusChange={handleLikeStatusChange}
//         />
//       </ArtistProfileCard>
//       <div>
//         <ArtWorks />
//         <Collectors />
//       </div>
//     </div>
//   );
// };
//
// export default Artist;

// const Artist: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [artist, setArtist] = useState<ArtistType | null>(null);
//
//   const { isLiked, handleLikeStatusChange } = useLikeButton(id); // 커스텀 훅 사용
//
//   useEffect(() => {
//     const fetchArtistData = async () => {
//       try {
//         const artistData = await fetchArtistById(id);
//         setArtist(artistData);
//       } catch (error) {
//         console.error('작가 정보를 불러오는 데 실패했습니다:', error);
//       }
//     };
//
//     fetchArtistData();
//   }, [id]);
//
//   if (!id) {
//     return null;
//   } // TODO : 있어야하는 코드인가?
//
//   if (!artist) {
//     return <div>Loading...</div>;
//   }
//
//   const handleLikeButtonClick = async () => {
//     const toggleResult = await handleLikeStatusChange();
//     setArtist((prev) => {
//       if (prev) {
//         return {
//           ...prev,
//           likes: toggleResult ? prev.likes + 1 : prev.likes - 1,
//         };
//       }
//       return prev;
//     });
//   };
//
//   return (
//     <div>
//       <ArtistProfileCard artist={artist}>
//         <LikesCountButton
//           likes={artist.likes}
//           isLiked={isLiked}
//           onLikeStatusChange={handleLikeButtonClick}
//         />
//       </ArtistProfileCard>
//       <div>
//         <ArtWorks />
//         <Collectors artistId={id} />
//       </div>
//     </div>
//   );
// };
//
// export default Artist;
const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistModel | null>(null);

  // 아티스트에 대한 좋아요 상태 가져옴
  const { isLiked, handleLikeStatusChange } = useLikeButton(id);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistData = await fetchArtistById(id);
        setArtist(artistData);
      } catch (error) {
        console.error('작가 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchArtistData();
  }, [id]);

  if (!id) {
    return null;
  }

  if (!artist) {
    return <div>Loading...</div>;
  }

  const handleLikeButtonClick = async () => {
    const toggleResult = await handleLikeStatusChange();
    setArtist((prev) => {
      if (prev) {
        return {
          ...prev,
          likes: toggleResult ? prev.likes + 1 : prev.likes - 1,
        };
      }
      return prev;
    });
  };

  return (
    <div>
      <ArtistProfileCard artist={artist}>
        <LikesCountButton
          likes={artist.likes}
          isLiked={isLiked}
          onLikeStatusChange={handleLikeButtonClick}
        />
      </ArtistProfileCard>
      <div>
        <ArtWorks artist={artist} errorImage={logo} />
        <Collectors artistId={id} />
      </div>
    </div>
  );
};

export default Artist;
