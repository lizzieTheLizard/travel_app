import { Router, Request, Response } from 'express';
import { Trip } from '../models/Trip';
import { ItineraryService } from '../services/ItineraryService';
import { TaskSuggestionService } from '../services/TaskSuggestionService';

const router = Router();
const itineraryService = new ItineraryService();
const taskSuggestionService = new TaskSuggestionService();

// Create trip
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, startDate, endDate, countries, cities } =
      req.body;

    const trip = new Trip({
      userId,
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      countries,
      cities: cities.map((city: any) => ({
        ...city,
        arrivalDate: new Date(city.arrivalDate),
        departureDate: new Date(city.departureDate),
      })),
    });

    const savedTrip = await trip.save();

    // Generate suggested tasks
    await taskSuggestionService.createSuggestedTasks(savedTrip._id.toString());

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Get trip by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

// Get all trips for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// Update trip
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trip' });
  }
});

// Delete trip
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

// Get trip itinerary
router.get('/:id/itinerary', async (req: Request, res: Response) => {
  try {
    const itinerary = await itineraryService.generateTripItinerary(req.params.id);
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

export default router;
