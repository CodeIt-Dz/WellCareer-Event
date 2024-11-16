import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes, publicRoutes } from "./data/routes";

async function getAuthFromCookies(request: NextRequest): Promise<string | null> {
  const access_cookie = request.cookies.get("access")
  if (access_cookie) {
    return await (access_cookie.value);
  }
  return null;
}


export async function middleware(request: NextRequest) {
  const access = await getAuthFromCookies(request);
  const pathname = request.nextUrl.pathname
  const isAuthRoute = () => authRoutes.includes(pathname)
  const isProtectedRoute = () => protectedRoutes.includes(pathname)

  if (access && isAuthRoute()) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!access && isProtectedRoute()) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
