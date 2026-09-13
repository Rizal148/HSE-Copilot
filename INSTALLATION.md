# HSE-Copilot Installation & Setup Guide

## Complete Step-by-Step Installation

### Prerequisites
Before you start, make sure you have installed:
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/Rizal148/HSE-Copilot.git
cd HSE-Copilot
```

---

## Step 2: Setup PostgreSQL Database

### Option A: Using Command Line

**On Windows (PowerShell or CMD):**
```bash
psql -U postgres
```

**On macOS/Linux:**
```bash
psql -U postgres
```

Once inside PostgreSQL console, run:
```sql
CREATE DATABASE hse_copilot;
\c hse_copilot
\i 'path/to/database/init.sql'
```

Replace `path/to/database/init.sql` with the actual path to the init.sql file.

---

### Option B: Using Database GUI (pgAdmin)
1. Open pgAdmin (comes with PostgreSQL)
2. Create a new database named `hse_copilot`
3. Right-click the database → Query Tool
4. Copy and paste contents of `database/init.sql`
5. Execute the query

---

## Step 3: Setup Backend (Node.js/Express)

Open a **new terminal** and run:

```bash
cd backend
npm install
```

Create `.env` file in the `backend` folder:
```bash
cp .env.example .env
```

Edit `backend/.env` and configure:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/hse_copilot
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

**Replace:**
- `your_password` with your PostgreSQL password
- `your_super_secret_key_change_this_in_production` with a strong secret

Start the backend server:
```bash
npm run dev
```

You should see:
```
Server running on port 5000
```

✅ **Backend is now running at** `http://localhost:5000`

---

## Step 4: Setup Frontend (React)

Open a **different terminal** and run:

```bash
cd frontend
npm install
```

Create `.env` file in the `frontend` folder:
```bash
cp .env.example .env
```

The `.env` file should contain:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the React development server:
```bash
npm start
```

Your browser should automatically open and show:
```
http://localhost:3000
```

✅ **Frontend is now running at** `http://localhost:3000`

---

## Step 5: Create a Test User Account

### Method 1: Using API (Recommended)

Using **Postman** or **cURL**:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school.com",
    "password": "password123",
    "name": "Admin User",
    "role": "admin"
  }'
```

Or create multiple test users:

```bash
# Create HSE Officer
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hse@school.com",
    "password": "password123",
    "name": "HSE Officer",
    "role": "hse_officer"
  }'

# Create Staff
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "staff@school.com",
    "password": "password123",
    "name": "Staff Member",
    "role": "staff"
  }'
```

---

## Step 6: Login to the App

1. Open your browser to `http://localhost:3000`
2. Login with your test credentials:
   - **Email:** `admin@school.com`
   - **Password:** `password123`

3. You should see the Dashboard! 🎉

---

## Troubleshooting

### Issue: Port 5000 Already in Use

**Solution:** Change the port in `backend/.env`:
```env
PORT=5001
```

And update `frontend/package.json`:
```json
"proxy": "http://localhost:5001"
```

---

### Issue: Cannot Connect to Database

**Check:**
1. PostgreSQL is running
   - **Windows:** Check Services (services.msc)
   - **macOS:** `brew services list`
   - **Linux:** `sudo systemctl status postgresql`

2. Database exists:
   ```sql
   psql -U postgres
   \l
   ```

3. DATABASE_URL is correct in `.env`:
   ```bash
   DATABASE_URL=postgresql://postgres:password@localhost:5432/hse_copilot
   ```

---

### Issue: Module Not Found

**Solution:** Clear cache and reinstall:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: npm command not found

**Solution:** Install Node.js from https://nodejs.org/

---

### Issue: psql command not found

**Solution:** Add PostgreSQL to PATH:
- **Windows:** Restart computer after PostgreSQL installation
- **macOS:** `brew install postgresql`
- **Linux:** `sudo apt-get install postgresql-client`

---

## Common API Testing

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"password123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@school.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### Report an Incident
```bash
curl -X POST http://localhost:5000/api/incidents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fire hazard detected",
    "description": "Fire extinguisher not accessible",
    "severity": "high",
    "location": "Cafeteria",
    "reported_by": "John Doe"
  }'
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/reports/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Quick Start Commands (All-in-One)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

---

## Stopping the Application

- Press `Ctrl+C` in each terminal to stop the servers

---

## Need Help?

Check these files:
- API Documentation: `docs/API.md`
- Project Structure: `README.md`
- Database Schema: `database/init.sql`

---

**Enjoy using HSE-Copilot! 🎉**
