/** Resolve a path stored inside public/ so it works on GitHub Pages subpaths and Vercel. */
export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}