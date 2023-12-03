import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
  params: { slug: "home" | "favorites" };
};

async function Page({ params }: Props) {
  const session = await getServerSession(authOptions);
  console.log('SESSION', session);
  
  return <div>Admin {params.slug} Page</div>;
}

export default Page;
