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
      <ul className="flex flex-col space-y-8 pl-8 font-helvetica font-light xl:flex-row xl:space-x-10 xl:space-y-0">
        <li>
          <Link to="/">GALLERY</Link>
        </li>
        <li>
          <Link to="/artists">ARTISTS</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/mypage">MYPAGE</Link>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/join">JOIN</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavLinks;
