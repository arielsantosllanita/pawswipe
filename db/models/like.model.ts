import mongoose from 'mongoose';
import { User } from './user.model';
import { Animal } from './animal.model';

export interface Like extends mongoose.Document {
  id: string;
  userId: User;
  animalId: Animal;
}

const UserSchema = new mongoose.Schema<Like>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Like || mongoose.model<Like>('Like', UserSchema);
