import {
  getAllSlugs,
  getArticleBySlug,
  getAssetUrl,
  type Article,
} from "@/lib/directus";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable – Armorik Diagnostics" };
  }

  const imageUrl = article.cover_image
    ? getAssetUrl(article.cover_image, 1200)
    : "/assets/img/logo1.png";

  return {
    title: `${article.title} – Armorik Diagnostics`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://armorik-diagnostics.fr/blog/${article.slug}`,
      type: "article",
      publishedTime: article.date_created,
      modifiedTime: article.date_updated,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      siteName: "Armorik Diagnostics",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://armorik-diagnostics.fr/blog/${article.slug}`,
    },
  };
}

function ArticleJsonLd({ article }: { article: Article }) {
  const imageUrl = article.cover_image
    ? getAssetUrl(article.cover_image, 1200)
    : "https://armorik-diagnostics.fr/assets/img/logo1.png";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    url: `https://armorik-diagnostics.fr/blog/${article.slug}`,
    datePublished: article.date_created,
    dateModified: article.date_updated,
    author: {
      "@type": "Organization",
      name: "Armorik Diagnostics",
      url: "https://armorik-diagnostics.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Armorik Diagnostics",
      logo: {
        "@type": "ImageObject",
        url: "https://armorik-diagnostics.fr/assets/img/logo1.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://armorik-diagnostics.fr/blog/${article.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const imageUrl = article.cover_image
    ? getAssetUrl(article.cover_image, 1200)
    : null;

  return (
    <>
      <ArticleJsonLd article={article} />

      <header className={styles.articleHeader}>
        <div className={styles.headerContent}>
          <nav aria-label="Fil d'ariane" className={styles.breadcrumb}>
            <Link href="/">Accueil</Link>
            <span aria-hidden> / </span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden> / </span>
            <span aria-current="page">{article.title}</span>
          </nav>

          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleDescription}>{article.description}</p>

          <div className={styles.articleMeta}>
            <span>
              Publié le{" "}
              <time dateTime={article.date_created}>
                {new Date(article.date_created).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
            {article.date_updated && article.date_updated !== article.date_created && (
              <span>
                · Mis à jour le{" "}
                <time dateTime={article.date_updated}>
                  {new Date(article.date_updated).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </span>
            )}
          </div>
        </div>
      </header>

      <main className={styles.articleMain}>
        <article className={styles.articleContent}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => (
                <img src={src} alt={alt ?? ""} style={{ maxWidth: "100%", height: "auto" }} />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </main>
    </>
  );
}
