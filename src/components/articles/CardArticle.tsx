import { Article, getAssetUrl } from "@/lib/directus";
import Image from "next/image";
import Link from "next/link";
import styles from "./CardArticle.module.css";

export const CardArticle = ({
  article
} : {
  article: Article
}) => {
  return (
    <div key={article.id} className={styles.articleCard}>
      <Link href={`/blog/${article.slug}`} className={styles.cardLink}>
        {article.cover_image && (
          <div className={styles.cardImageWrapper}>
            <Image
              src={getAssetUrl(article.cover_image, 800)}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.cardImage}
            />
          </div>
        )}
        {!article.cover_image && (
          <div className={styles.cardImagePlaceholder}>
            <i className="fas fa-file-alt fa-2x" aria-hidden="true" />
          </div>
        )}
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <time
              dateTime={article.date_created}
              className={styles.cardDate}
            >
              {new Date(article.date_created).toLocaleDateString(
                "fr-FR",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </time>
          </div>
          <h2 className={styles.cardTitle}>{article.title}</h2>
          <p className={styles.cardDescription}>
            {article.description}
          </p>
          <span className={styles.readMore}>
            Lire l&apos;article{" "}
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  )
}