import Link from 'next/link';

export default function ArticleCard({ article, variant = 'vertical' }) {
    const isHorizontal = variant === 'horizontal';

    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition
        ${isHorizontal ? 'flex flex-row items-center gap-4 p-4' : 'flex flex-col'}
      `}
        >
            <img
                src={article.image}
                alt={article.title}
                className={`object-cover 
          ${isHorizontal ? 'w-40 h-28 rounded-md' : 'w-full h-52'}
        `}
            />

            <div className={`${isHorizontal ? 'flex-1' : 'p-4'}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{article.description}</p>

                <Link href={`/articles/${article.id}`}>
                    <span className={`font-semibold ${article.color ? article.color : 'text-blue-600'} hover:underline`}>
                        Leer más
                    </span>
                </Link>
            </div>
        </div>
    );
}
