import { useState } from 'react';
import { ArtPieces } from '../../data/artPieces';
import { useParams } from 'react-router-dom';

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
    <div className="flex flex-col p-10">
      <div className="flex flex-row justify-between">
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
        <p className="">좋아요 갯수</p>
      </div>

      <div className="my-5 flex flex-row justify-center">
        <div className="border-1 mx-8 w-1/2 border py-20 drop-shadow-lg">
          <img src={artPiece.imageUrl} alt={artPiece.title} />
        </div>

        <div className="flex w-1/2 flex-col">
          <div className="flex items-center justify-center">
            <button
              className={`px-4 py-2 focus:outline-none ${
                selectedTab === 'description'
                  ? 'border-b-2 border-black font-semibold'
                  : 'border-b border-gray-400'
              }`}
              onClick={() => handleTabClick('description')}
            >
              DESCRIPTION
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${
                selectedTab === 'info'
                  ? 'border-b-2 border-black font-semibold'
                  : 'border-b border-gray-400'
              }`}
              onClick={() => handleTabClick('info')}
            >
              INFO
            </button>
          </div>
          <div className="border-1 mx-8  overflow-y-auto p-5">
            {selectedTab === 'description' ? (
              <p>{artPiece.description}</p>
            ) : (
              <p>{artPiece.info}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtPieceDetail;
