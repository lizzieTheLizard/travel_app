# Deployment Guide: Vercel + Render

This is the **recommended approach** for your monorepo - it's simpler and faster than Railway.

## Frontend: Deploy to Vercel (FREE)

**Vercel is made for Next.js and has first-class monorepo support**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. **Import Project** → Select `travel_app`
4. Under "Root Directory", set: `frontend`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
   NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID=your_id
   ```
6. Click **Deploy**
7. Your site is live at `[project-name].vercel.app`

## Backend: Deploy to Render (FREE with free tier)

**Render handles monorepo structure better than Railway**

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. **New** → **Web Service**
4. Select `travel_app` repository
5. Set **Build Command**: 
   ```
   cd backend && npm install && npm run build
   ```
6. Set **Start Command**: 
   ```
   cd backend && npm start
   ```
7. Select **Free** tier
8. Add environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   GOOGLE_CALENDAR_REDIRECT_URI=https://[your-backend].onrender.com/api/auth/google/callback
   ```
9. Click **Create Web Service**
10. Your backend is live at `[project-name].onrender.com`

## MongoDB: Free Cloud Database

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster (M0)
3. Get connection string
4. Use in backend MONGODB_URI environment variable
5. Whitelist `0.0.0.0` for IP access (development only)

## Update Frontend with Backend URL

After Render deploys the backend:

1. Go to Vercel → Your project settings
2. Update `NEXT_PUBLIC_API_URL` to your Render backend URL
3. Redeploy

## Cost Breakdown (Completely Free)

| Service | Price | Notes |
|---------|-------|-------|
| Vercel | Free | Production-grade hosting |
| Render | Free | 750 free hours/month (plenty for hobby) |
| MongoDB Atlas | Free | 512MB storage |
| **Total** | **$0/month** | ✅ |

## Why This Works Better for Monorepos

- **Vercel**: Built-in monorepo support with "Root Directory" setting
- **Render**: Simple build/start commands handle subdirectories
- **Railway**: Complex monorepo handling, causes issues like you're seeing

## Troubleshooting

### Vercel Build Fails
- Check that `frontend/package.json` exists
- Ensure `next.config.js` is valid
- Check build logs in Vercel dashboard

### Render Build Fails
- Run locally first: `cd backend && npm install && npm run build`
- Check if all dependencies are in package.json
- Verify environment variables are set

### API Connection Issues
- Frontend NEXT_PUBLIC_API_URL must match Render URL
- Render backend must allow CORS from Vercel domain
- Check Network tab in browser DevTools

## Local Testing Before Deploying

```bash
# Test backend build
cd backend && npm install && npm run build && npm start

# In new terminal, test frontend
cd frontend && npm install && NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
```

Both should start without errors.
