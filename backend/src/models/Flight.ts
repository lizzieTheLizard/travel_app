import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
  tripId: mongoose.Types.ObjectId;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  notes?: string;
}

const FlightSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
      index: true,
    },
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    departureAirport: { type: String, required: true },
    arrivalAirport: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    notes: String,
  },
  { timestamps: true }
);

export const Flight = mongoose.model<IFlight>('Flight', FlightSchema);
