import { notFound } from "next/navigation";
import React from "react";
import Signin from "./signin";
import Signup from "./signup";

type Props = {
  params: { type: "signin" | "signup" };
};

function Page({ params }: Props) {
  if (!["signin", "signup"].includes(params.type)) return notFound();

  return params.type == "signin" ? <Signin /> : <Signup />;
}

export default Page;
