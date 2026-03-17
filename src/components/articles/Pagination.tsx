import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  searchQuery?: string;
}

export default function Pagination({ currentPage, hasNextPage, searchQuery }: PaginationProps) {
  if (currentPage <= 1 && !hasNextPage) {
    return null;
  }

  const generateUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", page.toString());
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    const query = params.toString();
    return query ? `?${query}` : "?";
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination Navigation">
      {currentPage > 1 ? (
        <Link href={generateUrl(currentPage - 1)} className={styles.paginationButton}>
          <i className="fas fa-chevron-left" aria-hidden="true"></i> Page Précédente
        </Link>
      ) : (
        <span className={`${styles.paginationButton} ${styles.disabled}`}>
          <i className="fas fa-chevron-left" aria-hidden="true"></i> Page Précédente
        </span>
      )}

      <span className={styles.pageIndicator}>Page {currentPage}</span>

      {hasNextPage ? (
        <Link href={generateUrl(currentPage + 1)} className={styles.paginationButton}>
          Page Suivante <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </Link>
      ) : (
        <span className={`${styles.paginationButton} ${styles.disabled}`}>
          Page Suivante <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </span>
      )}
    </nav>
  );
}
