// import { useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useAuthStore } from '@/store/authStore';
// import { apiToggleLike, fetchUserLikedArtworks } from '../api/likes.api';
//
// const useLikeButtonArtWorks = (id: string | undefined) => {
//   const { token } = useAuthStore();
//   const [likedArtWorks, setLikedArtWorks] = useState<string[]>([]);
//   const isLiked = id ? likedArtWorks.includes(id) : false;
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
//           const likedArtWorksData = await fetchUserLikedArtworks(token);
//           const likedArtWorksIds = likedArtWorksData.map(
//             (artWork) => artWork._id,
//           );
//           setLikedArtWorks(likedArtWorksIds);
//         } catch (error) {
//           console.error('Error fetching liked artworks:', error);
//         }
//       }
//     };
//
//     fetchLikes();
//   }, [token, id]);
//
//   const handleLikeStatusChange = async () => {
//     const userEmail = getUserDetailsFromToken();
//     if (userEmail && id) {
//       try {
//         console.log('b');
//         const toggleResult = await apiToggleLike(token, 'artWork', id);
//         setLikedArtWorks((prev) => {
//           const newLikedArtWorks = prev.includes(id)
//             ? prev.filter((artWorkId) => artWorkId !== id)
//             : [...prev, id];
//           return newLikedArtWorks;
//         });
//         return toggleResult; // 좋아요 상태를 토글한 결과를 반환
//       } catch (error) {
//         console.error('Failed to update like status:', error);
//         return false;
//       }
//     } else {
//       alert('로그인이 필요합니다.');
//       return false;
//     }
//   };
//
//   return { isLiked, handleLikeStatusChange };
// };
//
// export default useLikeButtonArtWorks;
