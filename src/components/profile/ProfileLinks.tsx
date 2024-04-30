import IconLink from '../common/IconLink';

function ProfileLinks() {
  return (
    <div className="mb-4 ml-12 mt-6 flex items-baseline justify-between">
      <IconLink
        type="location"
        text="서울, 대한민국"
        to="/"
        iconSize="w-4 h-4"
      />
      <div className="mr-2 space-x-4">
        <IconLink
          type="contact"
          text="vanheeho@gmail.com"
          to="/"
          iconSize="w-4 h-4"
        />
        <IconLink
          type="instagram"
          text="@vanheeho"
          to="https://instagram.com"
          iconSize="w-4 h-4"
        />
      </div>
    </div>
  );
}

export default ProfileLinks;
