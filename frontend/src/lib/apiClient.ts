import axios, { AxiosInstance } from 'axios';

export class ApiClient {
  private baseURL: string;
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Trip endpoints
  async createTrip(data: any) {
    return this.client.post('/api/trips', data);
  }

  async getTrip(tripId: string) {
    return this.client.get(`/api/trips/${tripId}`);
  }

  async getUserTrips(userId: string) {
    return this.client.get(`/api/trips/user/${userId}`);
  }

  async updateTrip(tripId: string, data: any) {
    return this.client.put(`/api/trips/${tripId}`, data);
  }

  async deleteTrip(tripId: string) {
    return this.client.delete(`/api/trips/${tripId}`);
  }

  async getTripItinerary(tripId: string) {
    return this.client.get(`/api/trips/${tripId}/itinerary`);
  }

  // Flight endpoints
  async createFlight(data: any) {
    return this.client.post('/api/flights', data);
  }

  async getFlights(tripId: string) {
    return this.client.get(`/api/flights/trip/${tripId}`);
  }

  async updateFlight(flightId: string, data: any) {
    return this.client.put(`/api/flights/${flightId}`, data);
  }

  async deleteFlight(flightId: string) {
    return this.client.delete(`/api/flights/${flightId}`);
  }
}

export const apiClient = new ApiClient();
