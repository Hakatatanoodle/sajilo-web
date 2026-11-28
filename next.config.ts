import type { NextConfig } from "next";

/**
 * Headers for a static marketing site.
 *
 * Browsers enforce EVERY Content-Security-Policy header they receive, so two
 * CSP headers on one response = the strictest wins on every directive. The
 * site CSP therefore applies to everything EXCEPT /demos/, and /demos/ gets
 * its own policy below. Never let both match the same path.
 *
 * Site CSP is a bit loose (`unsafe-inline`) because Next.js 15's runtime and
 * the tiny boot script in layout.tsx need inline script. Tighten later with a
 * nonce-based CSP via middleware.
 */
const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const siteCsp = [
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
].join("; ");

/**
 * Demos are self-contained static sites (concept builds). They self-host
 * their scripts and load only Google Fonts + Unsplash photos from outside.
 * Nothing else is allowed — in particular NOT vercel.com: if a demo asset ever
 * gets redirected to vercel.com/sso-api the fix is the iframe sandbox /
 * Deployment Protection, not widening this list.
 */
const demoCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: baseHeaders },
      {
        // everything except /demos/
        source: "/((?!demos/).*)",
        headers: [{ key: "Content-Security-Policy", value: siteCsp }],
      },
      {
        source: "/demos/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Content-Security-Policy", value: demoCsp },
        ],
      },
    ];
  },
};

export default nextConfig;
