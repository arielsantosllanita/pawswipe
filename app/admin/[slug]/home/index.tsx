import React from "react";
import Modal from "./addModal";
import animalModel from "@/db/models/animal.model";
import { redirect } from "next/navigation";
import connection from "@/db/connection";
import Table from "./table";
import { revalidatePath } from "next/cache";

type Props = {};

async function Home({}: Props) {
  const addMatch = async (data: any) => {
    "use server";
    await connection();
    await animalModel.create(data);
    revalidatePath('/admin/home', 'page');
    redirect("/admin/home");
  };

  const deleteMatch = async (id: string) => {
    "use server";
    await connection();
    await animalModel.findByIdAndDelete(id);
    revalidatePath('/admin/home', 'page');
    redirect("/admin/home");
  };

  const editMatch = async (obj: any) => {
    "use server";
    await connection();

    const data = { ...obj };
    delete data.id;
    delete data._id;

    await animalModel.findByIdAndUpdate(obj.id, { $set: data });
    revalidatePath('/admin/home', 'page');
    redirect('/admin/home');
  };

  await connection();
  const animals = (await animalModel.find({}).lean()).map((x) => ({
    ...x,
    id: String(x._id),
    _id: String(x._id),
  }));

  return (
    <div className="mt-4">
      <div className="container mx-auto">
        <div className="flex justify-end">
          <Modal addMatch={addMatch} />
        </div>
        <Table data={animals} deleteData={deleteMatch} editData={editMatch} />
      </div>
    </div>
  );
}

export default Home;
