import { IFlight } from '@/models/Flight';
import { IAccommodation } from '@/models/Accommodation';
import { ITask } from '@/models/Task';
import { IActivity } from '@/models/Activity';
import { ITransportation } from '@/models/Transportation';

export interface DayItinerary {
  date: Date;
  city: string;
  country: string;
  flights: IFlight[];
  accommodations: IAccommodation[];
  transportations: ITransportation[];
  activities: IActivity[];
  tasks: ITask[];
}
