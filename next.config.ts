import type { NextConfig } from "next";

/**
 * Baseline headers for a static marketing site.
 * CSP is intentionally a bit loose (`unsafe-inline`) because Next.js 15's
 * runtime and the tiny boot script in layout.tsx both need inline script.
 * Tighten further if/when a nonce-based CSP is wired up via middleware.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "connect-src 'self'",
      "frame-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/demos/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          // Demos are self-contained static sites; they load their own
          // fonts (Google Fonts), photos (Unsplash), and scripts (CDN or
          // self-hosted). Give them a permissive CSP so they render with
          // full styling inside the portfolio iframes instead of plain HTML.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "script-src-elem 'self' 'unsafe-inline' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:",
              "img-src 'self' data: blob: https://images.unsplash.com https://vercel.com",
              "connect-src 'self' https://vercel.com",
              "frame-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
