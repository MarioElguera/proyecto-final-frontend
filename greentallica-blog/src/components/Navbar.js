import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar__container">
                <Link href="/" className="navbar__logo">
                    Greentallica
                </Link>

                <nav className="navbar__links">
                    <Link href="/" className="navbar__link">Home</Link>
                    <Link href="/articles" className="navbar__link">Artículos</Link>
                    <Link href="/notices" className="navbar__link">Noticias</Link>
                    <Link href="/about" className="navbar__link">Acerca de</Link>
                    <Link href="/contact" className="navbar__link">Contacto</Link>
                </nav>

                <div className="navbar__auth">
                    <Link href="/login" className="navbar__btn navbar__btn--login">
                        Iniciar sesión
                    </Link>
                    <Link href="/register" className="navbar__btn navbar__btn--register">
                        Registrarse
                    </Link>
                </div>
            </div>
        </header>
    );
}
