import { getCollection } from "astro:content";

export async function getSortedPosts() {
  const posts = await getCollection("posts");

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllTags() {
  const posts = await getSortedPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getTagPath(tag: string) {
  return `/tags/${encodeURIComponent(tag.toLowerCase())}/`;
}

export function getPostPath(id: string) {
  return `/posts/${id}/`;
}
