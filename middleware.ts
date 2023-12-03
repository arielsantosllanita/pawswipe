import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return (<any>token?.user)?.role === "admin";
      }

      // if (req.nextUrl.pathname.startsWith("/dashboard")) {
      //   return (<any>token?.user)?.role === "user";
      // }

      return Boolean(token);
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
