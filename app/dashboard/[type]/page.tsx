"use client"; // This is a client component

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  params: { type: "home" | "favorites" };
};

const imagePaths = ["/dog1.jpeg", "/dog2.jpeg", "/dog3.jpeg"];

async function Page({ params }: Props) {
  const session: any = await getServerSession(authOptions);
  if (session.user.role === "admin") redirect("/admin/home");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % imagePaths.length;
    setCurrentImageIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          position: "relative",
        }}
      >
        <Image src={imagePaths[currentImageIndex]} alt="Dashboard Image" width={400} height={300} />
        <button
          onClick={goToPreviousImage}
          style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
        >
          &lt; Previous
        </button>
        <button
          onClick={goToNextImage}
          style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        >
          Next &gt;
        </button>
      </div>
      <div>
        Image {currentImageIndex + 1} of {imagePaths.length}
      </div>
    </div>
  );
}

export default Page;
