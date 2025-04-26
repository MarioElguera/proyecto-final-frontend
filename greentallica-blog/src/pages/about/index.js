/**
 * Página 'Acerca de' con efecto parallax - Muestra videos y textos sincronizados al hacer scroll.
 */

import { useEffect, useState, useRef } from 'react';
import styles from './about.module.css';
import sectionsParallax from '@/utils/about';

export default function AboutParallaxStory() {
    // Estado para controlar qué sección está activa
    const [currentSection, setCurrentSection] = useState(0);

    // Referencias a contenedor principal y a los videos
    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    /**
     * Efecto para manejar el cambio de sección en función del scroll.
     */
    useEffect(() => {
        function handleScroll() {
            const container = containerRef.current;
            const scrollTop = window.pageYOffset;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;

            const relativeScroll = scrollTop - containerTop;
            const sectionHeight = containerHeight / sectionsParallax.length;

            const newSection = Math.floor(relativeScroll / sectionHeight);
            if (newSection >= 0 && newSection < sectionsParallax.length) {
                setCurrentSection(newSection);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Efecto para controlar reproducción y volumen de videos según sección activa.
     */
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === currentSection) {
                fadeInVolume(video);
                video.play();
            } else {
                fadeOutVolume(video);
            }
        });
    }, [currentSection]);

    /**
     * Aumenta progresivamente el volumen del video activo.
     *
     * @param {HTMLVideoElement} video - Video que debe aumentar su volumen.
     */
    const fadeInVolume = (video) => {
        video.muted = false;
        let vol = 0;
        video.volume = 0;
        const fadeIn = setInterval(() => {
            if (vol < 1) {
                vol += 0.05;
                video.volume = Math.min(vol, 1);
            } else {
                clearInterval(fadeIn);
            }
        }, 80);
    };

    /**
     * Reduce progresivamente el volumen y pausa el video inactivo.
     *
     * @param {HTMLVideoElement} video - Video que debe disminuir su volumen y pausarse.
     */
    const fadeOutVolume = (video) => {
        let vol = video.volume;
        const fadeOut = setInterval(() => {
            if (vol > 0) {
                vol -= 0.1;
                video.volume = Math.max(vol, 0);
            } else {
                clearInterval(fadeOut);
                video.pause();
                video.muted = true;
            }
        }, 50);
    };

    return (
        <section ref={containerRef} className={styles['about-parallax']}>

            {/* Renderizado de cada sección parallax */}
            {sectionsParallax.map((section, index) => (
                <div
                    key={index}
                    className={`${styles['about-parallax__section']} ${currentSection === index ? styles['about-parallax__section--active'] : ''}`}
                >
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={section.video}
                        className={`${styles['about-parallax__video']} ${currentSection === index ? styles['about-parallax__video--active'] : ''}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div
                        className={`${styles['about-parallax__overlay']} ${currentSection === index ? styles['about-parallax__overlay--active'] : ''}`}
                    >
                        <h2 className={styles['about-parallax__title']}>{section.title}</h2>
                        <p className={styles['about-parallax__description']}>{section.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
