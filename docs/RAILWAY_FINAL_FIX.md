# Railway Deployment - FINAL FIX

The error "Dockerfile does not exist" happens because Railway looks for a file named `Dockerfile` (not `Dockerfile.backend`) inside the Root Directory you specify.

**Solution: We've moved the Dockerfiles inside backend/ and frontend/ directories.**

## Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) → Your Project
2. **New Service** → Select `travel_app` from GitHub
3. **Settings**:
   - Service name: `backend`
   - Root Directory: `backend` ← **THIS IS THE KEY**
   - Railway will automatically find `backend/Dockerfile`
4. **Add MongoDB plugin** from Railway
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=$DATABASE_URL (auto-set by Railway MongoDB)
   JWT_SECRET=your_random_secure_key
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   GOOGLE_CALENDAR_REDIRECT_URI=https://[your-backend].railway.app/api/auth/google/callback
   ```
6. Click **Deploy**

## Deploy Frontend to Railway

1. **New Service** → Select `travel_app`  
2. **Settings**:
   - Service name: `frontend`
   - Root Directory: `frontend` ← **KEY SETTING**
   - Railway will find `frontend/Dockerfile`
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://[your-backend].railway.app
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
   NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID=your_id
   ```
4. Click **Deploy**

## Why This Works

- **Before**: Dockerfiles at root (`Dockerfile.backend`) - Railway couldn't find them
- **Now**: `backend/Dockerfile` inside backend directory - Railway finds it automatically when you set Root Directory to `backend`

This is the standard pattern Railway expects for monorepos.

## Verify It Works

1. Check build logs in Railway dashboard
2. Both services should say "Build successful"
3. Frontend should be accessible at `[service-name].railway.app`
4. Backend should respond at `[backend-service].railway.app/health`

## If Still Failing

**Delete the Railway project completely** and start fresh:
1. Dashboard → Delete Project
2. Wait 5 minutes for cache to clear
3. Create new project from GitHub
4. Set Root Directory correctly this time
5. Deploy

## Full Directory Structure Now

```
travel_app/
├── backend/
│   ├── Dockerfile          ← Railway finds this when Root Dir = "backend"
│   ├── package.json
│   ├── src/
│   └── tsconfig.json
├── frontend/
│   ├── Dockerfile          ← Railway finds this when Root Dir = "frontend"
│   ├── package.json
│   └── src/
├── README.md
└── ...
```

**Root Directory Setting** = the folder Railway builds from. It looks for `[Root Directory]/Dockerfile`.
