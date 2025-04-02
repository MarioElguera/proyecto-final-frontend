import ArticleList from '@/components/ArticleList';
import CommentList from '@/components/CommentList';
import SliderImages from '@/components/SliderImages';

const images = [
    '/images/slider_concierto.webp',
    '/images/slider_futbol.webp',
    '/images/slider_peliculas_sp.webp',
    '/images/slider_vinilos.webp',
];

export default function Home() {
    return (
        <>
            <SliderImages images={images} />
            <ArticleList />
            <CommentList />
        </>
    );
}
