import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);

            // Redirige al home o dashboard
            router.push('/');
        } catch (error) {
            setErrorMessage('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Ingrese su nombre de usuario"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-600">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
