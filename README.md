# Movie CRUD

## Installation

### Backend
cd backend
npm i
cp .env.example .env
npx prisma migrate dev
npm run dev

### Frontend
cd frontend
npm i 
cp .env.example .env
npm run dev

## Seed Data
npx ts-node prisma/seed.ts

## Test Accounts
Username | password | Role 
manager1 | password | manager
teamlead1| password | teamleader
floorstaff | password | floorstaff