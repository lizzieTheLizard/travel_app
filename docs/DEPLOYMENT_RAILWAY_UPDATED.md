# Railway Deployment for Monorepo

Railway requires explicit Dockerfile references for monorepos. Use these steps:

## Deploy Backend

1. New Project → GitHub → Select `travel_app`
2. Add Service → Custom Service
3. Use this build command:
   ```
   cat > Dockerfile << 'EOF'
   FROM node:18-alpine
   WORKDIR /app
   COPY backend/package*.json ./
   RUN npm install
   COPY backend/src src
   COPY backend/tsconfig.json tsconfig.json
   RUN npm run build
   EXPOSE 3001
   CMD ["npm", "start"]
   EOF
   ```

4. Or use Railway CLI: `railway add --name backend --dockerfile Dockerfile.backend`

## Deploy Frontend

1. Add Service in same project
2. Use custom Dockerfile:
   ```
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY frontend/package*.json ./
   RUN npm install
   COPY frontend .
   RUN npm run build
   FROM node:18-alpine
   WORKDIR /app
   COPY --from=builder /app/.next .next
   COPY --from=builder /app/public public
   COPY --from=builder /app/node_modules node_modules
   COPY --from=builder /app/package.json package.json
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

3. Or: `railway add --name frontend --dockerfile Dockerfile.frontend`

## Railway CLI Method (Easiest)

```bash
npm install -g @railway/cli
cd travel_app

# Login to Railway
railway login

# Create project
railway init

# Add backend service
railway add --name backend --dockerfile Dockerfile.backend

# Add frontend service  
railway add --name frontend --dockerfile Dockerfile.frontend

# Deploy
railway up
```

## Manual Setup in Dashboard

1. Go to railway.app dashboard
2. Create New Project
3. "Deploy from GitHub" → select travel_app
4. For each service, set:
   - Name: "backend" or "frontend"
   - Dockerfile path: `Dockerfile.backend` or `Dockerfile.frontend`
5. Add MongoDB plugin for backend
6. Set environment variables
7. Deploy buttons will appear

## Fix for "Dockerfile does not exist"

The error means Railway can't find the Dockerfile. Try:

1. **Clear Railway cache**: Delete the project and recreate
2. **Use Railway CLI** (more reliable): `railway up`
3. **Check Dockerfile exists** at project root
4. **Verify this on GitHub**: Files should be committed and visible

List committed files:
```bash
git ls-files | grep -i dockerfile
```

Should show:
```
Dockerfile.backend
Dockerfile.frontend
```
