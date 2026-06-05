import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const pathname = req.nextUrl.pathname;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup"],
};
