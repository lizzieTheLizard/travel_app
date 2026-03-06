# Setup Guide

## Prerequisites

Before getting started, ensure you have:
- Node.js 18 or higher
- npm or yarn package manager
- MongoDB running locally or MongoDB Atlas connection string
- Google Cloud project with Calendar and Maps APIs enabled

## Step 1: Set up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Google Calendar API
   - Google Maps API
4. Create OAuth 2.0 credentials:
   - Go to Credentials → Create Credentials → OAuth client ID
   - Application type: Web application
   - Add authorized redirect URIs (development and production)
5. Copy your Client ID and Client Secret

## Step 2: Set up MongoDB

### Option A: Local MongoDB
```bash
# Install MongoDB on macOS using Homebrew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string and use it in .env

## Step 3: Frontend Setup

```bash
cd frontend
npm install

# Create .env.local from template
cp .env.example .env.local
```

### Configure .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID=your_google_calendar_client_id
```

## Step 4: Backend Setup

```bash
cd ../backend
npm install

# Create .env from template
cp .env.example .env
```

### Configure .env
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/travel_app
JWT_SECRET=your_secure_random_string_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3001/api/auth/google/callback
```

## Step 5: Run Development Servers

### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
# Access at http://localhost:3000
```

### Terminal 2 - Backend
```bash
cd backend
npm run dev
# Server runs at http://localhost:3001
```

## Step 6: Verify Setup

1. Frontend: http://localhost:3000 should load the app
2. Backend: http://localhost:3001/health should return `{"status":"ok"}`
3. MongoDB: Check connection in backend logs

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running: `brew services start mongodb-community`
- Or update MONGODB_URI to your Atlas connection string

### CORS Errors
- Make sure backend is running on port 3001
- Check NEXT_PUBLIC_API_URL matches backend URL

### Google API Errors
- Verify API keys are enabled in Google Cloud Console
- Check that your app's domain is in authorized redirect URIs

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

## Development Tools & Extensions

### Recommended VS Code Extensions
- MongoDB for VS Code
- Thunder Client (API testing)
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

### API Testing
Use Thunder Client or Postman to test APIs. Import the examples from docs/API.md

## Next Steps

1. Review the [API documentation](./docs/API.md)
2. Check the [Database schema](./docs/DATABASE.md)
3. Start building features from the feature list in README.md
4. Implement Google Calendar sync in services
5. Build the UI components

## Database Migrations

When you update models, you may need to reset MongoDB:

```bash
# This will delete all data - use only for development!
mongo travel_app --eval "db.dropDatabase()"
```

## Production Deployment

See deployment guide (to be created):
- Frontend: Deploy to Vercel, Netlify, or AWS
- Backend: Deploy to Heroku, Railway, or AWS Elastic Beanstalk
- Database: Use MongoDB Atlas production cluster
- Update all environment variables for production
