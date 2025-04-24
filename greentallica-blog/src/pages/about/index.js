import { useEffect, useState, useRef } from 'react';
import styles from './about.module.css';
import sectionsParallax from '@/utils/about';


export default function AboutParallaxStory() {
    const [currentSection, setCurrentSection] = useState(0);
    const containerRef = useRef(null);
    const videoRefs = useRef([]);

    // Maneja el scroll para activar la sección correspondiente
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

    // Maneja la reproducción de video y el volumen según la sección activa
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

    // Aumenta progresivamente el volumen
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

    // Disminuye progresivamente el volumen y pausa
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
        </div>
    );
}
