import { NextRequest, NextResponse } from "next/server";
import { loggedUser } from "./service/auth";

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const currentUser = await loggedUser();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!currentUser?.email) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
};

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
