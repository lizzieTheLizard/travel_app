import { Trip } from '../models/Trip';
import { Flight } from '../models/Flight';
import { Accommodation } from '../models/Accommodation';
import { Transportation } from '../models/Transportation';
import { Activity } from '../models/Activity';
import { Task } from '../models/Task';
import { DayItinerary } from '../types';
import mongoose from 'mongoose';

export class ItineraryService {
  async generateDailyItinerary(
    tripId: string,
    date: Date
  ): Promise<DayItinerary | null> {
    try {
      const trip = await Trip.findById(tripId);
      if (!trip) return null;

      // Find the city for this date
      const city = trip.cities.find(
        (c) =>
          c.arrivalDate <= date && date <= c.departureDate
      );

      if (!city) return null;

      const objectId = new mongoose.Types.ObjectId(tripId);

      // Fetch all relevant data for this day
      const [flights, accommodations, transportations, activities, tasks] =
        await Promise.all([
          Flight.find({
            tripId: objectId,
            $or: [
              {
                departureTime: {
                  $gte: new Date(date),
                  $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
              },
              {
                arrivalTime: {
                  $gte: new Date(date),
                  $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
              },
            ],
          }),
          Accommodation.find({
            tripId: objectId,
            checkInDate: { $lte: date },
            checkOutDate: { $gte: date },
          }),
          Transportation.find({
            tripId: objectId,
            $or: [
              {
                departureTime: {
                  $gte: new Date(date),
                  $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
              },
              {
                arrivalTime: {
                  $gte: new Date(date),
                  $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
                },
              },
            ],
          }),
          Activity.find({
            tripId: objectId,
            date: {
              $gte: new Date(date),
              $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            },
          }),
          Task.find({
            tripId: objectId,
            $or: [
              { dueDate: { $lte: date } },
              { dueDate: { $exists: false } },
            ],
          }),
        ]);

      return {
        date,
        city: city.name,
        country: city.country,
        flights,
        accommodations,
        transportations,
        activities,
        tasks,
      };
    } catch (error) {
      console.error('Error generating daily itinerary:', error);
      return null;
    }
  }

  async generateTripItinerary(tripId: string): Promise<DayItinerary[]> {
    try {
      const trip = await Trip.findById(tripId);
      if (!trip) return [];

      const itineraries: DayItinerary[] = [];
      const currentDate = new Date(trip.startDate);

      while (currentDate <= trip.endDate) {
        const itinerary = await this.generateDailyItinerary(
          tripId,
          new Date(currentDate)
        );
        if (itinerary) {
          itineraries.push(itinerary);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return itineraries;
    } catch (error) {
      console.error('Error generating trip itinerary:', error);
      return [];
    }
  }
}
