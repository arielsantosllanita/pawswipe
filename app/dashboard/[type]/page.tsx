import React from "react";

type Props = {
  params: { type: "home" | "favorites" };
};

function Page({ params }: Props) {
  return <div>Dashboard {params.type} Page</div>;
}

export default Page;
