import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getFullArticleById, deleteArticle } from '@/services/api-articles';
import { createComment, updateComment, deleteComment } from '@/services/api-comments';
import { AuthContext } from '@/context/AuthContext';
import styles from './articleDetail.module.css';
import Loading from "@/components/Loading/Loading";
import CommentCard from "@/components/CommentCard/CommentCard";
/* 
  CONSTANTES ESTÁTICAS (UPPER_SNAKE_CASE)
*/
const PAGE_TITLE = 'COMENTARIOS';
const ADD_COMMENT_BUTTON = 'AGREGAR COMENTARIO';
const DELETE_COMMENT_CONFIRM = '¿ESTÁS SEGURO DE QUE DESEAS ELIMINAR ESTE COMENTARIO?';
const DELETE_ARTICLE_CONFIRM = '¿ESTÁS SEGURO DE QUE DESEAS ELIMINAR ESTE ARTÍCULO?';
const COMMENT_AUTHOR_LABEL = 'dice:';
const NO_COMMENTS_MESSAGE = 'AÚN NO HAY COMENTARIOS.';
const EDIT_COMMENT_TEXT = 'EDITAR';
const DELETE_COMMENT_TEXT = 'ELIMINAR';
const COMMENT_MODAL_TITLE_NEW = 'NUEVO COMENTARIO';
const COMMENT_MODAL_TITLE_EDIT = 'EDITAR COMENTARIO';
const COMMENT_MODAL_PLACEHOLDER = 'ESCRIBE TU COMENTARIO AQUÍ...';
const COMMENT_MODAL_CANCEL = 'CANCELAR';
const COMMENT_MODAL_SUBMIT = 'ENVIAR';
const COMMENT_MODAL_SUBMIT_LOADING = 'ENVIANDO...';
const EDIT_ARTICLE_BUTTON = 'EDITAR';
const DELETE_ARTICLE_BUTTON = 'ELIMINAR';

export default function ArticleDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { token, userId, userRole } = useContext(AuthContext);

    // Estados para artículo, carga, error y comentarios
    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estados para manejo de comentarios y modal
    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    // Obtención de datos del artículo (incluye comentarios)
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
        if (id) {
            fetchArticle();
        }
    }, [id]);

    // Manejo de envío de comentario (crear o editar)
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

    // Manejo de eliminación de comentario
    const handleDeleteComment = async (commentId) => {
        if (!window.confirm(DELETE_COMMENT_CONFIRM)) return;
        try {
            await deleteComment(commentId, token);
            fetchArticle();
        } catch (err) {
            alert('Error al eliminar el comentario');
        }
    };

    // Manejo de eliminación de artículo
    const handleDeleteArticle = async () => {
        if (!window.confirm(DELETE_ARTICLE_CONFIRM)) return;
        try {
            await deleteArticle(id, token);
            router.push('/articles/articles');
        } catch (err) {
            alert('Error al eliminar el artículo');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className={styles['article-detail__error']}>{error}</p>;

    const { article, comments } = articleData;
    const canEditOrDeleteArticle = userId === article.author?._id || userRole === 'admin';

    return (
        <div className={styles['article-detail']}>
            {/* Encabezado: título del artículo y botones de acciones */}
            <div className={styles['article-detail__header']}>
                <h1 className={styles['article-detail__title']}>{article.title}</h1>
                {canEditOrDeleteArticle && (
                    <div className={styles['article-detail__actions']}>
                        <button
                            onClick={() => router.push(`/articles/createArticle?id=${article._id}`)}
                            className={styles['article-detail__button--edit']}
                        >
                            {EDIT_ARTICLE_BUTTON}
                        </button>
                        <button
                            onClick={handleDeleteArticle}
                            className={styles['article-detail__button--delete']}
                        >
                            {DELETE_ARTICLE_BUTTON}
                        </button>
                    </div>
                )}
            </div>

            {/* Cuerpo del artículo: imagen y contenido */}
            <div className={styles['article-detail__body']}>
                <div className={styles['article-detail__image-container']}>
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className={styles['article-detail__image']}
                        />
                    )}
                </div>
                <div className={styles['article-detail__content']}>
                    <p className={styles['article-detail__meta']}>
                        Categoría: {article.category} | Autor: {article.author?.username}
                    </p>
                    <p className={styles['article-detail__text']}>{article.content}</p>
                </div>
            </div>

            {/* Sección de comentarios */}
            <hr className={styles['article-detail__divider']} />
            <div className={styles['article-detail__comments-header']}>
                <h2 className={styles['article-detail__comments-title']}>{PAGE_TITLE}</h2>
                {token && (
                    <button
                        className={styles['article-detail__button--add-comment']}
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
                <ul className={styles['article-detail__comment-list']}>
                    {comments.map((c) => {
                        const canManageComment = userId === c.author?._id || userRole === 'admin';
                        return (
                            <li key={c._id} className={styles['article-detail__comment-item']}>
                                {/* <p className={styles['article-detail__comment-author']}>
                                    {c.author?.username} {COMMENT_AUTHOR_LABEL}
                                </p> */}
                                <CommentCard
                                    key={c._id}
                                    comment={c.content}
                                    author={c.author.username}
                                />
                                {canManageComment && (
                                    <div className={styles['article-detail__comment-actions']}>
                                        <button
                                            className={styles['article-detail__button--edit-comment']}
                                            onClick={() => {
                                                setEditingComment(c);
                                                setNewComment(c.content);
                                                setShowModal(true);
                                            }}
                                        >
                                            {EDIT_COMMENT_TEXT}
                                        </button>
                                        <button
                                            className={styles['article-detail__button--delete-comment']}
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
                <p className={styles['article-detail__no-comments']}>{NO_COMMENTS_MESSAGE}</p>
            )}

            {/* Modal para agregar/editar comentario */}
            {showModal && (
                <div className={styles['article-detail__modal']}>
                    <div className={styles['article-detail__modal-content']}>
                        <h3 className={styles['article-detail__modal-title']}>
                            {editingComment ? COMMENT_MODAL_TITLE_EDIT : COMMENT_MODAL_TITLE_NEW}
                        </h3>
                        <textarea
                            className={styles['article-detail__modal-textarea']}
                            rows="4"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={COMMENT_MODAL_PLACEHOLDER}
                        />
                        <div className={styles['article-detail__modal-actions']}>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNewComment('');
                                    setEditingComment(null);
                                }}
                                className={styles['article-detail__modal-button--cancel']}
                            >
                                {COMMENT_MODAL_CANCEL}
                            </button>
                            <button
                                onClick={handleSubmitComment}
                                disabled={submitting}
                                className={styles['article-detail__modal-button--submit']}
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
