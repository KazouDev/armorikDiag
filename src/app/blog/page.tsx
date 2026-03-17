import { CardArticle } from "@/components/articles/CardArticle";
import Pagination from "@/components/articles/Pagination";
import SearchInput from "@/components/articles/SearchInput";
import { getArticles } from "@/lib/directus";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog – Armorik Diagnostics | Conseils en diagnostic immobilier",
  description:
    "Retrouvez nos articles et conseils sur les diagnostics immobiliers : DPE, amiante, plomb, électricité, gaz... Tout ce qu'il faut savoir pour vendre ou louer sereinement.",
  openGraph: {
    title: "Blog – Armorik Diagnostics",
    description:
      "Conseils et actualités sur les diagnostics immobiliers dans le Trégor.",
    url: "https://armorik-diagnostics.fr/blog",
    type: "website",
    images: [{ url: "/assets/img/logo1.png" }],
  },
  alternates: {
    canonical: "https://armorik-diagnostics.fr/blog",
  },
};

export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : undefined;
  const pageParam = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  const page = parseInt(pageParam, 10) || 1;

  const PAGE_LIMIT = 12;
  const { articles, hasNextPage } = await getArticles(PAGE_LIMIT, page, q);

  return (
    <>
      <header className={styles.blogHeader}>
        <Link href="/" className={styles.backLink}>
          <i className="fas fa-arrow-left" aria-hidden="true" /> Retour au site
        </Link>
        <h1 className={styles.blogTitle}>Notre Blog</h1>
        <p className={styles.blogSubtitle}>
          Conseils, actualités et guides sur les diagnostics immobiliers
        </p>
      </header>

      <main className={styles.blogMain}>
        <SearchInput />

        {articles.length === 0 ? (
          <p className={styles.noArticles}>
            {q ? "Aucun article ne correspond à votre recherche." : "Aucun article disponible pour le moment. Revenez bientôt !"}
          </p>
        ) : (
          <>
            <ul className={styles.articleGrid} role="list">
              {articles.map((article) => (
                <CardArticle key={article.id} article={article} />
              ))}
            </ul>
            <Pagination currentPage={page} hasNextPage={hasNextPage} searchQuery={q} />
          </>
        )}
      </main>
    </>
  );
}
