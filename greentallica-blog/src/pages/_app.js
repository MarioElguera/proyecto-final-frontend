import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Head from 'next/head'
import { AuthProvider, AuthContext } from '@/context/AuthContext'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

/**
 * Componente principal de la aplicación.
 * Gestiona el contexto de autenticación y envuelve el contenido global.
 */
function AppContent({ Component, pageProps }) {
    const router = useRouter()
    const { token, username, logout } = useContext(AuthContext)

    /**
     * Links para la navegación global de la aplicación.
     */
    const navLinks = [
        { label: 'Inicio', href: '/' },
        { label: 'Artículos', href: '/articles' },
        { label: 'Eventos', href: '/events' },
        { label: 'Acerca De', href: '/about' },
    ]

    return (
        <>
            <Head>
                <title>GREENTALLICA - Blog</title>
                <meta
                    name="description"
                    content="GREENTALLICA: Explora artículos y eventos sobre Fútbol, Música, Viajes, Películas; en nuestra plataforma construida con Next.js, Express y MongoDB."
                />
                <meta property="og:title" content="GREENTALLICA" />
                <meta
                    property="og:description"
                    content="Descubre y gestiona tu contenido favorito con GREENTALLICA."
                />
                <meta property="og:image" content="/images/logo_app.png" />
                <meta property="og:url" content="https://proyecto-final-frontend-alpha.vercel.app/" />
                <link rel="icon" href="/images/logo_app.png" />
            </Head>

            {/* Componente Navbar con props para navegación y autenticación */}
            <Navbar
                logoText="GREENTALLICA"
                links={navLinks}
                activePath={router.pathname}
                isLoggedIn={Boolean(token)}
                username={username}
                onNavigate={(href) => router.push(href)}
                onLogout={logout}
                onLogin={() => router.push('/auth/login')}
            />

            {/* Contenido principal de la página actual */}
            <main className="wrapper">
                {/* Renderizado del componente actual y sus props */}
                <Component {...pageProps} />
            </main>

            {/* Componente Footer global */}
            <Footer />
        </>
    )
}

/**
 * Componente raíz de la aplicación.
 * Gestiona el contexto global de autenticación.
 *
 * @param {Component} Component - Componente específico de la página actual.
 * @param {object} pageProps - Props específicas para el componente de la página actual.
 */
export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AppContent Component={Component} pageProps={pageProps} />
        </AuthProvider>
    )
}