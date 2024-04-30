import image from '../assets/image1.jpeg';
import UserProfileCard from '../components/profile/UserProfileCard';

function Artist() {
  return (
    <div>
      <img
        src={image}
        alt="image1.png"
        className="h-[400px] w-[1920px] object-cover"
      />
      <div className="flex justify-center">
        <UserProfileCard />
      </div>
    </div>
  );
}

export default Artist;
