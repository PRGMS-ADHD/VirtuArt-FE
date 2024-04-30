import IconLink from './IconLink';

function Footer() {
  return (
    <div className="flex w-full flex-col items-center border-t border-gray-300">
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
        <p className="font-helvetica text-customGray3 text-center text-[10px] font-light">
          TEAM A.D.H.D
        </p>
        <p className="font-helvetica text-customGray3 text-center text-[8px] font-light">
          All rights reserved 2024
        </p>
      </div>
    </div>
  );
}

export default Footer;
