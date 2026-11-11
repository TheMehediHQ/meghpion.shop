import mongoose, { Document, Schema } from 'mongoose';
import { USER_ROLES } from '@meghpiyon/shared';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin' | 'moderator';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, unique: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: 'customer' },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
