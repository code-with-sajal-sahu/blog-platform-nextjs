"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const {status} = useSession();
  const isAuthenticated = status === "authenticated"; // Replace with your authentication logic
  useEffect(() => {
    if (open) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }

    return () => {
      document.body.classList.remove("drawer-open");
    };
  }, [open]);  
  return (
    <>
      {isAuthenticated ? (
        <>
          <Link href="/write-blog" className={styles.link}>Write</Link>
          <span className={`${styles.logout_link} ${styles.link}`} onClick={()=>{signOut()}}>Logout</span>
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
