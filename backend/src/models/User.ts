import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  googleId?: string;
  googleCalendarId?: string;
  googleRefreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    password: String,
    googleId: { type: String, index: true },
    googleCalendarId: String,
    googleRefreshToken: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
