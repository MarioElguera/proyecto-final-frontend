import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFullArticleById } from '@/services/api';

export default function ArticleDetailPage() {
    const router = useRouter();
    const { id } = router.query;

    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        async function fetchArticle() {
            try {
                const data = await getFullArticleById(id);
                setArticleData(data);
            } catch (err) {
                setError('No se pudo cargar el artículo.');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    if (loading) return <p className="text-center mt-8">Cargando artículo...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    const { article, comments } = articleData;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-8 rounded">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">{article.title}</h1>
            <p className="text-gray-600 text-sm mb-2">Categoría: {article.category}</p>
            <p className="text-gray-600 text-sm mb-4">Autor: {article.author?.username}</p>

            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full mb-6 rounded"
                />
            )}

            <p className="text-gray-800 whitespace-pre-line mb-6">{article.content}</p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold mb-2">Comentarios</h2>
            {comments.length > 0 ? (
                <ul className="space-y-2">
                    {comments.map((c) => (
                        <li key={c._id} className="border p-3 rounded">
                            <p className="text-sm text-gray-500">
                                {c.author?.username} dice:
                            </p>
                            <p className="text-gray-800">{c.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Aún no hay comentarios.</p>
            )}
        </div>
    );
}
