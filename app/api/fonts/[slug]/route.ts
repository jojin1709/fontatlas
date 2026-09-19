import { getFont } from "../../../../lib/fonts";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const font = getFont(slug);
  if (!font) return NextResponse.json({ error: "Font not found" }, { status: 404 });
  return NextResponse.json(font);
}
