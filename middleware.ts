import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { countryToRegion } from "@/lib/affiliateTag";

const REGION_COOKIE = "pgb_region";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const internalSecret = process.env.INTERNAL_SECRET;
  if (internalSecret && pathname.startsWith("/internal") && !pathname.startsWith("/internal/login")) {
    const ok = request.cookies.get("pgb_internal_ok")?.value === "1";
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/internal/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  const country = request.headers.get("x-vercel-ip-country") ?? undefined;
  const region = countryToRegion(country);
  const res = NextResponse.next();
  res.cookies.set(REGION_COOKIE, region, {
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
