import ArticleCard from './ArticleCard';

export default function ArticleList({
    articles = [],
    limit,
    category,
    layout = 'grid',     // 'grid' o 'list'
    variantCard = 'vertical' // 'vertical' o 'horizontal'
}) {
    let filtered = [...articles];

    if (category) {
        filtered = filtered.filter((art) => art.category === category);
    }

    if (limit) {
        filtered = filtered.slice(0, limit);
    }

    // Agrupar de 2 en 2 si el layout es "list"
    const groupedArticles =
        layout === 'list'
            ? filtered.reduce((acc, curr, index) => {
                const groupIndex = Math.floor(index / 2);
                acc[groupIndex] = acc[groupIndex] || [];
                acc[groupIndex].push(curr);
                return acc;
            }, [])
            : [];

    return (
        <div className="px-4 py-8">
            {layout === 'list' ? (
                groupedArticles.map((group, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 mb-6">
                        {group.map((article) => (
                            <div key={article.id} className="flex-1">
                                <ArticleCard article={article} variant={variantCard} />
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((article) => (
                        <ArticleCard key={article.id} article={article} variant={variantCard} />
                    ))}
                </div>
            )}
        </div>
    );
}
