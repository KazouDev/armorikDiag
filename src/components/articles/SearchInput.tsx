"use client";

import { useDebounce } from "@/hook/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./SearchInput.module.css";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 500);

  const handleSearch = useCallback((newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }
    params.delete("page");
    
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    if (debouncedQuery !== (searchParams.get("q") || "")) {
       handleSearch(debouncedQuery);
    }
  }, [debouncedQuery, handleSearch, searchParams]);

  const resetSearch = () => {
    setQuery("");
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <i className={`fas fa-search ${styles.searchIcon}`} aria-hidden="true"></i>
        <input
          name="search-blog"
          placeholder="Rechercher un article..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          aria-label="Rechercher un article"
        />
        {query && (
          <button 
            onClick={resetSearch} 
            className={styles.clearButton}
            aria-label="Effacer la recherche"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
}
