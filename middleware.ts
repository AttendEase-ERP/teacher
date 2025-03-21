import { NextRequest, NextResponse } from "next/server";

import { retrieveUser } from "./lib/auth/auth";

const protectedRoutes: string[] = ["/"]; // Routes that require authentication
const publicRoutes: string[] = ["/signin", "/signup"]; // Routes for unauthenticated users

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  const session = await retrieveUser();

  if (!session && protectedRoutes.includes(path)) {
    // Redirect unauthenticated users to signin page
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (session && publicRoutes.includes(path)) {
    // Redirect authenticated users away from signin/signup
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Middleware applies to all routes except API, static files, and images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
