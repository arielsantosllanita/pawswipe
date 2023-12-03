import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { type: "home" | "favorites" };
};

async function Page({ params }: Props) {
  const session:any = await getServerSession(authOptions);
  if (session.user.role === 'admin') redirect('/admin/home');
  
  return <div>Dashboard {params.type} Page</div>;
}

export default Page;
