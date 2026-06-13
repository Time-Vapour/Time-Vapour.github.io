import { site as siteConfig } from "../site";

export function GET({ site }: { site: URL }) {
  const baseUrl = site.toString().replace(/\/$/, "");

  return new Response(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}${siteConfig.rssPath}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
