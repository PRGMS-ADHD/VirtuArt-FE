import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function NavLinks() {
  const { isLoggedIn, storeLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    storeLogout();
    window.alert('Logout successful');
    navigate('/');
  };

  return (
    <nav>
      <ul className="flex space-x-10 font-helvetica font-light">
        <li>
          <Link to="/">GALLERY</Link>
        </li>
        <li>
          <Link to="/artists">ARTISTS</Link>
        </li>
        <li>
          <Link to="/exhibition">EXHIBITION</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
