import { useState, useEffect, useRef } from 'react';

export default function SliderImages({ images }) {
    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);
    const autoplayRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const slides = [images[images.length - 1], ...images, images[0]];

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    const goToSlide = (index) => {
        setCurrent(index);
        setTransition(true);
    };

    const nextSlide = () => {
        stopAutoplay();
        goToSlide(current + 1);
    };

    const prevSlide = () => {
        stopAutoplay();
        goToSlide(current - 1);
    };

    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            setCurrent((prev) => prev + 1);
            setTransition(true);
        }, 2000);
        return () => clearInterval(autoplayRef.current);
    }, []);

    useEffect(() => {
        if (current === slides.length - 1) {
            setTimeout(() => {
                setTransition(false);
                setCurrent(1);
            }, 500);
        }
        if (current === 0) {
            setTimeout(() => {
                setTransition(false);
                setCurrent(slides.length - 2);
            }, 500);
        }
    }, [current, slides.length]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;
        if (distance > 50) {
            stopAutoplay();
            nextSlide();
        } else if (distance < -50) {
            stopAutoplay();
            prevSlide();
        }
    };

    return (
        <div
            className="slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="slider__track"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                    transition: transition ? 'transform 0.5s ease-in-out' : 'none',
                }}
            >
                {slides.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`slide-${index}`}
                        className="slider__image"
                        loading="lazy"
                    />
                ))}
            </div>



            <button onClick={prevSlide} className="slider__btn slider__btn--prev">‹</button>
            <button onClick={nextSlide} className="slider__btn slider__btn--next">›</button>

            <div className="slider__dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            stopAutoplay();
                            goToSlide(index + 1);
                        }}
                        className={`slider__dot ${current === index + 1 ? 'slider__dot--active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
