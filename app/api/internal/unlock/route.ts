import { NextResponse } from "next/server";

/**
 * POST { "token": "<INTERNAL_SECRET>" } sets httpOnly session cookie for /internal routes.
 * If INTERNAL_SECRET is unset, returns 503 (middleware allows /internal without login in that case).
 */
export async function POST(req: Request) {
  const expected = process.env.INTERNAL_SECRET;
  if (!expected) {
    return NextResponse.json({ error: "Internal access not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token =
    typeof body === "object" && body !== null && "token" in body
      ? String((body as { token?: unknown }).token ?? "")
      : "";

  if (token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("pgb_internal_ok", "1", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
