import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import styles from './Navbar.module.css';

/**
 * Componente Navbar
 * Cabecera del sitio con navegación y menú responsive.
 */
export default function Navbar() {
    const { token, username, logout } = useContext(AuthContext);
    const { pathname } = useRouter();
    const router = useRouter();

    // Estado para abrir/cerrar menú hamburguesa
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Determina si una ruta está activa
    const isActive = (href) => pathname === href;

    // Maneja navegación y cierra el menú
    const handleNavigation = (href) => {
        setIsMenuOpen(false);
        router.push(href);
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.navbar__container}>
                {/* Logo principal */}
                <Link href="/" className={styles.navbar__logo}>
                    GREENTALLICA
                </Link>

                {/* Botón menú hamburguesa */}
                <button
                    className={styles.navbar__hamburger}
                    onClick={toggleMenu}
                    aria-label="Menú"
                >
                    <span className={styles.navbar__hamburgerLine}>☰</span>
                </button>

                {/* Menú de navegación */}
                <nav className={`${styles.navbar__links} ${isMenuOpen ? styles['navbar__links--open'] : ''}`}>
                    <button
                        href="/"
                        onClick={() => handleNavigation('/')}
                        className={`${styles.navbar__link} ${isActive('/') ? styles['navbar__link--active'] : ''}`}
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => handleNavigation('/articles')}
                        className={`${styles.navbar__link} ${isActive('/articles') ? styles['navbar__link--active'] : ''}`}
                    >
                        Artículos
                    </button>
                    <button
                        onClick={() => handleNavigation('/events')}
                        className={`${styles.navbar__link} ${isActive('/events') ? styles['navbar__link--active'] : ''}`}
                    >
                        Eventos
                    </button>
                    <button
                        onClick={() => handleNavigation('/about')}
                        className={`${styles.navbar__link} ${isActive('/about') ? styles['navbar__link--active'] : ''}`}
                    >
                        Acerca De
                    </button>

                    {/* Autenticación */}
                    <div className={styles.navbar__auth}>
                        {!token ? (
                            <>
                                <Link
                                    href="/auth/login"
                                    className={`${styles.navbar__btn} ${styles['navbar__btn--login']}`}
                                >
                                    Iniciar sesión
                                </Link>
                                Registro deshabilitado
                                <Link
                                    href="/auth/register"
                                    className={`${styles.navbar__btn} ${styles['navbar__btn--register']}`}
                                >
                                    Registrarse
                                </Link>

                            </>
                        ) : (
                            <div className={styles.navbar__user}>
                                <span className={styles.navbar__username}>
                                    Hola, {username || 'usuario'}
                                </span>
                                <button
                                    onClick={logout}
                                    className={`${styles.navbar__btn} ${styles['navbar__btn--logout']}`}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
