"use client";

import Image from "next/image";
import styles from "./themeToggle.module.css";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div
      className={styles.container}
      onClick={toggleTheme}
      // style={theme === "dark" ? { backgroundColor: "#fff" } : { backgroundColor: "#0f172a" }}
    >
      <Image src="/moon.png" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={theme === "dark" ? {left : 1, backgroundColor: "#0f172a"} : {right : 1, backgroundColor: "#facc15"}}
      ></div>
      <Image src="/sun.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;