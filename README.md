# Travel Planning App

A comprehensive web application for planning trips and managing travel itineraries.

## Features

- **Trip Creation**: Create trips with multiple cities and dates
- **Interactive Timeline**: View your entire trip as a visual timeline or calendar
- **Travel Bookings**: Manage flights, hotels, transportation, and activities
- **Automatic Itinerary**: AI-generated daily itineraries showing where you are each day
- **Google Calendar Sync**: Automatically sync events to your Google Calendar
- **Smart Task Management**: Auto-suggested tasks based on your trip data
- **Map Visualization**: See your trip route on an interactive map
- **Mobile Friendly**: Responsive design for all devices

## Project Structure

```
travel_app/
├── frontend/          # React/Next.js frontend
│   ├── src/
│   │   ├── app/       # Next.js app directory
│   │   ├── components/# React components
│   │   ├── hooks/     # Custom React hooks
│   │   ├── lib/       # Utilities and API client
│   │   ├── store/     # State management (Zustand)
│   │   └── types/     # TypeScript types
│   └── public/        # Static assets
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── models/    # MongoDB schemas
│   │   ├── routes/    # API routes
│   │   ├── middleware/# Express middleware
│   │   ├── services/  # Business logic
│   │   └── types/     # TypeScript types
│   └── server.ts      # Main server file
└── docs/              # Documentation
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI**: React with TailwindCSS
- **State**: Zustand
- **HTTP**: Axios
- **Calendar**: react-big-calendar
- **Maps**: Google Maps API
- **Date**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **Auth**: JWT
- **Google APIs**: Google Calendar, Maps
- **Logging**: Winston
- **Rate Limiting**: express-ratelimit

## Getting Started

### Quick Deploy (Free)

**Easiest way to get live**: Vercel + Render + MongoDB Atlas
- See [DEPLOYMENT_VERCEL_RENDER.md](docs/DEPLOYMENT_VERCEL_RENDER.md)
- Takes 10 minutes, $0/month

### Prerequisites
- Node.js 18+
- MongoDB
- Google API credentials

### Installation

1. **Clone the repository**
```bash
cd travel_app
```

2. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
```

3. **Setup Backend**
```bash
cd ../backend
npm install
cp .env.example .env
# Edit .env with your credentials
```

## Development

### Start Frontend (from frontend directory)
```bash
npm run dev
# Runs on http://localhost:3000
```

### Start Backend (from backend directory)
```bash
npm run dev
# Runs on http://localhost:3001
```

### Build for Production
```bash
# Frontend
cd frontend && npm run build && npm start

# Backend
cd backend && npm run build && npm start
```

## API Documentation

### Trips
- `POST /api/trips` - Create a new trip
- `GET /api/trips/:id` - Get trip details
- `GET /api/trips/user/:userId` - Get all user trips
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `GET /api/trips/:id/itinerary` - Get trip itinerary

### Flights
- `POST /api/flights` - Add flight
- `GET /api/flights/trip/:tripId` - Get trip flights
- `PUT /api/flights/:id` - Update flight
- `DELETE /api/flights/:id` - Delete flight

## Google Calendar Integration

The app integrates with Google Calendar to:
- Create a calendar for each trip
- Auto-add flights, hotels, and activities
- Allow sharing with friends

## Database Schema

### Collections
- **users**: User accounts and Google credentials
- **trips**: Trip information
- **flights**: Flight bookings
- **accommodations**: Hotel/lodging bookings
- **transportations**: Between-city transportation
- **activities**: Planned activities
- **tasks**: To-do items (manual and auto-generated)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Future Enhancements

- [ ] Booking email import via Gmail API
- [ ] Weather forecasts
- [ ] Packing checklists
- [ ] Trip sharing and collaboration
- [ ] Mobile app (React Native)
- [ ] Expense tracking
- [ ] Review and recommendation system

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
