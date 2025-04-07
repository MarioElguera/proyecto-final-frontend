import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>&copy; 2025 Personal Blog.</p>
            <p className={styles.text}>All rights reserved.</p>
        </footer>
    );
}
