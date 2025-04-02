import ArticleList from '@/components/ArticleList';
import CommentList from '@/components/CommentList';
import SliderImages from '@/components/SliderImages';

const images = [
    '/images/slider_concierto.webp',
    '/images/slider_futbol.webp',
    '/images/slider_peliculas_sp.webp',
    '/images/slider_vinilos.webp',
];

const articles = [
    {
        id: '1',
        title: 'Los Mejores Goles en los Mundiales',
        description: 'Desde el inicio de la Copa Mundial de la FIFA en 1930...',
        image: '/images/slider_peliculas_sp.webp',
    },
    {
        id: '2',
        title: 'Top 10 Álbumes de la Década',
        description: 'Un repaso por los discos que marcaron historia musicalmente...',
        image: '/images/articulo_1_optimizado.jpg',
    },
    {
        id: '3',
        title: 'Viajes Impresionantes en 2025',
        description: 'Te mostramos los lugares más asombrosos que debes visitar este año...',
        image: '/images/slider_concierto.webp',
    },
    {
        id: '4',
        title: 'Viajes Impresionantes en 2025',
        description: 'Te mostramos los lugares más asombrosos que debes visitar este año...',
        image: '/images/slider_concierto.webp',
    }
];

export default function Home() {
    return (
        <>
            <SliderImages images={images} />
            <ArticleList
                articles={articles}
                limit={4}
                layout="list"
                variantCard="horizontal"
            />
            <CommentList />
        </>
    );
}
