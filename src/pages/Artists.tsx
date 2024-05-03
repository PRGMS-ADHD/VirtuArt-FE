import ArtistCategory from '../components/artists/ArtistCategory'; // 아티스트 카테고리별 컴포넌트

const artistCategories = [
  { category: 'Western', folder: 'Western' },
  { category: 'Korean', folder: 'Orient' },
  { category: 'Media Art', folder: 'Media' },
  { category: 'Pop Art', folder: 'Pop' },
];

const Artists = () => {
  return (
    <div className="p-5">
      <h1
        className="font my-2 text-2xl font-medium"
        style={{ fontFamily: 'Helvetica Neue' }}
      >
        Meet the Artists Behind the canvas!
      </h1>
      <p
        className="mb-6 text-sm font-extralight"
        style={{ fontFamily: 'noto-sans KR' }}
      >
        창작의 매력에 빠져보세요! 여러분을 기다리는 아티스트들이 있습니다.
      </p>
      {artistCategories.map((item, index) => (
        <ArtistCategory
          key={index}
          category={item.category}
          folder={item.folder}
        />
      ))}
    </div>
  );
};

export default Artists;
