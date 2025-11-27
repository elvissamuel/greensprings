-- Create tables for Greensprings Admissions Portal
-- Run this script to set up the database schema

-- Note: Prisma will handle table creation via migrations
-- This script is for reference and manual setup if needed

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT DEFAULT 'admin',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campus table
CREATE TABLE IF NOT EXISTS "Campus" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "location" TEXT,
  "fee" INTEGER DEFAULT 5000000,
  "active" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic Year table
CREATE TABLE IF NOT EXISTS "AcademicYear" (
  "id" TEXT PRIMARY KEY,
  "year" TEXT UNIQUE NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "active" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO "Campus" ("id", "name", "location", "fee", "active")
VALUES 
  ('campus-1', 'Anthony Campus', 'Anthony Village, Lagos', 5000000, true),
  ('campus-2', 'Lekki Campus', 'Lekki Phase 1, Lagos', 5000000, true)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "AcademicYear" ("id", "year", "startDate", "endDate", "active")
VALUES 
  ('year-1', '2024/2025', '2024-09-01', '2025-07-31', true),
  ('year-2', '2025/2026', '2025-09-01', '2026-07-31', true)
ON CONFLICT ("year") DO NOTHING;

-- Create admin user (password: admin123 - hashed with bcrypt)
INSERT INTO "User" ("id", "email", "password", "name", "role")
VALUES ('user-1', 'admin@greensprings.edu', '$2a$10$rKJ5YfNxWJxGJHVZwUz7.eqKxYQ1k9Q5Y8ZCqVFZQvZYvKJ5YfNxW', 'Admin User', 'admin')
ON CONFLICT ("email") DO NOTHING;
