import { createDirectus, readItems, rest } from "@directus/sdk";

export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  cover_image: string | null;
  status: "draft" | "published";
  date_created: string;
  date_updated: string;
}

export interface DirectusSchema {
  articles: Article[];
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "";

function getClient() {
  if (!DIRECTUS_URL) {
    throw new Error(
      "NEXT_PUBLIC_DIRECTUS_URL n'est pas défini dans .env.local"
    );
  }
  return createDirectus<DirectusSchema>(DIRECTUS_URL).with(rest());
}

export function getAssetUrl(fileId: string | null, width = 1200): string {
  if (!fileId) return "";
  return `${DIRECTUS_URL}/assets/${fileId}?width=${width}&format=webp`;
}

export async function getArticles(limit = 10, page = 1, searchQuery?: string): Promise<{ articles: Article[], hasNextPage: boolean }> {
  const client = getClient();
  
  const queryOptions: Record<string, unknown> = {
    filter: { status: { _eq: "published" } },
    sort: ["-date_created"],
    fields: ["id", "slug", "title", "description", "cover_image", "date_created"],
    limit: limit + 1,
    offset: (page - 1) * limit,
  };

  if (searchQuery) {
    queryOptions.search = searchQuery;
  }

  const results = await client.request(readItems("articles", queryOptions));
  
  const hasNextPage = results.length > limit;
  const articles = (results as unknown as Article[]).slice(0, limit);

  return { articles, hasNextPage };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = getClient();
  const results = await client.request(
    readItems("articles", {
      filter: {
        slug: { _eq: slug },
        status: { _eq: "published" },
      },
      fields: ["id", "slug", "title", "description", "content", "cover_image", "date_created", "date_updated"],
      limit: 1,
    })
  );
  return (results as unknown as Article[])[0] ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const client = getClient();
  const results = await client.request(
    readItems("articles", {
      filter: { status: { _eq: "published" } },
      fields: ["slug"],
      limit: -1,
    })
  );
  return (results as unknown as Pick<Article, "slug">[]).map((a) => a.slug);
}
