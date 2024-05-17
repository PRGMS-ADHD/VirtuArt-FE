// import React, { useEffect, useState } from 'react';
// import LoginError from '@/components/common/LoginError';
// import UserProfileCard from '../components/profile/UserProfileCard';
// import LikedWorks from '../components/myPage/LikedWorks';
// import LikedArtists from '../components/myPage/LikedArtists';
// import LikesCountButton from '../components/common/LikesCountButton';
// import SettingsButton from '../components/common/SettingsButton';
//
// const MyPage: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//   useEffect(() => {
//     const token = window.localStorage.getItem('token');
//     setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
//   }, []);
//
//   if (!isLoggedIn) {
//     return (
//       <div className="flex items-center gap-10">
//         <LoginError />
//       </div>
//     );
//   }
//
//   return (
//     <div className="mb-6">
//       <div className="flex justify-center">
//         <UserProfileCard>
//           <LikesCountButton />
//           <SettingsButton />
//         </UserProfileCard>
//       </div>
//       <div>
//         <LikedWorks />
//         <LikedArtists />
//       </div>
//     </div>
//   );
// };
//
// export default MyPage;

import React, { useEffect, useState } from 'react';
import LoginError from '@/components/common/LoginError';
import UserProfileCard from '../components/profile/UserProfileCard';
import LikedWorks from '../components/myPage/LikedWorks';
import LikedArtists from '../components/myPage/LikedArtists';

const MyPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLiked, setIsLiked] = useState(false); // 좋아요 상태

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 확인
    const token = window.localStorage.getItem('token');
    // 토큰이 있으면 true, 없으면 false로 상태 업데이트
    setIsLoggedIn(!!token);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex w-full items-center justify-center gap-10">
        <LoginError />
      </div>
    );
  }

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  //   // 좋아요 수 증가 또는 감소 로직 추가
  // };

  return (
    <div className="mb-6 w-full">
      <div className="w-full">
        <UserProfileCard>{/*임시로 버튼 삭제*/}</UserProfileCard>
      </div>
      <div className="w-full">
        <LikedWorks />
        <LikedArtists />
      </div>
    </div>
  );
};

export default MyPage;
