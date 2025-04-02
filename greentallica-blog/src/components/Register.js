import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
            const response = await axios.post(`${API_URL}/auth/register`, {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);

            setSuccessMessage('Usuario registrado con éxito');
            setErrorMessage('');

            // Redirigir a login o home después de 1 segundo
            setTimeout(() => {
                router.push('/login');
            }, 1000);

        } catch (error) {
            setErrorMessage('Error al registrar el usuario');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h2>

                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
