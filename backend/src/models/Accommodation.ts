import mongoose, { Schema, Document } from 'mongoose';

export interface IAccommodation extends Document {
  tripId: mongoose.Types.ObjectId;
  hotelName: string;
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  address?: string;
  confirmationNumber?: string;
  notes?: string;
  bookingLink?: string;
}

const AccommodationSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      index: true,
    },
    hotelName: { type: String, required: true },
    city: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    address: String,
    confirmationNumber: String,
    notes: String,
    bookingLink: String,
  },
  { timestamps: true }
);

export const Accommodation = mongoose.model<IAccommodation>(
  'Accommodation',
  AccommodationSchema
);
