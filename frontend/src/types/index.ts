// Trip types
export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  countries: string[];
  cities: CityStop[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CityStop {
  id: string;
  name: string;
  country: string;
  arrivalDate: Date;
  departureDate: Date;
  notes?: string;
}

// Travel items
export interface Flight {
  id: string;
  tripId: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  notes?: string;
}

export interface Accommodation {
  id: string;
  tripId: string;
  hotelName: string;
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  address?: string;
  confirmationNumber?: string;
  notes?: string;
  bookingLink?: string;
}

export interface Transportation {
  id: string;
  tripId: string;
  fromCity: string;
  toCity: string;
  type: 'train' | 'bus' | 'car' | 'ferry' | 'other';
  departureTime: Date;
  arrivalTime: Date;
  notes?: string;
}

export interface Activity {
  id: string;
  tripId: string;
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
}

export interface Task {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  category: 'packing' | 'booking' | 'preparation' | 'general';
  createdAt: Date;
}

// Calendar sync
export interface CalendarEvent {
  id: string;
  tripId: string;
  googleEventId?: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  eventType: 'flight' | 'accommodation' | 'transportation' | 'activity' | 'task';
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  googleId?: string;
  googleCalendarId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Daily itinerary view
export interface DayItinerary {
  date: Date;
  city: string;
  country: string;
  flights: Flight[];
  accommodations: Accommodation[];
  transportations: Transportation[];
  activities: Activity[];
  tasks: Task[];
}
