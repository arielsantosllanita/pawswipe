import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

type Props = {
  params: { type: "home" | "favorites" };
};

async function Page({ params }: Props) {
  const session: any = await getServerSession(authOptions);
  if (session.user.role === "admin") redirect("/admin/home");

  return (
    <div>
      <Navbar menuLinks={[{ link: "/api/auth/signout?callbackUrl=/", label: "Logout" }]}>
        {/* {children} */}
      </Navbar>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#f0f0f0",
            padding: "20px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Like List</h2>
          {/* Add your sidebar content here */}
        </div>

        <div style={{ width: "80%", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <Image src="/browny.jpeg" alt="Dashboard Image" width={300} height={200} />
            </div>
            <p style={{ margin: "5px 0" }}>Name: Browny</p>
            <p style={{ margin: "5px 0" }}>Breed: Aspin</p>
            <p style={{ margin: "5px 0" }}>Gender: Male</p>
            <p style={{ margin: "5px 0" }}>Disabilities: N/A</p>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ width: "150px", color: "white" }}
            >
              DONATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
