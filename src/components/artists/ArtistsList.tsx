import ArtistsInfo from './ArtistsInfo';

const categoryNames = {
  1: 'WESTERN',
  2: 'KOREAN',
  3: 'POP ART',
  4: 'MEDIA ART',
  5: 'MODERN ART'
};

const ArtistsList = ({ artists, categories }) => {
  return (
    <div className="w-screen flex flex-col items-center">
      {categories.map((category, index) => {
        const bgClass = index % 2 === 0 ? 'bg-gray-100' : '';
        return (
          <div key={category.id} className={`p-1 ${bgClass} w-screen`}>
            <div className="container mx-auto px-4">
              <div className="font-noto-sans-kr font-medium text-[20px] leading-[29px]">
                {categoryNames[category.id]}
              </div>
            </div>
            <ArtistsInfo artists={artists.filter(artist => artist.category === category.id)} />
          </div>
        );
      })}
    </div>
  );
};

export default ArtistsList;
