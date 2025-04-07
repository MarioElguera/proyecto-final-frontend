import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/auth';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ username, password });
            console.log("login => token", res);

            login(res.token, res.username);
            router.push('/');

        } catch (error) {
            setErrorMessage('Credenciales incorrectas');
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-box']}>
                <h2 className={styles['login-box__title']}>Iniciar sesión</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles['login-box__group']}>
                        <label htmlFor="username" className={styles['login-box__label']}>
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles['login-box__input']}
                            placeholder="Ingrese su nombre de usuario"
                            required
                        />
                    </div>

                    <div className={styles['login-box__group']}>
                        <label htmlFor="password" className={styles['login-box__label']}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles['login-box__input']}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <div className={styles['login-box__error']}>{errorMessage}</div>
                    )}

                    <button type="submit" className={styles['login-box__button']}>
                        Iniciar sesión
                    </button>
                </form>

                <p className={styles['login-box__footer']}>
                    ¿No tienes una cuenta?{' '}
                    <a href="/register" className={styles['login-box__link']}>
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
