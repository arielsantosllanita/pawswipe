import connection from "@/db/connection";
import userModel from "@/db/models/user.model";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

type Props = {};

function Signup({}: Props) {
  async function signupHandler(form: FormData) {
    "use server";
    await connection();

    const formKeys = { fullName: "", email: "", password: "", birthday: "", gender: "" };

    for (let i = 0; i < Object.keys(formKeys).length; i++) {
      const x = Object.keys(formKeys)[i];
      let value = form.get(x)!.toString();
      if (x == "password") value = await bcrypt.hash(value, 8);
      if (x == "birthday") value = new Date(value).toISOString();

      formKeys[x as keyof typeof formKeys] = value;
    }

    await userModel.create({ ...formKeys, role: "user" });

    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-md border rounded-lg p-8 bg-white">
        <div className="h-auto">
          {" "}
          {/* Adjust the height here */}
          <div className="flex justify-center items-center">
            <form action={signupHandler} className="w-full">
              <div className="space-y-3">
                {[
                  { key: "fullName", label: "Full name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "password", label: "Password", type: "password" },
                  { key: "birthday", label: "Birthdate", type: "date" },
                ].map((x) => (
                  <label key={x.key} className="form-control">
                    <div className="label">
                      <span className="label-text">{x.label}</span>
                    </div>
                    <input
                      type={x.type}
                      name={x.key}
                      placeholder="Type here"
                      className="input input-bordered"
                      required
                    />
                  </label>
                ))}

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    name="gender"
                    className="select select-bordered"
                    defaultValue={"Male"}
                    required
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: "#E0915F",
                    color: "#ffffff",
                    border: "1px solid #E0915F",
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
