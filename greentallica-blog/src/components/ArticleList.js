
import ArticleCard from './ArticleCard';

const articles = [
    {
        id: '1',
        title: 'Los Mejores Goles en los Mundiales',
        description: 'Desde el inicio de la Copa Mundial de la FIFA en 1930...',
        imageUrl: '/images/slider_concierto.webp',
    },
    {
        id: '2',
        title: 'Top 10 Álbumes de la Década',
        description: 'Un repaso por los discos que marcaron historia musicalmente...',
        imageUrl: '/images/slider_concierto.webp',
    },
    {
        id: '3',
        title: 'Viajes Impresionantes en 2025',
        description: 'Te mostramos los lugares más asombrosos que debes visitar este año...',
        imageUrl: '/images/slider_concierto.webp',
    },
];

export default function ArticleList() {
    return (
        <section className="py-12 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Últimos artículos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
