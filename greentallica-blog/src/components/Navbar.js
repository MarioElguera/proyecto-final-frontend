import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="bg-black text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition">
                    Greentallica
                </Link>

                <nav className="flex space-x-6">
                    <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link href="/articles" className="hover:text-blue-400 transition">Artículos</Link>
                    <Link href="/notices" className="hover:text-blue-400 transition">Noticias</Link>
                    <Link href="/about" className="hover:text-blue-400 transition">Acerca de</Link>
                    <Link href="/contact" className="hover:text-blue-400 transition">Contacto</Link>
                </nav>

                <div className="space-x-4">
                    <Link href="/login" className="px-3 py-1 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                        Iniciar sesión
                    </Link>
                    <Link href="/register" className="px-3 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
                        Registrarse
                    </Link>
                </div>
            </div>
        </header>
    );
}
