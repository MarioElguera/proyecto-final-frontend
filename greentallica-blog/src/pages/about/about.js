import React from 'react';
import Image from 'next/image';
import SimpleParallax from "simple-parallax-js";
import styles from './about.module.css';

export default function AboutSection() {
    return (
        <div className={styles['about-section']}>
            <SimpleParallax scale={1.2} delay={0.2} transition="cubic-bezier(0,0,0,1)">
                <Image
                    src="/images/barcelona.jpg"
                    alt="Fondo parallax"
                    width={1024}
                    height={768}
                    className={styles['parallax-img']}
                />
            </SimpleParallax>

            <div className={styles['about-section__content']}>
                <h2 className={styles['about-section__title']}>Sobre mí</h2>
                <p>Hola, soy Mario Eugenio... 👋</p>
            </div>
        </div>
    );
}
