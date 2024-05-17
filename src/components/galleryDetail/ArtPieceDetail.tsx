import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import LikesCountButton from '@/components/common/LikesCountButton';
import OtherWorks from '@/components/artist/OtherWorks';
import Collectors from '@/components/collectors/Collectors';
import HorizonProfileCard from '@/components/profile/HorizonProfileCard';
import { fetchArtistById, fetchArtWorksById } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import { ArtistModel } from '@/models/artist.model';
import logo from '../../../assets/logo.png';

const ArtPieceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artWork, setArtWork] = useState<ArtworkModel | null>(null);

  const [selectedTab, setSelectedTab] = useState<'description' | 'info'>(
    'description',
  );
  const [artist, setArtist] = useState<ArtistModel | null>(null);
  //
  // const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  // const { id } = useParams<{ id: string }>();

  // const artPiece = ArtPieces.find((art) => art.id.toString() === id);

  useEffect(() => {
    const fetchArtPiece = async () => {
      try {
        const data: ArtworkModel = await fetchArtWorksById(id);
        setArtWork(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtPiece();
  }, [id]);

  useEffect(() => {
    const fetchArtist = async () => {
      if (artWork) {
        try {
          const artistData: ArtistModel = await fetchArtistById(
            artWork.artist_id,
          );
          setArtist(artistData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchArtist();
  }, [artWork]);

  const handleTabClick = (tab: 'description' | 'info') => {
    setSelectedTab(tab);
  };

  if (!artWork) {
    return <div>Loading...</div>;
  }

  // const toggleLike = () => {
  //   setIsLiked(!isLiked);
  // };

  return (
    <div className="flex-1 justify-center pb-8">
      <div className="flex flex-row justify-between p-10 px-4 pb-4 sm:px-36">
        <div className="flex flex-col">
          <h1
            className="text-lg sm:text-xl"
            style={{ fontFamily: 'noto-sans KR' }}
          >
            {artWork.name}
          </h1>
          <p
            className="text-xs font-light sm:text-sm"
            style={{ fontFamily: 'Helvetica Neue' }}
          >
            {artWork.e_name}
          </p>
        </div>
        <div>{/*<LikesCountButton />*/}</div>
      </div>
      <div className="flex flex-col items-start justify-evenly gap-5 pb-6 xl:flex-row">
        <div className="relative mx-0 flex h-auto w-full items-center justify-center shadow-custom-shadow xl:h-[38.5rem] xl:w-[37.5rem]">
          <img
            src={artWork.image}
            alt={artWork.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </div>

        <div className="flex w-full flex-col items-center xl:w-[37.5rem]">
          <div className="flex w-full justify-center">
            <div className="z-10 -mb-1 flex w-full justify-between border-gray-400">
              <button
                type="button"
                className={`flex-1 px-4 pb-2 focus:outline-none ${
                  selectedTab === 'description'
                    ? 'border-b-4 border-black font-semibold'
                    : 'border-b-4 border-transparent'
                }`}
                onClick={() => handleTabClick('description')}
              >
                DESCRIPTION
              </button>
              <button
                type="button"
                className={`flex-1 px-4 pb-2 focus:outline-none ${
                  selectedTab === 'info'
                    ? 'border-b-4 border-black font-semibold'
                    : 'border-b-4 border-transparent'
                }`}
                onClick={() => handleTabClick('info')}
              >
                INFO
              </button>
            </div>
          </div>

          <div className="mx-8 max-h-[36rem] w-full overflow-y-auto border border-t-4 p-4 xl:w-[37.5rem]">
            {selectedTab === 'description' ? (
              <p>{artWork.description}</p>
            ) : (
              <p>{artWork.tags}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* TODO 수정필요*/}
        <HorizonProfileCard artist={artist}>
          {/*<LikesCountButton*/}
          {/*  isLiked={false}*/}
          {/*  likes={1}*/}
          {/*/>*/}
        </HorizonProfileCard>
      </div>
      <OtherWorks artist={artist} errorImage={logo} />{' '}
      {/* 다른 작품 TODO 지금 아티스트로 되어있음 그림으로 수정할것 */}
      <Collectors artistId={artWork.artist_id} />
    </div>
  );
};

export default ArtPieceDetail;

// import React, { useState } from 'react';
// import { ArtPieces } from '@/data/artPieces';
// import { useParams } from 'react-router-dom';
// import LikesCountButton from '@/components/common/LikesCountButton';
// import OtherWorks from '@/components/artist/OtherWorks';
// import Collectors from '@/components/collectors/Collectors';
// import HorizonProfileCard from '@/components/profile/HorizonProfileCard';
// import LikesButton from '@/components/common/LikesButton';
//
// function convertNewlineToBreak(text: string) {
//   return text.split('\n').map((line) => (
//     <React.Fragment>
//       {line}
//       <br />
//     </React.Fragment>
//   ));
// }
//
// const ArtPieceDetail = () => {
//   const { id } = useParams<{ id: string }>();
//
//   const artPiece = ArtPieces.find((art) => art.id.toString() === id);
//
//   if (!artPiece) {
//     return <div>해당 이미지를 찾을 수 없습니다.</div>;
//   }
//
//   const [selectedTab, setSelectedTab] = useState<'description' | 'info'>(
//     'description',
//   );
//
//   const handleTabClick = (tab: 'description' | 'info') => {
//     setSelectedTab(tab);
//   };
//
//   return (
//     <div className="flex-1 justify-center pb-8">
//       <div className="flex flex-row justify-between p-10 px-4 pb-4 sm:px-36">
//         <div className="flex flex-col">
//           <h1
//             className="text-lg sm:text-xl"
//             style={{ fontFamily: 'noto-sans KR' }}
//           >
//             {artPiece.title}
//           </h1>
//           <p
//             className="text-xs font-light sm:text-sm"
//             style={{ fontFamily: 'Helvetica Neue' }}
//           >
//             {artPiece.engTitle}
//           </p>
//         </div>
//         <div className="">
//           <LikesCountButton />
//         </div>
//       </div>
//
//       <div className="flex flex-col items-start justify-evenly gap-5 pb-6 xl:flex-row">
//         <div className="relative mx-0 flex h-[38.5rem] w-full items-center justify-center shadow-custom-shadow xl:w-[37.5rem]">
//           <img
//             src={artPiece.imageUrl}
//             alt={artPiece.title}
//             style={{
//               maxHeight: '100%',
//               maxWidth: '100%',
//             }}
//           />
//         </div>
//
//         <div className="flex w-full flex-col items-center xl:w-[37.5rem]">
//           <div className="flex w-full justify-center">
//             <div className="z-10 -mb-1 flex w-full justify-between border-gray-400">
//               <button
//                 type="button"
//                 className={`flex-1 px-4 pb-2 focus:outline-none ${
//                   selectedTab === 'description'
//                     ? 'border-b-4 border-black font-semibold'
//                     : 'border-b-4 border-transparent'
//                 }`}
//                 onClick={() => handleTabClick('description')}
//               >
//                 DESCRIPTION
//               </button>
//               <button
//                 type="button"
//                 className={`flex-1 px-4 pb-2 focus:outline-none ${
//                   selectedTab === 'info'
//                     ? 'border-b-4 border-black font-semibold'
//                     : 'border-b-4 border-transparent'
//                 }`}
//                 onClick={() => handleTabClick('info')}
//               >
//                 INFO
//               </button>
//             </div>
//           </div>
//
//           <div className="mx-8 max-h-[36rem] w-full overflow-y-auto border-1 border-t-4 p-4 xl:w-[37.5rem]">
//             {selectedTab === 'description' ? (
//               <p>{convertNewlineToBreak(artPiece.description)}</p>
//             ) : (
//               <p>{convertNewlineToBreak(artPiece.info)}</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div>
//         <HorizonProfileCard>
//           <LikesButton />
//         </HorizonProfileCard>
//       </div>
//       <OtherWorks />
//       <Collectors />
//     </div>
//   );
// };
//
// export default ArtPieceDetail;

// const ArtPieceDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const artPiece = ArtPieces.find((art) => art.id.toString() === id);
//
//   if (!artPiece) {
//     return <div>해당 이미지를 찾을 수 없습니다.</div>;
//   }
//
//   const [selectedTab, setSelectedTab] = useState<'description' | 'info'>(
//     'description',
//   );
//
//   const handleTabClick = (tab: 'description' | 'info') => {
//     setSelectedTab(tab);
//   };
//
//   return (
//     <div className="flex w-full flex-col justify-center pb-8">
//       <div className="px-4 py-4 md:px-10 lg:px-36">
//         <div className="flex flex-col justify-between lg:flex-row">
//           <div>
//             <h1
//               className="text-lg font-bold md:text-xl"
//               style={{ fontFamily: 'noto-sans KR' }}
//             >
//               {artPiece.title}
//             </h1>
//             <p
//               className="text-xs font-light md:text-sm"
//               style={{ fontFamily: 'Helvetica Neue' }}
//             >
//               {artPiece.engTitle}
//             </p>
//           </div>
//           <LikesCountButton />
//         </div>
//       </div>
//
//       <div className="flex flex-col justify-evenly gap-5 px-4 md:flex-row md:px-0">
//         <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
//           <img
//             src={artPiece.imageUrl}
//             alt={artPiece.title}
//             className="max-h-96 w-full object-contain"
//           />
//         </div>
//
//         <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
//           <div className="flex justify-center">
//             <div className="flex w-full">
//               <button
//                 type="button"
//                 className={`w-1/2 py-2 ${selectedTab === 'description' ? 'border-b-2 border-black font-semibold' : ''}`}
//                 onClick={() => handleTabClick('description')}
//               >
//                 DESCRIPTION
//               </button>
//               <button
//                 type="button"
//                 className={`w-1/2 py-2 ${selectedTab === 'info' ? 'border-b-2 border-black font-semibold' : ''}`}
//                 onClick={() => handleTabClick('info')}
//               >
//                 INFO
//               </button>
//             </div>
//           </div>
//
//           <div className="overflow-auto p-4">
//             {selectedTab === 'description' ? (
//               <p>{convertNewlineToBreak(artPiece.description)}</p>
//             ) : (
//               <p>{convertNewlineToBreak(artPiece.info)}</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <HorizonProfileCard>
//         <LikesButton />
//       </HorizonProfileCard>
//       <OtherWorks />
//       <Collectors />
//     </div>
//   );
// };
//
// export default ArtPieceDetail;
