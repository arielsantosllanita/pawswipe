"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

type Props = {};

function Signin({}: Props) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const searchParams = useSearchParams();

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-md border rounded-lg p-8 bg-white">
        <div className="flex justify-end space-x-4 mb-5">
          <Link href={"/home"}>Home</Link>
          <Link href={"/about-us"}>About Us</Link>
        </div>

        <div className="text-center mb-6">
          <p>LOGO HERE</p>
        </div>
        <div>
          {searchParams.get("error") == "CredentialsSignin" && (
            <div role="alert" className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Invalid credentials</span>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Email"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{
                backgroundColor: "#E0915F",
                color: "#ffffff",
                border: "1px solid #E0915F",
              }}
              onClick={async () => {
                signIn("credentials", {
                  callbackUrl: "/dashboard/home",
                  ...formData,
                });
              }}
            >
              Login
            </button>

            <div className="divider">or</div>
            <Link
              href={"/auth/signup"}
              className="btn btn-secondary btn-block"
              style={{ backgroundColor: "#66564B", color: "#ffffff", border: "1px solid #F4C8A9" }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
