import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { Menu, X } from 'react-feather';
import NavLinks from './NavLinks';
import MiniTitle from './MiniTitle';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative flex h-28 w-full items-center justify-between border-b border-gray-300 p-4">
      <div className="flex w-1/3 items-center justify-start">
        <Link to="/" className="ml-6 sm:ml-10 md:ml-20">
          <MiniTitle text="VIRTU" boldText="ART" />
        </Link>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          src="https://dgz50u1nq28v1.cloudfront.net/logo"
          alt="logo"
          width="70"
          height="70"
          className="min-w-[70px] md:min-w-[90px]"
        />
      </div>
      <div className="mr-4 flex w-1/3 items-center justify-end sm:mr-10 md:mr-20 xl:hidden">
        <button type="button" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {isMenuOpen && (
        <RemoveScroll>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          <div
            className={`fixed right-0 top-0 z-50 h-full w-[50%] max-w-sm transform bg-white shadow-lg duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <FocusLock>
              <button
                type="button"
                onClick={toggleMenu}
                className="absolute right-5 top-5"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="mt-10 flex items-start space-x-8 space-y-4 p-5">
                <NavLinks />
              </div>
            </FocusLock>
          </div>
        </RemoveScroll>
      )}
      <div className="mr-4 hidden w-1/3 items-center justify-end sm:mr-10 md:mr-36 xl:flex">
        <NavLinks />
      </div>
    </div>
  );
}

export default Header;
