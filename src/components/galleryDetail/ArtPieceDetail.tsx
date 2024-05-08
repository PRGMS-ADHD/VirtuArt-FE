import { useState } from 'react';
import { ArtPieces } from '@/data/artPieces';
import { useParams } from 'react-router-dom';
import LikesCountButton from '@/components/common/LikesCountButton';
import OtherWorks from '@/components/artist/OtherWorks';
import Collectors from '@/components/collectors/Collectors';
import HorizonProfileCard from '@/components/profile/HorizonProfileCard';
import LikesButton from '@/components/common/LikesButton';
import React from 'react';

function convertNewlineToBreak(text: string) {
  return text.split('\n').map((line) => (
    <React.Fragment>
      {line}
      <br />
    </React.Fragment>
  ));
}

const ArtPieceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const artPiece = ArtPieces.find((art) => art.id.toString() === id);

  if (!artPiece) {
    return <div>해당 이미지를 찾을 수 없습니다.</div>;
  }

  const [selectedTab, setSelectedTab] = useState<'description' | 'info'>(
    'description',
  );

  const handleTabClick = (tab: 'description' | 'info') => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex-1 justify-center pb-8">
      <div className="flex flex-row justify-between p-10 px-36 pb-4">
        <div className="flex flex-col">
          <h1 className="text-xl" style={{ fontFamily: 'noto-sans KR' }}>
            {artPiece.title}
          </h1>
          <p
            className="text-sm font-light"
            style={{ fontFamily: 'Helvetica Neue' }}
          >
            {artPiece.engTitle}
          </p>
        </div>
        <div className="">
          <LikesCountButton />
        </div>
      </div>

      <div className="my-5 flex flex-col items-start justify-evenly gap-5 pb-6 xl:flex-row">
        <div className="shadow-custom-shadow relative mx-0 flex h-[38.5rem] w-full items-center justify-center xl:w-[37.5rem]">
          <img
            src={artPiece.imageUrl}
            alt={artPiece.title}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </div>

        <div className="flex w-full flex-col items-center xl:w-[37.5rem]">
          <div className="flex justify-center">
            <div className="z-10 -mb-1 flex w-full justify-between border-gray-400 px-8">
              <button
                type="button"
                className={`flex-1 px-4 pb-2 focus:outline-none ${
                  selectedTab === 'description'
                    ? 'border-b-4 border-black font-semibold'
                    : ''
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
                    : ''
                }`}
                onClick={() => handleTabClick('info')}
              >
                INFO
              </button>
            </div>
          </div>
          <div className="mx-8 max-h-[36rem] overflow-y-auto border-1 border-t-4 p-4 xl:w-[37.5rem]">
            {selectedTab === 'description' ? (
              <p>{convertNewlineToBreak(artPiece.description)}</p>
            ) : (
              <p>{convertNewlineToBreak(artPiece.info)}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <HorizonProfileCard>
          <LikesButton />
        </HorizonProfileCard>
      </div>
      <OtherWorks />
      <Collectors />
    </div>
  );
};

export default ArtPieceDetail;
