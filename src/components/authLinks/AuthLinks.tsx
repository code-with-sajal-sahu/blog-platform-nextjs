"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./authLinks.module.css";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = false; // Replace with your authentication logic
  return (
    <>
      {isAuthenticated ? (
        <>
          <Link href="/write" className={styles.link}>Write</Link>
          <span className={`${styles.logout_link} ${styles.link}`}>Logout</span>
        </>
      ) : (
        <Link href="/login" className={styles.link}>Login</Link>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      {open && (
        <div className={styles.mobile_menu}>
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about">About</Link>
          {isAuthenticated ? (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.logout_link}>Logout</span>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
