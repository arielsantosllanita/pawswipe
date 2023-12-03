import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  fullName: string;
  password: string;
  email: string;
  birthday: Date;
  gender: 'Male' | 'Female';
  role?: string;
}

const schema = new mongoose.Schema<User>(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    role: { type: String, enum: ['user', 'admin'], required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>('User', schema);
