import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/work", "/services", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified,
    })
  );

  const projectRoutes = work.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...projectRoutes];
}
