import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sajilo Web",
    short_name: "Sajilo Web",
    description:
      "Websites and digital tools for growing local businesses in Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a10",
    theme_color: "#0a0a10",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
