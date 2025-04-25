import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Image from 'next/image'
import styles from './SliderImages.module.css'

/**
 * Slider automático para mostrar una serie de imágenes con navegación manual y táctil.
 *
 * @param {{ images: string[] }} props
 * @param {string[]} props.images - URLs de las imágenes a mostrar en el slider.
 * @returns {JSX.Element}
 */
export default function SliderImages({ images }) {
    const [current, setCurrent] = useState(1)
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)

    const autoplayRef = useRef(null)
    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    // Arreglo con loop infinito (última al inicio, primera al final)
    const slides = useMemo(
        () => [images[images.length - 1], ...images, images[0]],
        [images]
    )

    /** Detiene el autoplay si está activo */
    const stopAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current)
            autoplayRef.current = null
        }
    }, [])

    /** Navega a un slide específico y habilita la transición */
    const goToSlide = useCallback(
        (index) => {
            setCurrent(index)
            setIsTransitionEnabled(true)
        },
        []
    )

    /** Muestra el siguiente slide */
    const nextSlide = useCallback(() => {
        stopAutoplay()
        goToSlide(current + 1)
    }, [current, goToSlide, stopAutoplay])

    /** Muestra el slide anterior */
    const prevSlide = useCallback(() => {
        stopAutoplay()
        goToSlide(current - 1)
    }, [current, goToSlide, stopAutoplay])

    // Iniciar autoplay al montar
    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            setCurrent((prev) => prev + 1)
            setIsTransitionEnabled(true)
        }, 2000)
        return () => stopAutoplay()
    }, [stopAutoplay])

    // Maneja el reset en loop infinito sin transición
    useEffect(() => {
        let timeoutId
        if (current === slides.length - 1) {
            timeoutId = setTimeout(() => {
                setIsTransitionEnabled(false)
                setCurrent(1)
            }, 500)
        } else if (current === 0) {
            timeoutId = setTimeout(() => {
                setIsTransitionEnabled(false)
                setCurrent(slides.length - 2)
            }, 500)
        }
        return () => clearTimeout(timeoutId)
    }, [current, slides.length])

    // Eventos táctiles para swipe
    const handleTouchStart = useCallback(({ touches }) => {
        touchStartX.current = touches[0].clientX
    }, [])

    const handleTouchMove = useCallback(({ touches }) => {
        touchEndX.current = touches[0].clientX
    }, [])

    const handleTouchEnd = useCallback(() => {
        const dx = touchStartX.current - touchEndX.current
        if (dx > 50) nextSlide()
        else if (dx < -50) prevSlide()
    }, [nextSlide, prevSlide])

    /** Navega al slide correspondiente al hacer click en un punto */
    const handleDotClick = useCallback(
        (idx) => {
            stopAutoplay()
            goToSlide(idx + 1)
        },
        [goToSlide, stopAutoplay]
    )

    return (
        <div
            className={styles.slider}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={styles.slider__track}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                    transition: isTransitionEnabled
                        ? 'transform 0.5s ease-in-out'
                        : 'none',
                }}
            >
                {slides.map((src, idx) => (
                    <div key={idx} className={styles.slider__slide}>
                        <Image
                            src={src}
                            alt={`Slide ${idx + 1}`}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 80vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className={`${styles.slider__btn} ${styles['slider__btn--prev']}`}
                aria-label="Anterior slide"
            >
                ‹
            </button>

            <button
                onClick={nextSlide}
                className={`${styles.slider__btn} ${styles['slider__btn--next']}`}
                aria-label="Siguiente slide"
            >
                ›
            </button>

            <div className={styles.slider__dots}>
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`${styles.slider__dot} ${current === idx + 1 ? styles['slider__dot--active'] : ''
                            }`}
                        aria-label={`Ir al slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
