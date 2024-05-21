const LandingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full items-center justify-center">
        <VideoComponent />
      </main>
    </div>
  );
};

const VideoComponent: React.FC = () => {
  return (
    <div className="h-full w-full">
      <video autoPlay muted loop className="h-full w-full object-cover">
        <source
          src="https://dgz50u1nq28v1.cloudfront.net/4360565-uhd_3840_2160_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LandingPage;
