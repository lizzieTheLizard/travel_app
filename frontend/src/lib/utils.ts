import { Trip, DayItinerary } from '@/types';
import { formatISO } from 'date-fns';

/**
 * Determine which city the user is sleeping in on a given date
 */
export const getCityOnDate = (
  trip: Trip, 
  date: Date
): string | null => {
  const city = trip.cities.find(
    (c) => c.arrivalDate <= date && date <= c.departureDate
  );
  return city ? city.name : null;
};

/**
 * Generate a time string from a Date object
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Calculate duration in hours between two dates
 */
export const calculateDuration = (startDate: Date, endDate: Date): number => {
  return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
};

/**
 * Get all dates between start and end date
 */
export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Group itinerary items by city
 */
export const groupByCity = (itinerary: DayItinerary[]): Map<string, DayItinerary[]> => {
  const grouped = new Map<string, DayItinerary[]>();

  itinerary.forEach((day) => {
    if (!grouped.has(day.city)) {
      grouped.set(day.city, []);
    }
    grouped.get(day.city)!.push(day);
  });

  return grouped;
};

/**
 * Check if a flight involves international travel
 */
export const isInternationalFlight = (departureAirport: string, arrivalAirport: string): boolean => {
  const departureCountry = departureAirport.slice(-2);
  const arrivalCountry = arrivalAirport.slice(-2);
  return departureCountry !== arrivalCountry;
};
