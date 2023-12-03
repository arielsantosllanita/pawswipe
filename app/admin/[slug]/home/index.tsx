import React from "react";
import AddModal from "./addModal";
import animalModel from "@/db/models/animal.model";
import { redirect,  } from "next/navigation";
import connection from "@/db/connection";

type Props = {};

async function Home({}: Props) {
  const addMatch = async (data: any) => {
    "use server";
    await connection();
    await animalModel.create(data);
    redirect("/admin/home");
  };

  return (
    <div>
      <AddModal addMatch={addMatch} />
    </div>
  );
}

export default Home;
