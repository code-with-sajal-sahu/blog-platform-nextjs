import Image from 'next/image';
import styles from './navbar.module.css';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';
const Navbar = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.socialLogos}>
                <Image src="/facebook.png" alt="facebook" width={24} height={24} />
                <Image src="/instagram.png" alt="facebook" width={24} height={24} />
                <Image src="/tiktok.png" alt="facebook" width={24} height={24} />
                <Image src="/youtube.png" alt="facebook" width={24} height={24} />
            </div>
            <div className={styles.logo}>CodersBlog</div>
            <div className={`${styles.links} d-flex`}>
                <ThemeToggle />
                <Link href="/">Home</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/about">About</Link>
                <AuthLinks />
            </div>
        </div>
    )
}

export default Navbar;
