import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get("Access_Token")?.value;
  if (req.nextUrl.pathname.includes("/login")) {
    if (jwt === undefined) {
      return NextResponse.next();
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(jwtSecret));
      return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname.includes("/")) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(jwtSecret));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login']
};
