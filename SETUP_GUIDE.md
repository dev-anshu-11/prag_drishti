# PRAG-DRISHTI - Setup & Execution Guide

## ✅ Current Status

| Component | Status | URL |
|-----------|--------|-----|
| **Frontend** | ✅ Running | http://localhost:5173/ |
| **Backend** | 🔧 Built, needs DB | Port 8000 |
| **Database** | ❌ Not set up | - |
| **ML Service** | ⚠️ Dependency issue | Port 8001 |

---

## 🚀 Quick Start - Frontend Only

The **frontend is already running** at: **http://localhost:5173/**

You can explore the UI and navigate through the application.

---

## 🗄️ Database Setup (Required for Backend)

The backend requires PostgreSQL. Choose one option:

### Option 1: Use Cloud PostgreSQL (Easiest - No Installation)

1. **Supabase** (Free tier): https://supabase.com
   - Create a project
   - Get connection string: `postgresql://username:password@host:5432/database`
   
2. **Vercel Postgres** (Free tier): https://vercel.com/storage/postgres
   - Create a database
   - Get connection string

3. **Railway** (Free tier): https://railway.app
   - Deploy PostgreSQL
   - Get connection string

**Then, set the environment variable in the backend:**
```bash
cd backend
$env:DATABASE_URL = "postgresql://username:password@host:5432/database"
npm start
```

### Option 2: Install PostgreSQL Locally

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer (use default settings)
3. Set `DATABASE_URL` environment variable:
```bash
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/cyberintel"
```
4. Create database:
```bash
createdb -U postgres cyberintel
```

---

## 🔧 Backend Setup (After Database)

```bash
cd backend

# Set environment variables
$env:DATABASE_URL = "your_connection_string"
$env:JWT_SECRET = "cyberintel-jwt-secret-key-14c"
$env:ML_SERVICE_URL = "http://localhost:8001"

# Initialize database schema
npx prisma db push

# Seed test data
npx prisma db seed

# Start backend
npm start
```

Backend will run on: **http://localhost:8000/**

---

## 🤖 ML Service Setup

The ML service has a dependency build issue due to missing GCC compiler.

### Option 1: Install Build Tools (Quick Fix)
```bash
# Install pre-built binary for pandas
pip install --upgrade pip
pip install pandas --only-binary :all:
```

### Option 2: Use Pre-built Conda Environment
```bash
conda create -n prag-drishti python=3.11
conda activate prag-drishti
cd ml-service
pip install -r requirements.txt
python app.py
```

### Option 3: Skip for Now
The frontend and backend work without the ML service (some features will be limited).

---

## 📋 Architecture Overview

```
User (Browser)
    ↓
Frontend (React + Vite) - Port 5173
    ↓
Backend (Express + TypeScript) - Port 8000
    ├── API Routes
    ├── WebSocket for real-time updates
    └── Prisma ORM → PostgreSQL Database
    ├── ML Service (FastAPI) - Port 8001
    │   └── Risk predictions & modeling
```

---

## 🐳 Alternative: Run with Docker

If you have Docker installed:
```bash
docker-compose up --build
```

This automatically:
- Starts PostgreSQL
- Builds and starts backend
- Builds and starts ML service
- All services connected and ready

---

## 📝 Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cyberintel
JWT_SECRET=cyberintel-jwt-secret-key-14c
ML_SERVICE_URL=http://localhost:8001
NODE_ENV=development
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run build  # Build for production
```

### Backend Tests
```bash
cd backend
npm test  # Run test suite
```

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Cannot find module prisma"** | Run `npm install` in backend folder |
| **Database connection failed** | Check DATABASE_URL env var and PostgreSQL is running |
| **Port 5173 in use** | Kill process: `Get-Process -Name node` → `Stop-Process -Id <PID>` |
| **ML service won't start** | Try Option 2 (Conda) or Option 3 (skip for now) |

---

## 📚 Project Structure

```
VIGILANT-forked/
├── frontend/          # React + Vite UI
│   ├── src/
│   │   ├── pages/    # Page components
│   │   └── components/
│   └── vite.config.ts
├── backend/           # Express + TypeScript API
│   ├── src/
│   │   ├── routers/  # API endpoints
│   │   ├── middleware/
│   │   └── main.ts
│   └── prisma/       # Database schema
└── ml-service/        # Python FastAPI service
    ├── app.py
    └── predict.py
```

---

## ✨ Next Steps

1. **Try the Frontend** - Navigate to http://localhost:5173/
2. **Setup Database** - Choose cloud or local PostgreSQL
3. **Start Backend** - Follow backend setup steps
4. **Optional: ML Service** - Install Python dependencies if needed

**Happy coding! 🚀**
