import { Router, Request, Response } from 'express';
import { Flight } from '@/models/Flight';

const router = Router();

// Create flight
router.post('/', async (req: Request, res: Response) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create flight' });
  }
});

// Get flights for trip
router.get('/trip/:tripId', async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find({ tripId: req.params.tripId });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

// Update flight
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flight' });
  }
});

// Delete flight
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flight' });
  }
});

export default router;
