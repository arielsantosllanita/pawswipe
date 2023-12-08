"use client";
import { Animal } from "@/db/models/animal.model";
import format from "date-fns/format";
import Image from "next/image";
import React from "react";
import Modal from "./addModal";

type Props = {
  data: any;
  deleteData: (id: string) => Promise<never>;
  editData: (any: any) => Promise<any>;
};

function Table({ data, deleteData, editData }: Props) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Disabilities</th>
              <th>Euthanization Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((x: Animal) => (
              <tr key={x.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image src={x.photo} alt="animal avatar" width={10} height={10} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{x.name}</div>
                      <div className="text-sm opacity-50">{x.breed}</div>
                    </div>
                  </div>
                </td>
                <td>{x.disablities}</td>
                <td>{format(new Date(x.dateOfEuthanization), "MMM dd, yyyy")}</td>
                <th>
                  {/* <button className="btn btn-primary btn-xs mr-3" onClick={() => {}}>Edit</button> */}
                  <Modal
                    addMatch={editData}
                    defaultData={{...x}}
                    btnStyle="btn-primary btn-xs mr-3"
                    btnText="Edit"
                    mode="EDIT"
                  />
                  <button
                    className="btn btn-error btn-xs"
                    onClick={async () => {
                      deleteData(x.id);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Disabilities</th>
              <th>Euthanization Date</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Table;
