import { useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import { useTripStore } from '@/store/tripStore';
import toast from 'react-hot-toast';

export const useTrips = () => {
  const { setCurrentTrip, setTrips } = useTripStore();

  const fetchTrips = useCallback(async (userId: string) => {
    try {
      const response = await apiClient.getUserTrips(userId);
      setTrips(response.data);
    } catch (error) {
      toast.error('Failed to fetch trips');
      console.error(error);
    }
  }, [setTrips]);

  const createTrip = useCallback(async (data: any) => {
    try {
      const response = await apiClient.createTrip(data);
      setCurrentTrip(response.data);
      toast.success('Trip created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create trip');
      console.error(error);
    }
  }, [setCurrentTrip]);

  const updateTrip = useCallback(async (tripId: string, data: any) => {
    try {
      const response = await apiClient.updateTrip(tripId, data);
      setCurrentTrip(response.data);
      toast.success('Trip updated');
      return response.data;
    } catch (error) {
      toast.error('Failed to update trip');
      console.error(error);
    }
  }, [setCurrentTrip]);

  const deleteTrip = useCallback(async (tripId: string) => {
    try {
      await apiClient.deleteTrip(tripId);
      setCurrentTrip(null);
      toast.success('Trip deleted');
    } catch (error) {
      toast.error('Failed to delete trip');
      console.error(error);
    }
  }, [setCurrentTrip]);

  return { fetchTrips, createTrip, updateTrip, deleteTrip };
};
