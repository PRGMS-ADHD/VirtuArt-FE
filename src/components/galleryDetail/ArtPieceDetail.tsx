import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import LikesCountButton from '@/components/common/LikesCountButton';
import OtherWorks from '@/components/artist/OtherWorks';
import Collectors from '@/components/collectors/Collectors';
import HorizonProfileCard from '@/components/profile/HorizonProfileCard';
import { fetchArtistById, fetchArtWorksById } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import { ArtistModel } from '@/models/artist.model';
import Tags from '@/components/gallery/Tags';
import logo from '../../../assets/logo.png';

const ArtPieceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [artWork, setArtWork] = useState<ArtworkModel | null>(null);

  const [selectedTab, setSelectedTab] = useState<'description' | 'info'>(
    'info',
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
                  selectedTab === 'info'
                    ? 'border-b-4 border-black font-semibold'
                    : 'border-b-4 border-transparent'
                }`}
                onClick={() => handleTabClick('info')}
              >
                INFO
              </button>
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
            </div>
          </div>

          <div className="mx-8 h-[36rem] max-h-[36rem] w-full overflow-y-auto border border-t-4 p-4 xl:w-[37.5rem]">
            {selectedTab === 'description' ? (
              <p>{artWork.description}</p>
            ) : (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-center">{artWork.intro}</p>
                <p className="text-center">
                  <Tags />
                </p>
              </div>
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
      <Collectors artistId={artWork.artist_id} />
    </div>
  );
};

export default ArtPieceDetail;