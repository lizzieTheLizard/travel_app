# API Endpoints

## Authentication

### Post-MVP Feature
Will include Google OAuth and JWT-based authentication

## Trips

### Create Trip
```
POST /api/trips
Content-Type: application/json

{
  "userId": "string",
  "name": "Japan Adventure",
  "description": "2 weeks exploring Tokyo and Kyoto",
  "startDate": "2024-10-01",
  "endDate": "2024-10-15",
  "countries": ["Japan"],
  "cities": [
    {
      "name": "Tokyo",
      "country": "Japan",
      "arrivalDate": "2024-10-01",
      "departureDate": "2024-10-04",
      "notes": "Staying in Shibuya"
    }
  ]
}

Response: 201 Created
{
  "_id": "string",
  "userId": "string",
  ...
}
```

### Get Trip
```
GET /api/trips/:tripId

Response: 200 OK
{
  "_id": "string",
  "userId": "string",
  "name": "Japan Adventure",
  ...
}
```

### List User Trips
```
GET /api/trips/user/:userId

Response: 200 OK
[
  {
    "_id": "string",
    "name": "Japan Adventure",
    ...
  }
]
```

### Update Trip
```
PUT /api/trips/:tripId
Content-Type: application/json

{
  "name": "Japan Adventure 2024",
  ...
}

Response: 200 OK
```

### Delete Trip
```
DELETE /api/trips/:tripId

Response: 200 OK
{
  "message": "Trip deleted"
}
```

### Get Trip Itinerary
```
GET /api/trips/:tripId/itinerary

Response: 200 OK
[
  {
    "date": "2024-10-01",
    "city": "Tokyo",
    "country": "Japan",
    "flights": [...],
    "accommodations": [...],
    "transportations": [...],
    "activities": [...],
    "tasks": [...]
  }
]
```

## Flights

### Create Flight
```
POST /api/flights
Content-Type: application/json

{
  "tripId": "string",
  "airline": "JAL",
  "flightNumber": "JL001",
  "departureAirport": "TLV",
  "arrivalAirport": "NRT",
  "departureTime": "2024-10-01T10:00:00Z",
  "arrivalTime": "2024-10-02T16:00:00Z",
  "notes": "Direct flight"
}

Response: 201 Created
```

### Get Trip Flights
```
GET /api/flights/trip/:tripId

Response: 200 OK
[
  {
    "_id": "string",
    "airline": "JAL",
    ...
  }
]
```

### Update Flight
```
PUT /api/flights/:flightId
Content-Type: application/json

{
  "flightNumber": "JL002",
  ...
}

Response: 200 OK
```

### Delete Flight
```
DELETE /api/flights/:flightId

Response: 200 OK
{
  "message": "Flight deleted"
}
```

## Accommodations

### Create Accommodation
```
POST /api/accommodations
Content-Type: application/json

{
  "tripId": "string",
  "hotelName": "Park Hyatt Tokyo",
  "city": "Tokyo",
  "checkInDate": "2024-10-02",
  "checkOutDate": "2024-10-04",
  "address": "6-1-1 Nishi-Shinjuku",
  "confirmationNumber": "XYZ123",
  "bookingLink": "https://..."
}

Response: 201 Created
```

## Activities

### Create Activity
```
POST /api/activities
Content-Type: application/json

{
  "tripId": "string",
  "title": "Senso-ji Temple",
  "city": "Tokyo",
  "date": "2024-10-02",
  "type": "tour",
  "coordinates": {
    "lat": 35.7148,
    "lng": 139.7967
  }
}

Response: 201 Created
```

## Tasks

### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "tripId": "string",
  "title": "Pack luggage",
  "category": "packing",
  "dueDate": "2024-10-01",
  "description": "Pack all necessary items"
}

Response: 201 Created
```

### Get Trip Tasks
```
GET /api/tasks/trip/:tripId

Response: 200 OK
[...]
```

### Update Task
```
PUT /api/tasks/:taskId
Content-Type: application/json

{
  "completed": true,
  ...
}

Response: 200 OK
```

## Calendar Integration

### Sync to Google Calendar
```
POST /api/calendar/sync/:tripId

Response: 200 OK
{
  "status": "synced",
  "eventsCreated": 15,
  "calendarId": "string"
}
```

## Error Responses

All error responses follow this format:

```
{
  "error": {
    "message": "string",
    "status": number
  }
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
