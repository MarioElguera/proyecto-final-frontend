import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getFullArticleById, deleteArticle } from '@/services/api';
import {
    createComment,
    updateComment,
    deleteComment,
} from '@/services/api-comments';
import { AuthContext } from '@/context/AuthContext';

// ✅ TEXTOS ESTÁTICOS (EN MAYÚSCULA SNAKE_CASE)
const PAGE_TITLE = 'Comentarios';
const ADD_COMMENT_BUTTON = 'Agregar comentario';
const DELETE_COMMENT_CONFIRM = '¿Estás seguro de que deseas eliminar este comentario?';
const DELETE_ARTICLE_CONFIRM = '¿Estás seguro de que deseas eliminar este artículo?';
const COMMENT_AUTHOR_LABEL = 'dice:';
const NO_COMMENTS_MESSAGE = 'Aún no hay comentarios.';
const EDIT_COMMENT_TEXT = 'Editar';
const DELETE_COMMENT_TEXT = 'Eliminar';
const COMMENT_MODAL_TITLE_NEW = 'Nuevo comentario';
const COMMENT_MODAL_TITLE_EDIT = 'Editar comentario';
const COMMENT_MODAL_PLACEHOLDER = 'Escribe tu comentario aquí...';
const COMMENT_MODAL_CANCEL = 'Cancelar';
const COMMENT_MODAL_SUBMIT = 'Enviar';
const COMMENT_MODAL_SUBMIT_LOADING = 'Enviando...';
const EDIT_ARTICLE_BUTTON = 'Editar';
const DELETE_ARTICLE_BUTTON = 'Eliminar';

export default function ArticleDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { token, userId, userRole } = useContext(AuthContext);

    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    const fetchArticle = async () => {
        try {
            const data = await getFullArticleById(id);
            setArticleData(data);
        } catch (err) {
            setError('No se pudo cargar el artículo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchArticle();
    }, [id]);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        try {
            setSubmitting(true);
            if (editingComment) {
                await updateComment(editingComment._id, newComment, token);
            } else {
                await createComment(id, newComment, token);
            }
            setNewComment('');
            setShowModal(false);
            setEditingComment(null);
            fetchArticle();
        } catch (err) {
            alert('Error al enviar comentario');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm(DELETE_COMMENT_CONFIRM)) return;
        try {
            await deleteComment(commentId, token);
            fetchArticle();
        } catch (err) {
            alert('Error al eliminar el comentario');
        }
    };

    const handleDeleteArticle = async () => {
        if (!window.confirm(DELETE_ARTICLE_CONFIRM)) return;
        try {
            await deleteArticle(id, token);
            router.push('/articles');
        } catch (err) {
            alert('Error al eliminar el artículo');
        }
    };

    if (loading) return <p className="text-center mt-8">Cargando artículo...</p>;
    if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

    const { article, comments } = articleData;
    const canEditOrDeleteArticle = userId === article.author?._id || userRole === 'admin';

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow mt-8 rounded">
            {/* Encabezado con acciones */}
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-blue-600">{article.title}</h1>

                {canEditOrDeleteArticle && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push(`/articles/create?id=${article._id}`)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                            {EDIT_ARTICLE_BUTTON}
                        </button>
                        <button
                            onClick={handleDeleteArticle}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            {DELETE_ARTICLE_BUTTON}
                        </button>
                    </div>
                )}
            </div>

            {/* Layout del artículo */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="w-full lg:w-1/2">
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full rounded object-cover max-h-[600px]"
                        />
                    )}
                </div>

                <div className="w-full lg:w-1/2">
                    <p className="text-sm text-gray-600 mb-1">Categoría: {article.category}</p>
                    <p className="text-sm text-gray-600 mb-4">Autor: {article.author?.username}</p>
                    <p className="text-gray-800 whitespace-pre-line break-words">{article.content}</p>
                </div>
            </div>

            {/* Comentarios */}
            <hr className="my-6" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{PAGE_TITLE}</h2>
                {token && (
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={() => {
                            setShowModal(true);
                            setEditingComment(null);
                            setNewComment('');
                        }}
                    >
                        {ADD_COMMENT_BUTTON}
                    </button>
                )}
            </div>

            {comments.length > 0 ? (
                <ul className="space-y-2">
                    {comments.map((c) => {
                        const canManageComment = userId === c.author?._id || userRole === 'admin';
                        return (
                            <li key={c._id} className="border p-3 rounded relative">
                                <p className="text-sm text-gray-500">
                                    {c.author?.username} {COMMENT_AUTHOR_LABEL}
                                </p>
                                <p className="text-gray-800 break-words whitespace-pre-wrap">{c.content}</p>

                                {canManageComment && (
                                    <div className="flex gap-3 mt-2">
                                        <button
                                            className="text-sm text-blue-600 hover:underline"
                                            onClick={() => {
                                                setEditingComment(c);
                                                setNewComment(c.content);
                                                setShowModal(true);
                                            }}
                                        >
                                            {EDIT_COMMENT_TEXT}
                                        </button>
                                        <button
                                            className="text-sm text-red-600 hover:underline"
                                            onClick={() => handleDeleteComment(c._id)}
                                        >
                                            {DELETE_COMMENT_TEXT}
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-gray-600">{NO_COMMENTS_MESSAGE}</p>
            )}

            {/* Modal comentario */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            {editingComment ? COMMENT_MODAL_TITLE_EDIT : COMMENT_MODAL_TITLE_NEW}
                        </h3>
                        <textarea
                            className="w-full border rounded p-2 mb-4"
                            rows={4}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={COMMENT_MODAL_PLACEHOLDER}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNewComment('');
                                    setEditingComment(null);
                                }}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                {COMMENT_MODAL_CANCEL}
                            </button>
                            <button
                                onClick={handleSubmitComment}
                                disabled={submitting}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                {submitting ? COMMENT_MODAL_SUBMIT_LOADING : COMMENT_MODAL_SUBMIT}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
