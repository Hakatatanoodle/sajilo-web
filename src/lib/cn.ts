/**
 * Tiny class-name helper — keeps conditional classes readable without
 * pulling in a dependency.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
