import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Login.module.css';
import { AuthContext } from '@/context/AuthContext';
import { loginUser } from '@/services/api-auth';
import { handleApiError } from '@/utils/handleErrors';

// Textos como constantes
const LOGIN_TITLE = "Iniciar sesión";
const USERNAME_PLACEHOLDER = "Ingrese su nombre de usuario";
const PASSWORD_PLACEHOLDER = "Ingrese su contraseña";
const SUBMIT_BUTTON_TEXT = "Iniciar sesión";
const NO_ACCOUNT_TEXT = "¿No tienes una cuenta?";
const REGISTER_LINK_TEXT = "Regístrate";
const LOGIN_ERROR_MESSAGE = "Credenciales incorrectas";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { login } = useContext(AuthContext);

    // Maneja el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ username, password });
            login(res.token, res.username);
            router.push('/');
        } catch (error) {
            const mensajeError = handleApiError(error);
            setErrorMessage(mensajeError || LOGIN_ERROR_MESSAGE);
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-box']}>
                <h2 className={styles['login-box__title']}>{LOGIN_TITLE}</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles['login-box__group']}>
                        <label htmlFor="username" className={styles['login-box__label']}>
                            Nombre de usuario
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

                    <div className={styles['login-box__group']}>
                        <label htmlFor="password" className={styles['login-box__label']}>
                            Contraseña
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

                    {errorMessage && (
                        <div className={styles['login-box__error']}>
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles['login-box__button']}
                        aria-label={SUBMIT_BUTTON_TEXT}
                    >
                        {SUBMIT_BUTTON_TEXT}
                    </button>
                </form>

                <p className={styles['login-box__footer']}>
                    {NO_ACCOUNT_TEXT}{' '}
                    <Link href="/register" className={styles['login-box__link']}>
                        {REGISTER_LINK_TEXT}
                    </Link>
                </p>
            </div>
        </div>
    );
}
