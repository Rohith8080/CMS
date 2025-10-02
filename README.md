# Customer Management System

## Backend
- Express.js server
- MySQL database (configure credentials in `backend/.env`)
- Prisma ORM

## Frontend
- React + Vite
 
### Setup Instructions

1. **Backend**
   - Update `backend/.env` with your MySQL credentials.
   - Run `npx prisma migrate dev --name init` in the `backend` folder to create the database tables. 
   - Start the server: `node index.js` or `npm run dev` (if you add nodemon).

2. **Frontend**
   - In the `frontend` folder, run `npm install` then `npm run dev`.

---

Replace placeholders as needed for your environment.
