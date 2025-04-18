import React, { useState, useEffect, useRef } from 'react';
import styles from './Carrousel.module.css';

/**
 * CarouselCards Component
 * Carrusel tipo Netflix, muestra múltiples tarjetas a la vez con autoplay, loop infinito y transición suave.
 *
 * Props:
 * - children: Tarjetas o contenido a renderizar.
 * - visibleItemsDesktop: Número de items visibles en escritorio.
 * - visibleItemsTablet: Número de items visibles en tablet.
 * - visibleItemsMobile: Número de items visibles en móvil.
 * - autoplayInterval: Intervalo de autoplay en milisegundos.
 */
export default function Carrousel({
    children,
    visibleItemsDesktop = 4,
    visibleItemsTablet = 2,
    visibleItemsMobile = 1,
    autoplayInterval = 3000,
}) {
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(visibleItemsDesktop);
    const [transition, setTransition] = useState(true);

    const childrenArray = React.Children.toArray(children);

    // Actualiza el número de tarjetas visibles según el ancho de la pantalla
    const updateVisibleItems = () => {
        const width = window.innerWidth;
        if (width <= 600) {
            setVisibleItems(visibleItemsMobile);
        } else if (width <= 1024) {
            setVisibleItems(visibleItemsTablet);
        } else {
            setVisibleItems(visibleItemsDesktop);
        }
    };

    useEffect(() => {
        updateVisibleItems();
        window.addEventListener('resize', updateVisibleItems);
        return () => window.removeEventListener('resize', updateVisibleItems);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [currentIndex, visibleItems, autoplayInterval]);

    // Avanzar al siguiente grupo
    const handleNext = () => {
        setTransition(true);
        setCurrentIndex((prev) => {
            const newIndex = prev + visibleItems;
            return newIndex >= childrenArray.length ? 0 : newIndex;
        });
    };

    // Retroceder al grupo anterior
    const handlePrev = () => {
        setTransition(true);
        setCurrentIndex((prev) => {
            const newIndex = prev - visibleItems;
            return newIndex < 0 ? childrenArray.length - visibleItems : newIndex;
        });
    };

    // Obtiene las tarjetas visibles
    const getVisibleSlides = () => {
        let slides = [];
        for (let i = 0; i < visibleItems; i++) {
            const index = (currentIndex + i) % childrenArray.length;
            slides.push(
                <div key={index} className={styles['carousel__slide']}>
                    {childrenArray[index]}
                </div>
            );
        }
        return slides;
    };

    return (
        <div className={styles['carousel']} ref={containerRef}>
            <div
                className={styles['carousel__track']}
                style={{
                    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                    transition: transition ? 'transform 0.5s ease-in-out' : 'none',
                }}
            >
                {childrenArray.map((child, index) => (
                    <div
                        key={index}
                        className={styles['carousel__slide']}
                        style={{ flex: `0 0 ${100 / visibleItems}%` }}
                    >
                        {child}
                    </div>
                ))}
            </div>

            <button
                onClick={handlePrev}
                className={`${styles['carousel__btn']} ${styles['carousel__btn--prev']}`}
            >
                ‹
            </button>
            <button
                onClick={handleNext}
                className={`${styles['carousel__btn']} ${styles['carousel__btn--next']}`}
            >
                ›
            </button>
        </div>
    );
}
