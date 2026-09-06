/**
 * Ambient module declarations for non-TS imports.
 *
 * TypeScript 5.9+ (diagnostic TS2882) requires side-effect imports like
 * `import "./globals.css"` to resolve to a type declaration. Next.js
 * normally provides these via next-env.d.ts; this file guarantees the
 * declaration exists regardless of TypeScript version.
 */
declare module "*.css";
