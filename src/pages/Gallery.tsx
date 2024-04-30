import ArtpieceList from '../components/gallery/ArtpieceList';

const Gallery = () => {
  return (
    <div className="my-6 flex flex-col items-center">
      <h1
        className="font my-2 text-2xl font-medium"
        style={{ fontFamily: 'Helvetica Neue' }}
      >
        Hear the stories beyond the canvas!
      </h1>
      <p
        className="mb-6 text-sm font-extralight"
        style={{ fontFamily: 'noto-sans KR' }}
      >
        캔버스 너머의 이야기를 들어보세요.
      </p>
      <ArtpieceList />
    </div>
  );
};

export default Gallery;
