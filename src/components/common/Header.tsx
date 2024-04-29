import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import MiniTitle from './MiniTitle';

function Header() {
  return (
    <div className="flex h-[122px] w-full items-center justify-between border-b border-gray-300 p-4">
      <div className="flex flex-1 justify-center">
        <div className="mr-56">
          <Link to="/">
            <MiniTitle text="VIRTU" boldText="ART" />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <img
          src="icon/logo.png"
          alt="logo"
          className="min-w-[90px]"
          width={90}
          height={90}
        />
      </div>
      <div className="flex flex-1 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}

export default Header;
