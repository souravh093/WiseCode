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


DATABASE_URL="postgresql://neondb_owner:npg_WcGBgn1iNpZ5@ep-blue-mountain-a18mwoxz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

JWT_SECRET="a8f9c2e7d4b6h3j5k8l9m2n6p4q7r9s1t3u5v8w2x4y6z9a1b3c5d7e9f2g4h6j8k0l3m5n7p9q2r4s6t8u0v3w5x7y9z2a4b6c8d0e3f5g7h9j2k4l6m8n0p3q5r7s9t2u4v6w8x0z3a5b7c9d2e4f6g8h0j3k5l7m9n2o4p6q8r0s3t5u7v9w2x4y6z8a1b3c5d7e9f2g4h6i8j0k3l5m7n9o2p4q6r8s0t3u5v7w9x2y4z6"
JWT_EXPIRES_IN="7d"
NEXT_URL="http://localhost:3000"