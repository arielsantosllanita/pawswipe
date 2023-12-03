import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if ((<any>req.nextauth?.token?.user)?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/home", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return (<any>token?.user)?.role === "admin";
        }

        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
