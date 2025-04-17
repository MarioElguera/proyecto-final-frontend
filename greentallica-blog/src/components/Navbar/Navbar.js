import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { token, username, logout } = useContext(AuthContext);
    const { pathname } = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const isActive = (href) => pathname === href;

    return (
        <header className={styles.navbar}>
            <div className={styles.navbar__container}>
                <Link href="/" className={styles.navbar__logo}>BLOG PERSONAL</Link>

                <button
                    className={styles.navbar__hamburger}
                    onClick={toggleMenu}
                    aria-label="Menú"
                >
                    <span className={styles.navbar__hamburgerLine}>
                        ☰
                    </span>
                </button>

                <nav className={`${styles.navbar__links} ${isMenuOpen ? styles['navbar__links--open'] : ''}`}>
                    <Link href="/" className={`${styles.navbar__link} ${isActive('/') ? styles['navbar__link--active'] : ''}`}>Inicio</Link>
                    <Link href="/articles/articles" className={`${styles.navbar__link} ${isActive('/articles/articles') ? styles['navbar__link--active'] : ''}`}>Artículos</Link>
                    <Link href="/event/event" className={`${styles.navbar__link} ${isActive('/event/event') ? styles['navbar__link--active'] : ''}`}>Eventos</Link>
                    <Link href="/about/about" className={`${styles.navbar__link} ${isActive('/about/about') ? styles['navbar__link--active'] : ''}`}>Acerca De</Link>
                    <Link href="/contact" className={`${styles.navbar__link} ${isActive('/contact') ? styles['navbar__link--active'] : ''}`}>Contacto</Link>

                    <div className={styles.navbar__auth}>
                        {!token ? (
                            <>
                                <Link href="/auth/login" className={`${styles.navbar__btn} ${styles['navbar__btn--login']}`}>Iniciar sesión</Link>
                                {/* <Link href="/auth/register" className={`${styles.navbar__btn} ${styles['navbar__btn--register']}`}>Registrarse</Link> */}
                            </>
                        ) : (
                            <div className={styles.navbar__user}>
                                <span className={styles.navbar__username}>Hola, {username || 'usuario'}</span>
                                <button onClick={logout} className={`${styles.navbar__btn} ${styles['navbar__btn--logout']}`}>Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
