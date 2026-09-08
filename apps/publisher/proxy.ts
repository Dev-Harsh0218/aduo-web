import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/apps",
  "/integration",
  "/revenue",
  "/settings",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!isProtected) return NextResponse.next();

  const signedIn = request.cookies.get("aduo_signed_in")?.value === "true";
  if (signedIn) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apps/:path*",
    "/integration/:path*",
    "/revenue/:path*",
    "/settings/:path*",
  ],
};
