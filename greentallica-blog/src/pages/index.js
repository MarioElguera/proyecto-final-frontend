import { useEffect, useState } from "react";
import SliderImages from "@/components/SliderImages/SliderImages";
import CommentCard from "@/components/CommentCard/CommentCard";
import Loading from "@/components/Loading/Loading";
import { getAllArticles } from "@/services/api-articles";
import { getAllComments } from "@/services/api-comments";
import CardsContainer from '@/components/CardsContainer/CardsContainer';
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useRouter } from 'next/router';
import { handleApiError } from '@/utils/handleErrors';
// import Carrousel from "@/components/Carrousel/Carrousel";

const images = [
    "/images/slider/slider_concierto.webp",
    "/images/slider/slider_futbol.webp",
    "/images/slider/slider_peliculas_sp.webp",
    "/images/slider/slider_vinilos.webp",
];

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const router = useRouter();

    async function fetchArticles() {
        try {
            const data = await getAllArticles();
            setArticles(data.slice(0, 4));
        } catch (error) {
            const mensajeError = handleApiError(error);
            console.error(mensajeError);
            console.error("Error fetching articles:", error.message);
        } finally {
            setLoadingArticles(false);
        }
    }

    async function fetchComments() {
        try {
            const data = await getAllComments();
            console.log(data)
            setTestimonials(data.slice(0, 4));
        } catch (error) {
            const mensajeError = handleApiError(error);
            console.error(mensajeError);
            console.error("Error fetching comments:", error.message);
        } finally {
            setLoadingComments(false);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchArticles();
                await fetchComments();
            } catch (error) {
                console.error("Error cargando datos en HomePage:", error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div >
            <section className="hero">
                <div className="hero__content">
                    <h1 className="hero__title">
                        <a>Bienvenido </a>
                        <a>Greentallica !</a>
                    </h1>
                    <p className="hero__description">
                        Bienvenido a un blog hecho para compartir pasiones: fútbol, música, cine y viajes. Aquí encontrarás artículos auténticos, comentarios reales y una experiencia hecha con dedicación.
                    </p>
                    {/* <button className="hero__button">Conocer más</button> */}
                </div>
                <div className="hero__image">
                    <SliderImages images={images} />
                </div>
            </section>

            {/* Artículos Destacados */}
            {loadingArticles
                ? (<Loading />)
                : (
                    <CardsContainer
                        columnsDesktop={articles.length}
                        columnsTablet={2}
                        columnsMobile={1}
                        padding={2}
                        backgroundColor="grey"
                    >
                        {articles.length !== 0
                            ? (
                                articles.map(article => (
                                    <ArticleCard
                                        imageSrc={article.image}
                                        altText={article.altText}
                                        title={article.title}
                                        description={article.content}
                                        link={article.link}
                                        variant={'vertical'}
                                        showLink={true}
                                        onLinkClick={() => router.push(`/articles/${article._id}`)}
                                    />
                                ))
                            )
                            : (<p className={styles['comment-list__no-comments']}>No hay artículos.</p>)}
                    </CardsContainer>
                )}

            {/* Comentarios (Testimonios) */}
            {loadingComments
                ? (<Loading />)
                : (
                    <CardsContainer
                        columnsDesktop={articles.length}
                        columnsTablet={2}
                        columnsMobile={1}
                        padding={2}
                        backgroundColor="black"
                    >
                        {testimonials.length !== 0
                            ? (
                                testimonials.map((comment) => (
                                    <CommentCard
                                        key={comment._id}
                                        comment={comment.content}
                                        author={comment.author.username}
                                    />
                                ))
                            )
                            : (<p className={styles['comment-list__no-comments']}>No hay comentarios.</p>)}
                    </CardsContainer>

                    // <Carrousel
                    //     visibleItemsDesktop={2}
                    //     visibleItemsTablet={2}
                    //     visibleItemsMobile={1}
                    //     autoplayInterval={3000}
                    // >
                    //     {testimonials.length !== 0
                    //         ? (
                    //             testimonials.map((comment) => (
                    //                 <CommentCard
                    //                     key={comment._id}
                    //                     comment={comment.content}
                    //                     author={comment.author.username}
                    //                 />
                    //             ))
                    //         )
                    //         : (<p className={styles['comment-list__no-comments']}>No hay comentarios.</p>)}
                    // </Carrousel>
                )}
        </div>
    );
}
