import React from "react";
import Home from "./home";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

async function Page({ params }: Props) {
  switch (params.slug) {
    case "home":
      return <Home />
  
    default:
      return notFound();
  }
}

export default Page;
