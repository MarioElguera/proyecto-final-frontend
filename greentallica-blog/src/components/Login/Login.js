import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Login.module.css';
import { AuthContext } from '../../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            router.push('/');
        } catch {
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
