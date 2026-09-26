import { getFont, getFontFallback, googleCssUrl } from "../../../../lib/fonts";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const font = getFont(slug);
  if (!font) return new Response("/* Font not found */", { status: 404, headers: { "content-type": "text/css; charset=utf-8" } });
  const fallback = getFontFallback(font.category);
  const css = `/* FontAtlas CSS endpoint — upstream font delivery: Google Fonts */\n@import url("${googleCssUrl(font)}");\n\n.fontatlas-${font.slug} {\n  font-family: "${font.family.replaceAll('"','\\"')}", ${fallback};\n}`;
  return new Response(css, { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=3600, s-maxage=86400" } });
}
