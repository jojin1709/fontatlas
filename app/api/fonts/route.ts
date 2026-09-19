import { fonts } from "../../../lib/fonts";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ count: fonts.length, fonts });
}
