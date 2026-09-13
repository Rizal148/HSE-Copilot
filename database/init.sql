-- Create database
CREATE DATABASE IF NOT EXISTS hse_copilot;

-- Connect to database
\c hse_copilot;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'staff' CHECK (role IN ('admin', 'hse_officer', 'staff')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  severity VARCHAR(50) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  location VARCHAR(255),
  reported_by VARCHAR(255),
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inspections table
CREATE TABLE IF NOT EXISTS inspections (
  id SERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  inspection_type VARCHAR(100),
  checklist JSONB,
  findings TEXT,
  inspector_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_created_at ON incidents(created_at);
CREATE INDEX idx_inspections_created_at ON inspections(created_at);
CREATE INDEX idx_users_email ON users(email);
