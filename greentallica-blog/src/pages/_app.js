import '@/styles/globals.css';
import React, { useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <main className="min-h-screen bg-white text-black">
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </main>
        </AuthContext.Provider>
    );
}
