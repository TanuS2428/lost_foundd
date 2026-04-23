# Lost & Found Item Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for a college campus where students can report lost and found items.

## Features
- **User Authentication**: Secure Registration & Login using JWT and bcrypt.
- **Item Management**: Authenticated users can report lost or found items.
- **Dashboard**: View all reported items with relevant details (location, date, contact info).
- **Search & Filter**: Search items by name and filter by category (Lost / Found).
- **Ownership**: Users can only update or delete the items they reported.
- **Premium UI**: Modern, glassmorphism design using pure CSS and React Lucide icons.

## Setup & Run Locally

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on default port (27017)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *The backend will run on http://localhost:5000*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## Deployment Instructions

### GitHub Deployment
1. Initialize a git repository in the root directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub.
3. Link the local repo to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Render Deployment (Backend)
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string (do NOT use localhost here).
   - `JWT_SECRET`: A strong secret key.
   - `PORT`: `5000` (Render will override this, but it's good to specify).
5. Click **Deploy Web Service**.

### Render/Vercel Deployment (Frontend)
1. Since it's a Vite React app, you can deploy it on Render (as a Static Site) or Vercel.
2. If using Vercel:
   - Import your GitHub repository.
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Before deploying, ensure the `axios.defaults.baseURL` in `frontend/src/context/AuthContext.jsx` is updated to your deployed Render backend URL.
4. Click **Deploy**.
