import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (storedToken) {
            setToken(storedToken);
            decodeToken(storedToken);
        }
        if (storedUsername) setUsername(storedUsername);
    }, []);

    const decodeToken = (jwt) => {
        try {
            const decoded = JSON.parse(atob(jwt.split('.')[1]));
            setUserId(decoded.id);
            setUserRole(decoded.role);
        } catch (err) {
            console.error('Error decodificando el token:', err);
        }
    };

    const login = (jwt, username) => {
        localStorage.setItem('token', jwt);
        localStorage.setItem('username', username);
        setToken(jwt);
        setUsername(username);
        decodeToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
        setUserId(null);
        setUserRole(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ token, username, userId, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
