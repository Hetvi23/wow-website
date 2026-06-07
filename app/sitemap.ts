import type { MetadataRoute } from "next";
import { getBlogPosts, getProducts } from "@/lib/erpnext";

const SITE = "https://care.autoavengers.com";

// Render on-demand (with revalidation) so the build never blocks on the API.
export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/gallery",
    "/blog",
    "/locate-us",
    "/booking",
  ].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Pull a large first page of dynamic content for the sitemap.
  const [{ data: posts }, products] = await Promise.all([
    getBlogPosts({ page: 1, pageSize: 50 }),
    getProducts(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.published_on ? new Date(p.published_on) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
