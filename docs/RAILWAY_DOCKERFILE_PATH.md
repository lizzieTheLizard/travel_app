# Railway Deployment - Specify Dockerfile Path

Railway **does** allow you to specify a custom Dockerfile path. No need to move files around.

## Deploy Backend

1. Go to [railway.app](https://railway.app) → Your Project
2. **New Service** → Select `travel_app` repository  
3. **Configure**:
   - Service name: `backend`
   - **Build command**: Leave empty (Railway auto-detects)
   - **Dockerfile**: `./Dockerfile.backend` ← **Specify the path here**
4. Add **MongoDB plugin**
5. Set environment variables (from `.env.example`)
6. **Deploy**

## Deploy Frontend

1. **New Service** → Select `travel_app`
2. **Configure**:
   - Service name: `frontend`
   - **Dockerfile**: `./Dockerfile.frontend` ← **Specify the path here**
3. Set environment variables
4. **Deploy**

## In Railway Dashboard

When you click on a service:
- Go to **Settings** tab
- Look for **Dockerfile** or **Build** section
- Change from `Dockerfile` to `./Dockerfile.backend` (or `.frontend`)
- Save & redeploy

## If Using Railway CLI

```bash
railway service backend
railway variable set RAILWAY_DOCKERFILE ./Dockerfile.backend

railway service frontend  
railway variable set RAILWAY_DOCKERFILE ./Dockerfile.frontend

railway up
```

## Key Points

- **Root Directory**: Keep empty or leave as `.`
- **Dockerfile path**: `./Dockerfile.backend` and `./Dockerfile.frontend`
- No need to move files
- Root-level Dockerfiles stay where they are

This way Railway uses the exact files we have at the root level.
