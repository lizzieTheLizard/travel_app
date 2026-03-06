import { create } from 'zustand';
import { Trip, Flight, Accommodation, Activity, Task } from '@/types';

interface TripStore {
  currentTrip: Trip | null;
  trips: Trip[];
  flights: Flight[];
  accommodations: Accommodation[];
  activities: Activity[];
  tasks: Task[];
  
  setCurrentTrip: (trip: Trip | null) => void;
  setTrips: (trips: Trip[]) => void;
  setFlights: (flights: Flight[]) => void;
  setAccommodations: (accommodations: Accommodation[]) => void;
  setActivities: (activities: Activity[]) => void;
  setTasks: (tasks: Task[]) => void;
  
  addFlight: (flight: Flight) => void;
  removeFlight: (flightId: string) => void;
  
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  currentTrip: null,
  trips: [],
  flights: [],
  accommodations: [],
  activities: [],
  tasks: [],
  
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setTrips: (trips) => set({ trips }),
  setFlights: (flights) => set({ flights }),
  setAccommodations: (accommodations) => set({ accommodations }),
  setActivities: (activities) => set({ activities }),
  setTasks: (tasks) => set({ tasks }),
  
  addFlight: (flight) =>
    set((state) => ({ flights: [...state.flights, flight] })),
  removeFlight: (flightId) =>
    set((state) => ({
      flights: state.flights.filter((f) => f.id !== flightId),
    })),
  
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      ),
    })),
}));
