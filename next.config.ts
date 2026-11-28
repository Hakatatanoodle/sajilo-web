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
          // Demos are self-contained static sites (concept builds, not
          // production apps). They load their own fonts (Google Fonts),
          // photos (Unsplash), and scripts (CDN or self-hosted), and may be
          // embedded inside the portfolio iframes. A strict CSP strips all of
          // that away and leaves a plain HTML page, so give them a permissive
          // policy instead — no CSP is safer than a broken one here.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://images.unsplash.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://images.unsplash.com",
              "script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://images.unsplash.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://images.unsplash.com",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://images.unsplash.com",
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data: https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://images.unsplash.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://vercel.com https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net",
              "connect-src 'self' https://vercel.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com https://images.unsplash.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
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
