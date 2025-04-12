import React from 'react';
// import '../styles/AboutPage.css';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <main className="about-page">
                <h1 className="about-page__title">Acerca de M.E.</h1>

                {/* Primera tarjeta */}
                <section className="about-page__section">
                    <h2 className="about-page__section-title">Sobre mí</h2>
                    <p className="about-page__section-text">
                        Bienvenido a mi blog, un espacio dedicado a explorar mis pasiones y
                        compartir conocimientos con el mundo. Mi nombre es Mario Eugenio, y
                        este es un proyecto personal para conectar con personas que comparten
                        mis intereses. Aquí encontrarás contenido sobre fútbol, música, viajes
                        y mucho más.
                    </p>
                </section>

                {/* Segunda tarjeta */}
                <section className="about-page__section">
                    <h2 className="about-page__section-title">¿Por qué este blog?</h2>
                    <ul className="about-page__list">
                        <li className="about-page__list-item">
                            <strong>Pasión por el aprendizaje:</strong>
                            &nbsp;Compartir información que inspire y enriquezca.
                        </li>
                        <li className="about-page__list-item">
                            <strong>Conexión:</strong>
                            &nbsp;Crear una comunidad donde todos puedan aportar sus experiencias.
                        </li>
                        <li className="about-page__list-item">
                            <strong>Crecimiento personal:</strong>
                            &nbsp;Explorar nuevas ideas y perspectivas.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
