"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import styles from "./themeToggle.module.css";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={styles.container}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Image src="/moon.png" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={isDark ? { left: 1, backgroundColor: "#0f172a" } : { right: 1, backgroundColor: "#facc15" }}
      ></div>
      <Image src="/sun.png" alt="" width={14} height={14} />
    </button>
  );
};

export default ThemeToggle;