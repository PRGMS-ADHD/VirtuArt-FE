import ArtistsInfo from './ArtistsInfo';

const ArtistsList = ({ artists, categories }) => {
  return (
    <div className="flex w-screen flex-col items-center">
      {categories.map((category, index) => {
        const bgClass = index % 2 === 0 ? 'bg-gray-100' : '';
        return (
          <div key={category.id} className={`p-4 ${bgClass} w-screen`}>
            <div className="container mx-auto px-4">
              <ArtistsInfo
                artists={artists.filter(
                  (artist) => artist.category === category.id,
                )}
                categoryId={category.id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArtistsList;
