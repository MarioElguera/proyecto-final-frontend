import Login from '../components/Login';

export default function Home() {
    return (
        <div>
            <h1>Bienvenido a Greentallica Blog</h1>
            <p>Este es el inicio de tu blog personal.</p>
            <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                Inicia sesión aquí
            </a>
        </div>
    );
}