import mongoose, { Schema, Document } from 'mongoose';

export interface ITransportation extends Document {
  tripId: mongoose.Types.ObjectId;
  fromCity: string;
  toCity: string;
  type: 'train' | 'bus' | 'car' | 'ferry' | 'other';
  departureTime: Date;
  arrivalTime: Date;
  notes?: string;
}

const TransportationSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      index: true,
    },
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    type: {
      type: String,
      enum: ['train', 'bus', 'car', 'ferry', 'other'],
      required: true,
    },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    notes: String,
  },
  { timestamps: true }
);

export const Transportation = mongoose.model<ITransportation>(
  'Transportation',
  TransportationSchema
);
