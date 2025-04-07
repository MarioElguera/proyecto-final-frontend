import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '@/services/api';
import { AuthContext } from '@/context/AuthContext';

export default function CreateArticlePage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log("payload => ", payload)
                setUserId(payload.id); // <- ID desde el payload del token

            } catch (err) {
                console.error('Token inválido:', err);
                setError('Token inválido. Por favor, vuelve a iniciar sesión.');
            }
        }
    }, [token]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const maxSizeMB = 2;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            alert(`El archivo supera los ${maxSizeMB} MB permitidos`);
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            setImageBase64(`data:${file.type};base64,${base64String}`);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !category) {
            setError('Todos los campos obligatorios deben completarse.');
            return;
        }

        if (!userId) {
            setError('Usuario no autenticado.');
            return;
        }

        try {
            const newArticle = {
                title,
                content,
                category,
                image: imageBase64,
                author: userId
            };

            await createArticle(newArticle, token);
            setSuccess('Artículo creado exitosamente.');
            setError('');

            setTimeout(() => {
                router.push('/articles');
            }, 1000);

        } catch (err) {
            console.error(err);
            setError('Error al crear el artículo.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-10 rounded">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Crear Artículo</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Título *</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Contenido *</label>
                    <textarea
                        className="w-full border rounded p-2 h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Categoría *</label>
                    <select
                        className="w-full border rounded p-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="futbol">Fútbol</option>
                        <option value="viajes">Viajes</option>
                        <option value="musica">Música</option>
                        <option value="peliculas">Películas</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Imagen (máx. 2MB)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Publicar Artículo
                </button>
            </form>
        </div>
    );
}
