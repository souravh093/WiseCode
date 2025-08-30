import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TJwtPayload } from "./types/auth.types";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie
  const token = request.cookies.get("auth-token")?.value;

  console.log(token, "token");

  // Public paths that don't require authentication
  const publicPaths = ["/", "/api/auth/login", "/api/auth/logout"];

  // API routes that don't require authentication
  const isPublicApiRoute = pathname.startsWith("/api/auth/");

  // Protected paths
  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If it's a public path or public API route, allow access
  if (publicPaths.includes(pathname) || isPublicApiRoute) {
    // If user is already logged in and tries to access root (/), redirect to dashboard
    if (pathname === "/" && token) {
      try {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
          jwt.verify(token, jwtSecret) as TJwtPayload;
          // Token is valid, redirect to dashboard
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (error) {
        // Token is invalid, continue to login page
        console.log("Invalid token, continuing to login page");
      }
    }
    return NextResponse.next();
  }

  // For protected paths, check if user is authenticated
  if (isProtectedPath) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error("JWT_SECRET is not set");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Verify token
      const payload = jwt.verify(token, jwtSecret) as TJwtPayload;

      // Add user data to request headers for use in API routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.id || "");
      requestHeaders.set("x-user-email", payload.email);
      requestHeaders.set("x-user-role", payload.role);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
