import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPosts } from "@/content/blog";
import { services } from "@/content/services";
import { work } from "@/content/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/privacy",
    "/blog",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified,
  }));

  const projectRoutes = work.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified,
  }));

  const blogRoutes = (await getPosts()).map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
