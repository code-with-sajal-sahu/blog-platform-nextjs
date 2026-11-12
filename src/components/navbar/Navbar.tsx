import Image from 'next/image';
import styles from './navbar.module.css';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';
const Navbar = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.social_logos}>
                <Image src="/facebook.png" alt="facebook" width={24} height={24} />
                <Image src="/instagram.png" alt="facebook" width={24} height={24} />
                <Image src="/tiktok.png" alt="facebook" width={24} height={24} />
                <Image src="/youtube.png" alt="facebook" width={24} height={24} />
            </div>
            <div className={styles.logo}>CodersBlog</div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/contact" className={styles.link}>Contact</Link>
                <Link href="/about" className={styles.link}>About</Link>
                <AuthLinks />
            </div>
        </div>
    )
}

export default Navbar;
