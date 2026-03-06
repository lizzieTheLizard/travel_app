# Railway Deployment - Fixed

The "Dockerfile does not exist" error happens with the web dashboard in monorepos. Use **Railway CLI** instead - it's more reliable.

## Method 1: Railway CLI (Recommended - Guaranteed to work)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railroad login
```

### Step 3: Initialize Railway Project
```bash
cd /Users/elizabethfedorovsky/projects/travel_app
railway init
# Select: Create new project
# Name: travel_app
```

### Step 4: Configure Backend Service
```bash
# Create directory for backend (Railway likes this structure)
mkdir -p railway-backend

# Copy backend Dockerfile
cp Dockerfile.backend railway-backend/Dockerfile

# Deploy backend
railway add --name backend --dockerfile railway-backend/Dockerfile
```

### Step 5: Add MongoDB
```bash
# Railway will prompt you - select "Add MongoDB"
railway add mongodb
```

### Step 6: Configure Frontend Service
```bash
# Copy frontend Dockerfile
mkdir -p railway-frontend
cp Dockerfile.frontend railway-frontend/Dockerfile

# Deploy frontend
railway add --name frontend --dockerfile railway-frontend/Dockerfile
```

### Step 7: Set Environment Variables
```bash
# For backend
railway service backend
railway variable set NODE_ENV production
railway variable set PORT 3001
railway variable set JWT_SECRET your_random_key_here
railway variable set GOOGLE_CLIENT_ID your_id
railway variable set GOOGLE_CLIENT_SECRET your_secret
railway variable set GOOGLE_CALENDAR_REDIRECT_URI https://your-backend-url.railway.app/api/auth/google/callback

# For frontend  
railway service frontend
railway variable set NEXT_PUBLIC_API_URL https://your-backend-url.railway.app
railway variable set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY your_key
railway variable set NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID your_id
```

### Step 8: Deploy
```bash
railway up
```

Your app is now live!

## Method 2: Web Dashboard (If CLI doesn't work)

1. Delete the old Railway project (to clear any caching issues)
2. Go to [railway.app](https://railway.app)
3. **New Project** → **Deploy from GitHub**
4. Select `travel_app` repository
5. **For Backend**:
   - **New Service** → **Google Cloud Run** → **Dockerfile**
   - **Build command**: `cat > Dockerfile << 'EOF'` then paste content of `Dockerfile.backend`
   - OR: Set **Service Root Directory**: `.` (root)
   - Set **Dockerfile path**: `Dockerfile.backend`
   - Add MongoDB from Railway plugins
   - Set environment variables (see above)

6. **For Frontend**: 
   - **New Service** → **Dockerfile**
   - **Dockerfile path**: `Dockerfile.frontend`
   - Set environment variables

7. **Deploy**

## Method 3: Rebuild (Last Resort)

If it still doesn't work:

```bash
# Delete everything
rm -rf .git node_modules backend/node_modules frontend/node_modules

# Reinitialize
git init
git add .
git commit -m "Fresh start"
git remote add origin https://github.com/lizzieTheLizard/travel_app.git
git push -u origin main

# Then try Railway CLI or dashboard again
```

## Verify Dockerfiles Built Correctly

Before using Railway, test locally:

```bash
# Build backend
docker build -f Dockerfile.backend -t travel-backend .

# Build frontend  
docker build -f Dockerfile.frontend -t travel-frontend .

# Run backend
docker run -p 3001:3001 travel-backend

# Run frontend (new terminal)
docker run -p 3000:3000 travel-frontend
```

Both should start without errors.

## Still Failing? Check These:

1. **Git commits pushed**: `git log` and `git push origin main`
2. **Dockerfiles exist**: `ls -la Dockerfile.*`
3. **Package.json in subdirs**: `ls backend/package.json frontend/package.json`
4. **No syntax errors**: `cat Dockerfile.backend | docker build -` (should parse)
5. **Railway logged in**: `railway whoami`

## Last Resort: Use Vercel + Render Instead

If Railway continues to fail, just switch:
- Frontend: Vercel (made for Next.js)
- Backend: Render (simpler setup)
- See [DEPLOYMENT_VERCEL_RENDER.md](DEPLOYMENT_VERCEL_RENDER.md)

It's actually faster and more reliable for monorepos.
