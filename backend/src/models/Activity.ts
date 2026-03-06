import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  tripId: mongoose.Types.ObjectId;
  title: string;
  city: string;
  date: Date;
  type: 'museum' | 'restaurant' | 'tour' | 'hike' | 'other';
  notes?: string;
  bookingLink?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ['museum', 'restaurant', 'tour', 'hike', 'other'],
      required: true,
    },
    notes: String,
    bookingLink: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
