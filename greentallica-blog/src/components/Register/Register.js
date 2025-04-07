import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import styles from './Register.module.css';
import { registerUser } from '@/services/auth';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const { setToken } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const role = isAdmin ? 'admin' : 'user';
            await registerUser({ username, password, role });

            setSuccessMessage('Usuario registrado con éxito');
            setErrorMessage('');

            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.message || 'Error al registrar el usuario');
        }
    };

    return (
        <div className={styles['register']}>
            <div className={styles['register__card']}>
                <h2 className={styles['register__title']}>Registro de Usuario</h2>

                {errorMessage && <div className={styles['register__error']}>{errorMessage}</div>}
                {successMessage && <div className={styles['register__success']}>{successMessage}</div>}

                <form onSubmit={handleRegister} className={styles['register__form']}>
                    <div className={styles['register__field']}>
                        <label htmlFor="username" className={styles['register__label']}>Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Ingrese su nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles['register__input']}
                            required
                        />
                    </div>

                    <div className={styles['register__field']}>
                        <label htmlFor="password" className={styles['register__label']}>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles['register__input']}
                            required
                        />
                    </div>

                    <div className={styles['register__field']}>
                        <label htmlFor="confirmPassword" className={styles['register__label']}>Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Repita su contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles['register__input']}
                            required
                        />
                    </div>

                    <div className={styles['register__field']}>
                        <label className={styles['register__label']} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                            Registrar como administrador
                        </label>
                    </div>

                    <button type="submit" className={styles['register__button']}>
                        Registrarse
                    </button>
                </form>

                <div className={styles['register__footer']}>
                    <p className={styles['register__link']}>
                        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
