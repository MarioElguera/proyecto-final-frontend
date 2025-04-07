// pages/_app.js
import '@/styles/globals.css';

import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <main>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </main>
        </AuthProvider>
    );
}
