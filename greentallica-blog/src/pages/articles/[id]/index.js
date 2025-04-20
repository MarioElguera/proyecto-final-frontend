import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getArticleById,deleteArticle } from '@/services/api-articles';
import { getCommentsByArticle, createComment, updateComment, deleteComment } from '@/services/api-comments';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading/Loading';
import CommentCard from '@/components/CommentCard/CommentCard';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import styles from './articleDetail.module.css';

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

    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState('');

    // 🔵 Fetch Artículo
    const fetchArticle = async () => {
        try {
            setLoadingArticle(true);
            const data = await getArticleById(id);
            setArticle(data);
        } catch {
            setError('No se pudo cargar el artículo.');
        } finally {
            setLoadingArticle(false);
        }
    };

    // 🔵 Fetch Comentarios
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const data = await getCommentsByArticle(id);
            setComments(data);
        } catch {
            setError('No se pudieron cargar los comentarios.');
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchArticle();
            fetchComments();
        }
    }, [id]);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        setShowModal(false);
        try {
            setLoadingComments(true);
            if (editingComment) {
                await updateComment(editingComment._id, newComment, token);
            } else {
                await createComment(id, newComment, token);
            }
            setNewComment('');
            setEditingComment(null);
            await fetchComments();
        } catch {
            setErrorMessage('Error al enviar el comentario.');
        } finally {
            setLoadingComments(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            setLoadingComments(true);
            await deleteComment(commentId, token);
            await fetchComments();
        } catch {
            setErrorMessage('Error al eliminar el comentario.');
        } finally {
            setLoadingComments(false);
        }
    };

    const handleDeleteArticle = async () => {
        try {
            await deleteArticle(id, token);
            router.push('/articles/articles');
        } catch {
            setErrorMessage('Error al eliminar el artículo.');
        }
    };

    const handleConfirmDelete = async () => {
        setShowConfirmModal(false);
        try {
            if (deleteType === 'comment') {
                await handleDeleteComment(itemToDelete);
            } else if (deleteType === 'article') {
                await handleDeleteArticle();
            }
        } finally {
            setItemToDelete(null);
            setDeleteType('');
        }
    };

    if (loadingArticle) return <Loading />;
    if (error) return <p className={styles['article-detail__error']}>{error}</p>;

    const canEditOrDeleteArticle = userId === article.author?._id || userRole === 'admin';

    return (
        <div className={styles['article-detail']}>

            {/* 🟡 Header */}
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

            {/* 🟠 Cuerpo */}
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

            {/* 🟢 Comentarios */}
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

            {/* 🔵 Lista de comentarios */}
            {loadingComments ? (
                <Loading />
            ) : comments.length > 0 ? (
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

            {/* 🟣 ConfirmModal */}
            <ConfirmModal
                show={showConfirmModal}
                message={deleteType === 'comment' ? DELETE_COMMENT_CONFIRM : DELETE_ARTICLE_CONFIRM}
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmDelete}
            />

            {/* 🟤 Modal para Agregar/Editar Comentario */}
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

            {errorMessage && <p className={styles['article-detail__error']}>{errorMessage}</p>}
        </div>
    );
}
