// pages/_app.js
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from '@/context/AuthContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

function AppContent({ Component, pageProps }) {
    const router = useRouter()
    const { token, username, logout } = useContext(AuthContext)

    const navLinks = [
        { label: 'Inicio', href: '/' },
        { label: 'Artículos', href: '/articles' },
        { label: 'Eventos', href: '/events' },
        { label: 'Acerca De', href: '/about' },
    ]

    return (
        <>
            <Navbar
                logoText="GREENTALLICA"
                links={navLinks}
                activePath={router.pathname}
                isLoggedIn={!!token}
                username={username}
                onNavigate={(href) => router.push(href)}
                onLogout={logout}
                onLogin={() => router.push('/auth/login')}
            />
            <div className="wrapper">
                <Component {...pageProps} />
            </div>
            <Footer />
        </>
    )
}

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AppContent Component={Component} pageProps={pageProps} />
        </AuthProvider>
    )
}
