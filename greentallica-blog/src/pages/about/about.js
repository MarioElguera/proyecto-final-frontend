const sections = [
    { video: '/videos/parallax/messi_run.mp4', title: 'Fútbol', description: 'Me encanta el fútbol' },
    { video: '/videos/parallax/metallica_concert.mp4', title: 'Música', description: 'La música me inspira' },
    { video: '/videos/parallax/spiderman_suit.mp4', title: 'Cine', description: 'Fanático del cine' },
    { video: '/videos/parallax/newyork_time_square.mp4', title: 'Viajes', description: 'Viajar es vivir' },
    { video: '/videos/parallax/programacion.mp4', title: 'Programación', description: 'Amo programar' },
];

import { useEffect, useState, useRef } from 'react';
import styles from './about.module.css';

export default function AboutParallaxStory() {
    const [currentSection, setCurrentSection] = useState(0);
    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    // Detecta el scroll y cambia la sección activa
    useEffect(() => {
        function handleScroll() {
            const container = containerRef.current;
            const scrollTop = window.pageYOffset;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;

            const relativeScroll = scrollTop - containerTop;
            const sectionHeight = containerHeight / sections.length;

            const newSection = Math.floor(relativeScroll / sectionHeight);
            if (newSection >= 0 && newSection < sections.length) {
                setCurrentSection(newSection);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    // Cambiar mute de videos y aplicar volumen dinámico
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

    // Aumenta volumen progresivamente
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
        }, 80); // Más suave todavía
    };

    // Disminuye volumen progresivamente y pausa
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
        <div ref={containerRef} className={styles['about-parallax']}>
            {sections.map((section, index) => (
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
        </div>
    );
}

