import IconLink from './IconLink';

function Footer() {
  return (
    <div className="flex h-32 flex-col items-center border-t border-gray-300">
      <div className="mb-4 mt-11 flex space-x-5">
        <IconLink type="github" text=" GITHUB" to="https://github.com" />
        <IconLink
          type="instagram"
          text=" INSTAGRAM"
          to="https://instagram.com"
        />
        <IconLink type="youtube" text=" YOUTUBE" to="https://Youtube.com" />
        <IconLink type="contact" text=" CONTACT" to="/" />
      </div>
      <div>
        <p className="text-center font-helvetica text-[10px] font-light text-customGray3">
          TEAM A.D.H.D
        </p>
        <p className="text-center font-helvetica text-[8px] font-light text-customGray3">
          All rights reserved 2024
        </p>
      </div>
    </div>
  );
}

export default Footer;
