import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { registerUser } from '@/services/api-auth';
import { handleApiError } from '@/utils/handleErrors';
import styles from './Register.module.css';

import {
    REGISTER_TITLE,
    USERNAME_LABEL,
    PASSWORD_LABEL,
    CONFIRM_PASSWORD_LABEL,
    ADMIN_LABEL,
    SUBMIT_BUTTON_TEXT,
    ALREADY_HAVE_ACCOUNT_TEXT,
    LOGIN_LINK_TEXT,
    PASSWORDS_MISMATCH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
} from '@/constants/register';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Manejar envío de registro
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage(PASSWORDS_MISMATCH_ERROR);
            return;
        }

        try {
            const role = isAdmin ? 'admin' : 'user';
            await registerUser({ username, password, role });

            setSuccessMessage(REGISTER_SUCCESS);
            setErrorMessage('');

            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);
        } catch (error) {
            const mensajeError = handleApiError(error);
            setSuccessMessage('');
            setErrorMessage(mensajeError || REGISTER_ERROR);
        }
    };

    return (
        <div className={styles['register']}>
            <div className={styles['register__card']}>
                <h2 className={styles['register__title']}>{REGISTER_TITLE}</h2>

                {errorMessage && <div className={styles['register__error']}>{errorMessage}</div>}
                {successMessage && <div className={styles['register__success']}>{successMessage}</div>}

                <form onSubmit={handleRegister} className={styles['register__form']}>
                    <div className={styles['register__field']}>
                        <label htmlFor="username" className={styles['register__label']}>
                            {USERNAME_LABEL}
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder={USERNAME_LABEL}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles['register__input']}
                            required
                        />
                    </div>

                    <div className={styles['register__field']}>
                        <label htmlFor="password" className={styles['register__label']}>
                            {PASSWORD_LABEL}
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder={PASSWORD_LABEL}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles['register__input']}
                            required
                        />
                    </div>

                    <div className={styles['register__field']}>
                        <label htmlFor="confirmPassword" className={styles['register__label']}>
                            {CONFIRM_PASSWORD_LABEL}
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder={CONFIRM_PASSWORD_LABEL}
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
                            {ADMIN_LABEL}
                        </label>
                    </div>

                    <button type="submit" className={styles['register__button']} aria-label={SUBMIT_BUTTON_TEXT}>
                        {SUBMIT_BUTTON_TEXT}
                    </button>
                </form>

                <div className={styles['register__footer']}>
                    <p className={styles['register__link']}>
                        {ALREADY_HAVE_ACCOUNT_TEXT}{' '}
                        <Link href="/auth/login" className={styles['register__link']}>
                            {LOGIN_LINK_TEXT}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
