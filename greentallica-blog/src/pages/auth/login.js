/**
 * Página de login - Permite a los usuarios iniciar sesión en la aplicación.
 */

import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './auth.module.css';
import { AuthContext } from '@/context/AuthContext';
import { loginUser } from '@/services/api-auth';
import { handleApiError } from '@/utils/handleErrors';

// Componentes reutilizables
import Loading from '@/components/Loading/Loading';

// Constantes de texto
import {
    LOGIN_TITLE,
    USERNAME_LABEL,
    USERNAME_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    PASSWORD_LABEL,
    SUBMIT_BUTTON_TEXT,
    LOGIN_ERROR_MESSAGE,
} from '@/constants/login';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { login } = useContext(AuthContext);

    /**
     * Maneja el envío del formulario de login.
     *
     * @param {Event} e - Evento de submit del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await loginUser({ username, password });
            login(res.token, res.username);
            router.push('/');
        } catch (error) {
            const mensajeError = handleApiError(error);
            setErrorMessage(mensajeError || LOGIN_ERROR_MESSAGE);
        } finally {
            setLoading(false);
        }
    };

    // Mostrar componente de carga mientras se procesa el login
    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-box']}>

                {/* Título de la página */}
                <h2 className={styles['login-box__title']}>{LOGIN_TITLE}</h2>

                {/* Formulario de login */}
                <form onSubmit={handleSubmit}>

                    {/* Campo de nombre de usuario */}
                    <div className={styles['login-box__group']}>
                        <label htmlFor="username" className={styles['login-box__label']}>
                            {USERNAME_LABEL}
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles['login-box__input']}
                            placeholder={USERNAME_PLACEHOLDER}
                            required
                        />
                    </div>

                    {/* Campo de contraseña */}
                    <div className={styles['login-box__group']}>
                        <label htmlFor="password" className={styles['login-box__label']}>
                            {PASSWORD_LABEL}
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles['login-box__input']}
                            placeholder={PASSWORD_PLACEHOLDER}
                            required
                        />
                    </div>

                    {/* Mensaje de error */}
                    {errorMessage && (
                        <div className={styles['login-box__error']}>
                            {errorMessage}
                        </div>
                    )}

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className={styles['login-box__button']}
                        aria-label={SUBMIT_BUTTON_TEXT}
                    >
                        {SUBMIT_BUTTON_TEXT}
                    </button>
                </form>

            </div>
        </div>
    );
}
