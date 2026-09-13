# HSE-Copilot Setup Guide

## Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/Rizal148/HSE-Copilot.git
cd HSE-Copilot
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

### 4. Setup Database
```bash
cd ../database
psql -U postgres -f init.sql
```

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/hse_copilot
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The app will be available at `http://localhost:3000`

## API Documentation
See [API.md](./docs/API.md) for endpoint documentation.
