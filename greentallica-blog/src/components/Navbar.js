import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

export default function Navbar() {
    const { token, username, logout } = useContext(AuthContext);

    return (
        <header className="navbar">
            <div className="navbar__container">
                <Link href="/" className="navbar__logo">
                    Greentallica
                </Link>

                <nav className="navbar__links">
                    <Link href="/" className="navbar__link">Inicio</Link>
                    <Link href="/articles" className="navbar__link">Artículos</Link>
                    <Link href="/news" className="navbar__link">Noticias</Link>
                    <Link href="/about" className="navbar__link">Acerca de</Link>
                    <Link href="/contact" className="navbar__link">Contacto</Link>
                </nav>

                <div className="navbar__auth">
                    {!token ? (
                        <>
                            <Link href="/login" className="navbar__btn navbar__btn--login">
                                Iniciar sesión
                            </Link>
                            <Link href="/register" className="navbar__btn navbar__btn--register">
                                Registrarse
                            </Link>
                        </>
                    ) : (
                        <div className="navbar__user">
                            <span className="navbar__username">Hola, {username || 'usuario'} </span>
                            <button onClick={logout} className="navbar__btn navbar__btn--logout">
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
