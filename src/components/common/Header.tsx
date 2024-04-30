import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import MiniTitle from './MiniTitle';

function Header() {
  return (
    <div className="flex h-[122px] items-center justify-between border-b border-gray-300 p-4">
      <div className="flex flex-1 justify-center">
        <div className="mr-56">
          <Link to="/">
            <MiniTitle text="VIRTU" boldText="ART" />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <img
          src="/src/assets/favicon.png"
          alt="logo"
          width="90"
          height="90"
          className="min-w-[90px]"
        />
   Ω   </div>
      <div className="flex flex-1 justify-center">
        <NavLinks />
      </div>
    </div>
  );
}

export default Header;
