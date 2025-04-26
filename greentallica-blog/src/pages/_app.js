// pages/_app.js
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Head from 'next/head'
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
            <Head>
                <title>GREENTALLICA - Blog </title>
                <meta
                    name="description"
                    content="GREENTALLICA: Explora artículos y eventos sobre Fútbol, Música, Viajes, Películas; en nuestra plataforma construida con Next.js, Express y MongoDB."
                />
                <meta property="og:title" content="GREENTALLICA" />
                <meta property="og:description" content="Descubre y gestiona tu contenido favorito con GREENTALLICA." />
                <meta property="og:image" content="/images/logo_app.png" />
                <meta property="og:url" content="https://proyecto-final-frontend-alpha.vercel.app/" />
                <link rel="icon" href="/images/logo_app.png" />
            </Head>

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
