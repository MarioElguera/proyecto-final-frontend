import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard({ article }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <Image
                src={article.imageUrl}
                alt={article.title}
                width={600}
                height={350}
                className="object-cover"
            />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                <p className="mt-3 text-gray-600 text-sm">{article.description}</p>

                <Link
                    href={`/articles/${article.id}`}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Leer más →
                </Link>
            </div>
        </div>
    );
}
