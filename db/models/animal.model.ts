import mongoose from "mongoose";

export interface Animal extends mongoose.Document {
  _id: string;
  id: string;
  type: string;
  name: string;
  disablities: string;
  breed: string;
  gender: string;
  dateOfEuthanization: Date;
  photo: string;
  donationType: string;
  donationAccNum: string;
  donationHolderName: string;
}

const schema = new mongoose.Schema<Animal>(
  {
    type: { type: String, default: "Dog" },
    name: { type: String, required: true },
    disablities: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfEuthanization: { type: Date, required: true },
    photo: { type: String, required: true },
    donationType: String,
    donationAccNum: String,
    donationHolderName: String,
  },
  { timestamps: true }
);

export default mongoose.models.Animal || mongoose.model<Animal>("Animal", schema);
