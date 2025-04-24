import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './SliderImages.module.css';

/**
 * Componente visual de slider automático para mostrar una serie de imágenes.
 *
 * @param {string[]} images - Arreglo de URLs de imágenes a mostrar en el slider.
 */
export default function SliderImages({ images }) {
    const [current, setCurrent] = useState(1);
    const [transition, setTransition] = useState(true);
    const autoplayRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Inserta la última imagen al inicio y la primera al final para loop infinito
    const slides = [images[images.length - 1], ...images, images[0]];

    // Detiene el autoplay si existe
    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    // Navega a un slide específico
    const goToSlide = (index) => {
        setCurrent(index);
        setTransition(true);
    };

    // Navega al slide siguiente
    const nextSlide = () => {
        stopAutoplay();
        goToSlide(current + 1);
    };

    // Navega al slide anterior
    const prevSlide = () => {
        stopAutoplay();
        goToSlide(current - 1);
    };

    // Inicia el autoplay al montar el componente
    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            setCurrent((prev) => prev + 1);
            setTransition(true);
        }, 2000);

        return () => clearInterval(autoplayRef.current);
    }, []);

    // Resetea la transición al llegar al final o al inicio del loop
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

    // Eventos para navegación táctil
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
            className={styles['slider']}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Contenedor de imágenes con efecto de transición */}
            <div
                className={styles['slider__track']}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                    transition: transition ? 'transform 0.5s ease-in-out' : 'none',
                }}
            >
                {slides.map((img, index) => (
                    <Image
                        key={index}
                        src={img}
                        alt={`slide-${index}`}
                        className={styles['slider__image']}
                        loading="lazy"
                    />
                ))}
            </div>

            {/* Botones de navegación manual */}
            <button onClick={prevSlide} className={`${styles['slider__btn']} ${styles['slider__btn--prev']}`}>‹</button>
            <button onClick={nextSlide} className={`${styles['slider__btn']} ${styles['slider__btn--next']}`}>›</button>

            {/* Puntos indicadores de navegación */}
            <div className={styles['slider__dots']}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            stopAutoplay();
                            goToSlide(index + 1);
                        }}
                        className={`${styles['slider__dot']} ${current === index + 1 ? styles['slider__dot--active'] : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}
