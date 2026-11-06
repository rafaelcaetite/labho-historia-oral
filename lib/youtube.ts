/**
 * Extrai o ID do YouTube a partir de formatos variados de URL:
 * - https://www.youtube.com/watch?v=aqz-KE-bpKQ
 * - https://youtu.be/aqz-KE-bpKQ
 * - https://www.youtube.com/embed/aqz-KE-bpKQ
 * - https://www.youtube.com/shorts/aqz-KE-bpKQ
 */
export function extractYouTubeId(url: string | undefined | null): string {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/,
  );
  return match ? match[1] : "";
}
