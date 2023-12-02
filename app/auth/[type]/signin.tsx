import connection from "@/db/connection";
import userModel from "@/db/models/user.model";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { signJWT } from "@/lib/jwt";

type Props = {};

function Signin({}: Props) {
  async function loginHandler(form: FormData) {
    "use server";
    const err = () => redirect("/auth/signin?alert=error&msg=Invalid credentials");
    if (!form.get("email") && !form.get("password")) err();

    await connection();

    const userData = await userModel.findOne({ email: form.get("email") });
    if (!userData) err();

    const passwordMatch = await bcrypt.compare(form.get("password")!.toString(), userData.password);

    if (passwordMatch) {
      const token = await signJWT({ id: userData.id }, process.env.JWT_SECRET_KEY!);
      cookies().set("token", token, { httpOnly: true, path: "/", secure: true });
      redirect("/dashboard/home");
    } else {
      err();
    }
  }

  return (
    <div className="md:w-4/5 mx-auto grid grid-cols-2 gap-4 place-content-center h-screen">
      <div>
        <p className="text-center">LOGO HERE</p>
      </div>

      <div>
        <form action={loginHandler}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <div className="divider">or</div>
            <Link href={"/auth/signup"} className="btn btn-secondary btn-block">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
