import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ruchiwrites.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/writings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const response = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 3600 } });
    if (response.ok) {
      const blogs = await response.json();
      const blogPages: MetadataRoute.Sitemap = blogs.map(
        (blog: { _id: string; date: string }) => ({
          url: `${baseUrl}/writings/${blog._id}`,
          lastModified: new Date(blog.date),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })
      );
      return [...staticPages, ...blogPages];
    }
  } catch {
    // If blog fetch fails, return static pages only
  }

  return staticPages;
}
