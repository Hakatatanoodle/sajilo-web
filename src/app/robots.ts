import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Concept demos are runnable HTML, not real businesses — keep them
      // out of search so they aren't indexed as live shops/gyms.
      disallow: ["/demos/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
