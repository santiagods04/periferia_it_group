import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Header = () => {
  const { isLoggedIn, currentUser, handleLogout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">MiApp</Link>
        <nav className="header__nav">
          {isLoggedIn ? (
            <div className="header__user-zone">
              <Link to="/" className="header__link">Inicio</Link>
              <div className="header__menu-container">
                <span className="header__link" onClick={toggleMenu}>
                  {currentUser?.email} ▾
                </span>
                {isMenuOpen && (
                  <div className="header__dropdown">
                    <div className="header__dropdown-item" onClick={() => handleNavigation('/dashboard')}>
                      Crear publicación
                    </div>
                    <div className="header__dropdown-item header__dropdown-item--logout" onClick={onLogout}>
                      Cerrar sesión
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="header__auth-zone">
              <Link to="/" className="header__link">Inicio</Link>
              <Link to="/login" className="header__link">Iniciar Sesión</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;