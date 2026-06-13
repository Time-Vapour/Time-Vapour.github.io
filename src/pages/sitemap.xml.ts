import { getCollection } from "astro:content";
import { getAllTags } from "../utils/posts";

export async function GET({ site }: { site: URL }) {
  const baseUrl = site.toString().replace(/\/$/, "");
  const posts = await getCollection("posts");
  const tags = await getAllTags();
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { path: "/", lastmod: today },
    { path: "/archive/", lastmod: today },
    ...posts.map((post) => ({
      path: `/posts/${post.id}/`,
      lastmod: (post.data.updated ?? post.data.date).toISOString().slice(0, 10)
    })),
    ...tags.map((tag) => ({
      path: `/tags/${encodeURIComponent(tag.toLowerCase())}/`,
      lastmod: today
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
