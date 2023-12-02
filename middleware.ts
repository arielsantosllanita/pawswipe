import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./lib/jwt";
import userModel from "./db/models/user.model";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authError = function (type: string, msg: string) {
      return NextResponse.redirect(new URL(`/auth/signin?alert=${type}&msg=${msg}`, request.url));
    };

    if (request.cookies.has("token")) {
      const token = request.cookies.get("token")!.value;
      const parsedToken = await verifyJWT(token, process.env.JWT_SECRET_KEY!);

      if (parsedToken?.id) {
        const user = await userModel.findById(parsedToken.id);

        if (user) {
          // TODO: ADD USER TO SESSION
          
          return NextResponse.next();
        } else {
          authError("error", "Invalid token");
        }
      } else {
        authError("error", "Invalid token");
      }
    } else {
      authError("error", "Missing token");
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
