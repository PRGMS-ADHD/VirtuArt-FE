// import React, { useState, useEffect } from 'react';
// import { faker } from '@faker-js/faker';
// import LoadMoreButton from '../common/LoadMoreButton';
// import errorPersonImg from '../../../public/errorImage/profile-circle.svg';
//
// const CollectorCard = ({ collector }) => (
//   <div>
//     <img
//       src={collector.profileImage}
//       alt={collector.nickname}
//       style={{
//         width: '120px',
//         height: '120px',
//         borderRadius: '50%',
//         marginBottom: '0.5rem',
//       }}
//       onError={(e) => {
//         e.currentTarget.onerror = null;
//         e.currentTarget.src = errorPersonImg;
//       }}
//     />
//     <div
//       style={{
//         maxWidth: '126px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         textAlign: 'center',
//         fontSize: '14/16rem',
//         fontFamily: 'Noto Sans KR',
//         color: '#777',
//       }}
//     >
//       {collector.nickname}
//     </div>
//   </div>
// );
//
// const Collectors: React.FC = () => {
//   const [visibleItems, setVisibleItems] = useState(18); // 처음에 9x2로 보여주기 위해 18로 설정
//   const [collectors, setCollectors] = useState([]);
//
//   useEffect(() => {
//     const handleResize = () => {
//       // 768px 미만에서는 4개 아이템만 보이도록 설정
//       if (window.innerWidth < 768) {
//         setVisibleItems(4);
//       } else {
//         // 그 외의 경우는 기존처럼 18개 아이템 보이도록 설정
//         setVisibleItems(18);
//       }
//     };
//
//     // 컴포넌트 마운트 시 한 번 실행
//     handleResize();
//
//     // 윈도우 크기가 변경될 때마다 실행
//     window.addEventListener('resize', handleResize);
//
//     // 컴포넌트 언마운트 시 이벤트 리스너 제거
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//
//   useEffect(() => {
//     const fetchCollectors = () => {
//       const dummyCollectors = Array.from({ length: 50 }, () => ({
//         // 50개의 가짜 데이터 생성
//         id: faker.datatype.uuid(),
//         profileImage: faker.image.avatar(),
//         nickname: faker.internet.userName(),
//       }));
//       setCollectors(dummyCollectors);
//     };
//
//     fetchCollectors();
//   }, []);
//
//   const handleLoadMore = () => {
//     setVisibleItems((prevVisibleItems) => {
//       if (prevVisibleItems >= collectors.length) {
//         return 18; // 초기 값으로 설정
//       }
//       const newVisibleItems = prevVisibleItems + 18;
//       return newVisibleItems > collectors.length
//         ? collectors.length
//         : newVisibleItems;
//     });
//   };
//
//   const isAllItemsVisible = collectors.length <= visibleItems;
//
//   return (
//     <div className="my-8 flex flex-col items-center justify-center px-8">
//       <div className="mx-4 border-b border-customGray6">
//         <div className="pt-8">
//           <p className="mb-1 ml-1 font-helveticaNeue text-xl">COLLECTORS</p>
//           <div className="mb-4 grid grid-cols-2 gap-11 transition-all duration-700 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9">
//             {collectors.slice(0, visibleItems).map((collector) => (
//               <CollectorCard key={collector.id} collector={collector} />
//             ))}
//           </div>
//         </div>
//         <LoadMoreButton
//           onClick={handleLoadMore}
//           isExpanded={isAllItemsVisible}
//         />
//       </div>
//     </div>
//   );
// };
//
// export default Collectors;
import React, { useEffect, useState } from 'react';
import { fetchArtistLikers } from '../../api/likes.api';

const Collectors: React.FC<{ artistId: string }> = ({ artistId }) => {
  const [collectors, setCollectors] = useState<
    { _id: string; username: string }[]
  >([]);

  useEffect(() => {
    const fetchCollectors = async () => {
      const likers = await fetchArtistLikers(artistId);
      setCollectors(likers);
    };

    fetchCollectors();
  }, [artistId]);

  return (
    <div>
      <h2>Collectors</h2>
      {collectors.length > 0 ? (
        <ul>
          {collectors.map(({ username, _id }) => (
            <li key={_id}>{username}</li>
          ))}
        </ul>
      ) : (
        <p>No collectors yet.</p>
      )}
    </div>
  );
};

export default Collectors;
