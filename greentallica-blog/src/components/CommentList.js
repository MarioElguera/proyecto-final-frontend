const comments = [
    {
        id: 1,
        username: 'Juan P.',
        text: '¡Increíble cómo este blog combina mi amor por el fútbol y la música! Me encantó el artículo sobre el regreso de los vinilos.',
    },
    {
        id: 2,
        username: 'Carla G.',
        text: 'Gracias por compartir tus conocimientos sobre los mejores conciertos del año. ¡Espero no perderme el próximo!',
    },
    {
        id: 3,
        username: 'Daniel T.',
        text: 'Me encanta el enfoque personal que le das a los artículos de fútbol. ¡Sigue así!',
    },
];

export default function CommentList() {
    return (
        <section className="py-12 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
                Lo que dicen nuestros lectores
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
                    >
                        <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.1 0-9.3 1.6-9.3 4.9v1.5h18.6v-1.5c0-3.3-6.2-4.9-9.3-4.9z" />
                            </svg>
                        </div>

                        <p className="text-gray-700 italic">"{comment.text}"</p>
                        <p className="mt-4 font-semibold text-gray-800">– {comment.username}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
