# Railway Deployment Guide

## Option 1: Separate Services (Recommended)

Railway works best when each service is in its own repository or with explicit path configuration. Deploy as separate services:

### Frontend (Next.js)
1. Go to [Railway.app](https://railway.app)
2. New Project → GitHub
3. Select your `travel_app` repository
4. Add Service → Dockerfile
5. Set Root Directory: `frontend`
6. Set Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
   NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID=your_id
   ```

### Backend (Node.js + MongoDB)
1. New Service → Dockerfile
2. Set Root Directory: `backend`
3. Add MongoDB add-on from Railway
4. Set Environment Variables:
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=$DATABASE_URL (auto-set by Railway)
   JWT_SECRET=your_secure_random_key
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   GOOGLE_CALENDAR_REDIRECT_URI=https://your-backend-url.railway.app/api/auth/google/callback
   ```

## Option 2: Docker Compose (Local Testing)

Test locally with Docker before deploying:

```bash
# Create .env file with your credentials
cp .env.example .env

# Start all services
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## Troubleshooting

### "Could not determine how to build"
- Ensure Dockerfile is in the correct directory (frontend/ or backend/)
- Set Root Directory in Railway settings if using subdirectories
- Rebuild the service

### Database Connection Issues
- MongoDB Atlas: Use full connection string in MONGODB_URI
- Railway MongoDB: Use `$DATABASE_URL` environment variable
- Check that MONGODB_URI format is correct

### Port Issues
- Frontend runs on 3000 (configured in next.config.js)
- Backend runs on 3001 (configured in server.ts)
- Don't change unless deploying multiple backends

## Deployment Checklist

- [ ] Dockerfiles in frontend/ and backend/
- [ ] Environment variables set in Railway dashboard
- [ ] MongoDB connected (Atlas or Railway add-on)
- [ ] API_URL pointing to backend domain
- [ ] Google APIs configured with production callback URLs
- [ ] Build logs show no errors
