import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getFullArticleById, deleteArticle } from '@/services/api-articles';
import { createComment, updateComment, deleteComment } from '@/services/api-comments';
import { AuthContext } from '@/context/AuthContext';
import styles from './articleDetail.module.css';
import Loading from "@/components/Loading/Loading";
import CommentCard from "@/components/CommentCard/CommentCard";

import {
    PAGE_TITLE_COMMENTS,
    ADD_COMMENT_BUTTON,
    DELETE_COMMENT_CONFIRM,
    DELETE_ARTICLE_CONFIRM,
    NO_COMMENTS_MESSAGE,
    EDIT_COMMENT_TEXT,
    DELETE_COMMENT_TEXT,
    COMMENT_MODAL_TITLE_NEW,
    COMMENT_MODAL_TITLE_EDIT,
    COMMENT_MODAL_PLACEHOLDER,
    COMMENT_MODAL_CANCEL,
    COMMENT_MODAL_SUBMIT,
    COMMENT_MODAL_SUBMIT_LOADING,
    EDIT_ARTICLE_BUTTON,
    DELETE_ARTICLE_BUTTON,
} from '@/constants/articles';

export default function ArticleDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { token, userId, userRole } = useContext(AuthContext);

    const [articleData, setArticleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState(''); // 'comment' o 'article'

    // Carga el artículo
    const fetchArticle = async () => {
        try {
            const data = await getFullArticleById(id);
            setArticleData(data);
        } catch {
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

    // Envía comentario nuevo o actualizado
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
        } catch {
            setErrorMessage('Error al enviar el comentario.');
        } finally {
            setSubmitting(false);
        }
    };

    // Elimina comentario
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, token);
            fetchArticle();
        } catch {
            setErrorMessage('Error al eliminar el comentario.');
        }
    };

    // Elimina artículo
    const handleDeleteArticle = async () => {
        try {
            await deleteArticle(id, token);
            router.push('/articles/articles');
        } catch {
            setErrorMessage('Error al eliminar el artículo.');
        }
    };

    // Confirmación de eliminación
    const handleConfirmDelete = async () => {
        if (deleteType === 'comment') {
            await handleDeleteComment(itemToDelete);
        } else if (deleteType === 'article') {
            await handleDeleteArticle();
        }
        setShowConfirmModal(false);
        setItemToDelete(null);
        setDeleteType('');
    };

    if (loading) return <Loading />;
    if (error) return <p className={styles['article-detail__error']}>{error}</p>;

    const { article, comments } = articleData;
    const canEditOrDeleteArticle = userId === article.author?._id || userRole === 'admin';

    return (
        <div className={styles['article-detail']}>
            <div className={styles['article-detail__header']}>
                <h1 className={styles['article-detail__title']}>{article.title}</h1>
                {canEditOrDeleteArticle && (
                    <div className={styles['article-detail__actions']}>
                        <button
                            onClick={() => router.push(`/articles/create?id=${article._id}`)}
                            className={styles['article-detail__button--edit']}
                        >
                            {EDIT_ARTICLE_BUTTON}
                        </button>
                        <button
                            onClick={() => {
                                setItemToDelete(article._id);
                                setDeleteType('article');
                                setShowConfirmModal(true);
                            }}
                            className={styles['article-detail__button--delete']}
                        >
                            {DELETE_ARTICLE_BUTTON}
                        </button>
                    </div>
                )}
            </div>

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

            <hr className={styles['article-detail__divider']} />
            <div className={styles['article-detail__comments-header']}>
                <h2 className={styles['article-detail__comments-title']}>{PAGE_TITLE_COMMENTS}</h2>
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
                                <CommentCard comment={c.content} author={c.author.username} />
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
                                            onClick={() => {
                                                setItemToDelete(c._id);
                                                setDeleteType('comment');
                                                setShowConfirmModal(true);
                                            }}
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

            {/* Modal de confirmación de eliminación */}
            {showConfirmModal && (
                <div className={styles['article-detail__modal']}>
                    <div className={styles['article-detail__modal-content']}>
                        <p>{deleteType === 'comment' ? DELETE_COMMENT_CONFIRM : DELETE_ARTICLE_CONFIRM}</p>
                        <div className={styles['article-detail__modal-actions']}>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className={styles['article-detail__modal-button--cancel']}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className={styles['article-detail__modal-button--submit']}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {errorMessage && <p className={styles['article-detail__error']}>{errorMessage}</p>}
        </div>
    );
}
