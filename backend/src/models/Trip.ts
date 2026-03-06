import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  countries: string[];
  cities: ICityStop[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICityStop {
  id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  arrivalDate: Date;
  departureDate: Date;
  notes?: string;
}

const CityStopSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  notes: String,
});

const TripSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    countries: [String],
    cities: [CityStopSchema],
  },
  { timestamps: true }
);

export const Trip = mongoose.model<ITrip>('Trip', TripSchema);
