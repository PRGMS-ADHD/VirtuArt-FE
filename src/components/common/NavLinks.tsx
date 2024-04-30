import { Link } from 'react-router-dom';

function NavLinks() {
  return (
    <nav>
      <ul className="font-helvetica flex space-x-10 font-light">
        <li>
          <Link to="/gallery">GALLERY</Link>
        </li>
        <li>
          <Link to="/artists">ARTISTS</Link>
        </li>
        <li>
          <Link to="/exhibition">EXHIBITION</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;