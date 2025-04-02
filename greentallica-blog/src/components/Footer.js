
// import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-lg font-semibold text-blue-500">
                    Greentallica Blog
                </div>

                {/* <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="/" className="hover:text-blue-400 transition">Inicio</Link>
                    <Link href="/articles" className="hover:text-blue-400 transition">Artículos</Link>
                    <Link href="/notices" className="hover:text-blue-400 transition">Noticias</Link>
                    <Link href="/about" className="hover:text-blue-400 transition">Acerca de</Link>
                    <Link href="/contact" className="hover:text-blue-400 transition">Contacto</Link>
                </div> */}

                <p className="text-xs text-gray-400 text-center md:text-right">
                    © {new Date().getFullYear()} Mario Elguera. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
