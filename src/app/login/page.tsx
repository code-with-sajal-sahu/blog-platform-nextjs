"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PageLoader from "@/components/pageLoader/PageLoader";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return <PageLoader/>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={`${styles.social_btn} ${styles.google_btn}`}
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
        <button className={`${styles.social_btn} ${styles.github_btn}`} onClick={() => signIn("github")}>
          Sign in with Github
        </button>
        <button className={`${styles.social_btn} ${styles.facebook_btn}`}>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
