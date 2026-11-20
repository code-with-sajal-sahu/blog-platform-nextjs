"use client";
import { useRouter } from "next/navigation";
import styles from "./pagination.module.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => {
          router.push(`?page=${currentPage - 1}`);
        }}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => {
          router.push(`?page=${currentPage + 1}`);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
