import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sajilo Web",
    short_name: "Sajilo Web",
    description:
      "Websites and digital tools for growing local businesses in Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f2740",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
