import { useState } from 'react'
import styles from './Navbar.module.css'

/**
 * @typedef {Object} NavLink
 * @property {string} label — Texto que se muestra en el enlace
 * @property {string} href  — Ruta o identificador de la página
 */

/**
 * @typedef {Object} NavbarProps
 * @property {string} logoText            — Texto o marca del logo
 * @property {NavLink[]} links            — Array de enlaces de navegación
 * @property {string} activePath          — Ruta activa para resaltar el enlace correspondiente
 * @property {boolean} isLoggedIn         — Estado de autenticación
 * @property {string} [username]          — Nombre de usuario (vacío si no hay sesión)
 * @property {(href: string) => void} onNavigate — Callback que maneja la navegación
 * @property {() => void} onLogout        — Callback que maneja el cierre de sesión
 * @property {() => void} onLogin         — Callback que maneja la acción de iniciar sesión
 */

/**
 * Navbar: cabecera con logo, enlaces en segunda fila, y sección de autenticación.
 *
 * @param {NavbarProps} props
 */
export default function Navbar({
    logoText,
    links,
    activePath,
    isLoggedIn,
    username = '',
    onNavigate,
    onLogout,
    onLogin,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    /** Alterna el menú hamburguesa */
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    /**
     * Navega a la ruta indicada y cierra el menú.
     * @param {string} href
     */
    const handleNavigate = href => {
        setIsMenuOpen(false)
        onNavigate(href)
    }

    return (
        <header className={styles.navbar}>
            <div className={styles.navbar__container}>
                {/* Logo */}
                <button
                    type="button"
                    className={styles.navbar__logo}
                    onClick={() => handleNavigate('/')}
                    aria-label="Inicio"
                >
                    {logoText}
                </button>

                {/* Botón hamburguesa (sólo en móvil/tablet) */}
                <button
                    type="button"
                    className={styles.navbar__hamburger}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={styles.navbar__hamburgerLine} />
                    <span className={styles.navbar__hamburgerLine} />
                    <span className={styles.navbar__hamburgerLine} />
                </button>



                {/* Enlaces de navegación (segunda fila) */}
                <nav
                    className={
                        isMenuOpen
                            ? `${styles.navbar__links} ${styles['navbar__links--open']}`
                            : styles.navbar__links
                    }
                >
                    {links.map(({ label, href }) => (
                        <button
                            key={href}
                            type="button"
                            onClick={() => handleNavigate(href)}
                            className={
                                activePath === href
                                    ? `${styles.navbar__link} ${styles['navbar__link--active']}`
                                    : styles.navbar__link
                            }
                        >
                            {label}
                        </button>
                    ))}

                    {/* Sección de autenticación (misma fila que logo) */}
                    <div className={styles.navbar__auth}>
                        {isLoggedIn ? (
                            <>
                                <span className={styles.navbar__username}>
                                    Hola, {username}
                                </span>
                                <button
                                    type="button"
                                    className={`${styles.navbar__btn} ${styles['navbar__btn--logout']}`}
                                    onClick={onLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className={`${styles.navbar__btn} ${styles['navbar__btn--login']}`}
                                onClick={onLogin}
                            >
                                Iniciar sesión
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
