# HSE Copilot API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Incidents
- `GET /incidents` - Get all incidents
- `POST /incidents` - Create a new incident
- `PUT /incidents/:id` - Update an incident (HSE Officer/Admin only)

### Inspections
- `GET /inspections` - Get all inspections
- `POST /inspections` - Create a new inspection (HSE Officer/Admin only)

### Reports
- `GET /reports/dashboard/stats` - Get dashboard statistics
- `GET /reports/incidents` - Get incident report

### Users
- `GET /users/profile` - Get current user profile
- `GET /users` - Get all users (Admin only)

## Example Requests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### Create Incident
```bash
curl -X POST http://localhost:5000/api/incidents \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Fire hazard", "severity": "high", "location": "Building A"}'
```
