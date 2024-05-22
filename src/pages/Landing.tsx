import { Link } from 'react-router-dom';

const VideoComponent: React.FC = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <video autoPlay muted loop className="h-full w-full object-cover">
        <source
          src="https://dgz50u1nq28v1.cloudfront.net/4360565-uhd_3840_2160_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
};

const LeftTextComponent: React.FC = () => {
  return (
    <div className="relative z-10 mb-8 text-left text-white md:mb-0">
      <h1
        className="mb-7 text-5xl font-bold md:text-7xl"
        style={{ fontSize: '5.2rem' }}
      >
        <span className="text-yellow-500">C</span>onnect,
        <br />
        <span className="text-yellow-500">C</span>ollect,
        <br />
        <span className="text-yellow-500">I</span>nspired
      </h1>
      <p className="mt- md:text-ml text-lg">
        예술가와 예술애호가를 위한 최고의 플랫폼
        <br />
        다양한 아티스트와 작품을 만나보세요!
      </p>
    </div>
  );
};

const RightTextComponent: React.FC = () => {
  return (
    <div className="relative z-10 text-right text-white">
      <h1 className="mb-4 text-7xl font-bold md:text-[5.2rem]">
        VIRTU<span className="text-yellow-500">ART</span>
      </h1>
      <div className="custom3:flex-row mt-8 flex flex-col items-center justify-center gap-4">
        <Link to="/gallery">
          <button className="rounded-full bg-white px-10 py-2 text-black">
            갤러리 둘러보기
          </button>
        </Link>
        <Link to="/join">
          <button className="rounded-full bg-yellow-500 px-10 py-2 text-white">
            지금 바로 가입하기
          </button>
        </Link>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex h-full w-screen items-center justify-center overflow-hidden">
      <main className="custom2:flex-row custom2:px-24 custom2:justify-between absolute inset-0 flex h-full w-full flex-col items-center justify-around px-8">
        <VideoComponent />
        <LeftTextComponent />
        <RightTextComponent />
      </main>
    </div>
  );
};

export default LandingPage;
