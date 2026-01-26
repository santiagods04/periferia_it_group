import  { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__logo">MiApp</Link>
            <nav className="header__nav">
                <NavLink to="/" className="header__nav-link">Inicio</NavLink>
                <NavLink to="/login" className="header__nav-link">Iniciar Sesión</NavLink>
            </nav>
        </header>

    );
}