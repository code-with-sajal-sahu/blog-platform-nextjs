import styles from "./login.module.css"

const LoginPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <button className={`${styles.social_btn} ${styles.google_btn}`}>Sign in with Google</button>
            <button className={`${styles.social_btn} ${styles.github_btn}`}>Sign in with Github</button>
            <button className={`${styles.social_btn} ${styles.facebook_btn}`}>Sign in with Facebook</button>
        </div>
      
    </div>
  )
}

export default LoginPage
