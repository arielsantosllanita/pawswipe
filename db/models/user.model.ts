import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  birthday: Date;
  gender: 'Male' | 'Female';
}

const schema = new mongoose.Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>('User', schema);
