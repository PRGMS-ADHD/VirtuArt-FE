// // import { fetchArtists } from '@/api/images.api';
// // import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';
// // import errorImage from '../../../public/errorImage/artErrorImg.jpg';
// //
// // const LikedWorks: React.FC = () => {
// //   return (
// //     <FetchAndDisplayGrid
// //       title="LIKED WORKS"
// //       fetchFunction={fetchArtists}
// //       errorImage={errorImage}
// //       className="bg-customGray5"
// //       showLikesButton={false}
// //     />
// //   );
// // };
// //
// // export default LikedWorks;
// import React, { useEffect, useState } from 'react';
// import { fetchUserLikedArtworks } from '../../api/likes.api';
// import FetchAndDisplayGrid from '../common/FetchAndDisplayGrid';
// import errorImage from '../../../public/errorImage/artErrorImg.jpg';
//
// const LikedWorks: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null); // 사용자 토큰 상태
//
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);
//
//   if (!token) {
//     return <div>Loading...</div>;
//   }
//
//   return (
//     <FetchAndDisplayGrid
//       title="LIKED WORKS"
//       fetchFunction={() => fetchUserLikedArtworks(token)}
//       errorImage={errorImage}
//       showLikesButton={false}
//     />
//   );
// };
//
// export default LikedWorks;

//
// import React, { useEffect, useState } from 'react';
// import { fetchUserLikedArtworks } from '../../api/likes.api';
// import errorImage from '../../../public/errorImage/artErrorImg.jpg';
//
// const LikedWorks: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null); // 사용자 토큰 상태
//   const [likedWorks, setLikedWorks] = useState<any[]>([]); // 좋아요 누른 작품 상태
//
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);
//
//   useEffect(() => {
//     const fetchWorks = async () => {
//       if (token) {
//         try {
//           const works = await fetchUserLikedArtworks(token);
//           setLikedWorks(works);
//           console.log(works);
//         } catch (error) {
//           console.error('Error fetching liked artworks:', error);
//         }
//       }
//     };
//     fetchWorks();
//   }, [token]);
//
//   if (!token) {
//     return <div>Loading...</div>;
//   }
//
//   return (
//     <div>
//       <h2>LIKED WORKS</h2>
//       <div>
//         {likedWorks.map((work) => (
//           <div key={work._id}>
//             {work.image ? (
//               <img src={work.image} alt={work.name} />
//             ) : (
//               <img src={errorImage} alt="errorImage" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default LikedWorks;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { fetchUserLikedArtworks } from '../../api/likes.api';
import errorImage from '../../../public/errorImage/artErrorImg.jpg';

const LikedWorks: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // 사용자 토큰 상태
  const [likedWorks, setLikedWorks] = useState<any[]>([]); // 좋아요 누른 작품 상태
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      if (token) {
        try {
          const works = await fetchUserLikedArtworks(token);
          setLikedWorks(works);
        } catch (error) {
          console.error('Error fetching liked artworks:', error);
        }
      }
    };
    fetchWorks();
  }, [token]);

  const handleLoadMore = () => {
    if (!isExpanded) {
      const newVisibleItems = visibleItems + 8;
      setVisibleItems(newVisibleItems);
      setIsExpanded(newVisibleItems >= likedWorks.length);
    } else {
      setVisibleItems(8);
      setIsExpanded(!isExpanded);
    }
  };

  const handleWorkClick = (workId: string) => {
    navigate(`/artworks/${workId}`);
  };

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 flex flex-col items-center justify-center px-8">
      <div className="border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">LIKED WORKS</p>
          <div className="relative grid grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
            {likedWorks.slice(0, visibleItems).map((work) => (
              <div
                key={work._id}
                className="relative cursor-pointer"
                onClick={() => handleWorkClick(work._id)}
              >
                {work.image ? (
                  <img
                    src={work.image}
                    alt={work.name}
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
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default LikedWorks;
