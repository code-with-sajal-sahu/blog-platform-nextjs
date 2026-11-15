import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";
import Logo from "../logo/Logo";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info_section}>
        <div className={styles.logo}>
          {/* <Image src="/logo.png" alt="CB" width={50} height={50} /> */}
          <Logo />
          <h1 className={styles.logo_text}>CodersBlog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nam,
          mollitia harum perferendis voluptatem dolorem reprehenderit aut ab
          voluptatibus qui reiciendis laborum omnis eius possimus nesciunt,
          expedita eaque dolores. Nisi.
        </p>
        <div className={styles.social_icons}>
          <Image src="/facebook.png" alt="facebook" width={18} height={18} />
          <Image src="/instagram.png" alt="facebook" width={18} height={18} />
          <Image src="/tiktok.png" alt="facebook" width={18} height={18} />
          <Image src="/youtube.png" alt="facebook" width={18} height={18} />
        </div>
      </div>
      <div className={styles.link_section}>
        <div className={styles.list}>
            <span className={styles.list_title}>Links</span>
            <Link href="/">Home</Link>
            <Link href="/">Blog</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
            <span className={styles.list_title}>Tags</span>
            <Link href="/">Style</Link>
            <Link href="/">Coding</Link>
            <Link href="/">Fashion</Link>
            <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
            <span className={styles.list_title}>Social</span>
            <Link href="/">Facebook</Link>
            <Link href="/">Instagram</Link>
            <Link href="/">Tiktok</Link>
            <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
