"use client";
import { Animal } from "@/db/models/animal.model";
import { imgToBase64 } from "@/lib/imgToBase64";
import _ from "lodash";
import React, { useRef, useState } from "react";

type Props = {
  addMatch: (data: any) => void;
  mode?: string;
  btnStyle?: string;
  btnText?: string;
  defaultData?: any;
};

function Modal({ addMatch, btnStyle, btnText, defaultData = {} }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<any>({ ...defaultData });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof formData?.photo == "object") {
      const b64 = await imgToBase64(formData?.photo);
      addMatch({ ...formData, photo: b64 });
    }
    addMatch(formData);
    window.location.reload();
  };

  return (
    <>
      <button
        className={`btn ${btnStyle || "btn-outline"}`}
        onClick={() => modalRef.current?.showModal()}
      >
        {btnText || "Add"}
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <form onSubmit={submitHandler} className="w-full">
            <div className="space-y-2">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Photo</span>
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] })}
                  className="file-input file-input-bordered w-full"
                  required={_.isEmpty(defaultData)}
                />
              </label>

              {[
                { key: "name", label: "Name", type: "text" },
                { key: "disablities", label: "Disabilities (comma separated)", type: "text" },
                { key: "breed", label: "Breed", type: "text" },
                { key: "gender", label: "Gender", type: "text" },
                { key: "dateOfEuthanization", label: "Euthanization Date", type: "date" },
                {
                  key: "donationType",
                  label: "Donation Type (ex. Gcash, Mastercard)",
                  type: "text",
                },
                { key: "donationAccNum", label: "Donation Account Number", type: "text" },
                { key: "donationHolderName", label: "Donation Account Holder Name", type: "text" },
              ].map((x) => (
                <label key={x.key} className="form-control">
                  <div className="label">
                    <span className="label-text">{x.label}</span>
                  </div>
                  <input
                    type={x.type}
                    name={x.key}
                    value={formData[x.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [x.key]: e.target.value })}
                    className="input input-bordered"
                    required={_.isEmpty(defaultData)}
                  />
                </label>
              ))}

              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
