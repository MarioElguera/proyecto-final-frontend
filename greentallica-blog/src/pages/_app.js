// pages/_app.js
import '@/styles/globals.css';

import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <main>
                <Navbar />
                <div className="min-h-screen bg-red" >
                    <Component {...pageProps} />
                </div>
                <Footer />
            </main>
        </AuthProvider>
    );
}
