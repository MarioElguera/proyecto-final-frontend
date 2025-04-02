import { useState, useEffect, useCallback } from 'react';

export default function SliderImages({ images }) {
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const nextSlide = useCallback(() => {
        setLoaded(false);
        setCurrent((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        setLoaded(false);
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <img
                src={images[current]}
                alt={`slide-${current}`}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'
                    }`}
                loading="lazy"
            />

            {loaded && (
                <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center text-white px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi Blog</h1>
                    <p className="text-lg max-w-xl">
                        Explora lo mejor del fútbol, películas, música y conciertos.
                    </p>
                </div>
            )}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded hover:bg-opacity-70 transition"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded hover:bg-opacity-70 transition"
            >
                ›
            </button>
        </div>
    );
}
