# Blade & Fade Barber Shop 💈

A premium, full-stack web application designed for a modern barber shop. This project features a stunning frontend for clients to book appointments and a secure, comprehensive admin dashboard for the barber to manage their schedule.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-green?style=for-the-badge)

## 🚀 Features

**For Clients:**
- 🎨 Beautiful, responsive, and modern UI.
- 📅 Easy-to-use booking system.
- ⚡ Real-time validation to prevent double-booking.
- 🔔 Instant success notifications via Toastify.

**For Admins (Barbers):**
- 🔒 Secure JWT authentication & protected routes.
- 📊 Dashboard with real-time statistics (Total, Pending, Completed, Cancelled).
- 🗓️ Interactive Calendar view (Daily, Weekly, Monthly).
- 🗂️ List view with advanced search and status filtering.
- 📧 Automated email notifications when a new booking is made.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Big Calendar, React Toastify, Axios.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), Nodemailer, Helmet, Express Rate Limit.

---

## ⚙️ Installation & Setup

### 1. MongoDB Atlas Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Build a new Cluster (Free Tier).
3. Under **Database Access**, create a user (e.g., `barberadmin` / `password123`).
4. Under **Network Access**, click "Add IP Address" and select "Allow Access from Anywhere" (`0.0.0.0/0`).
5. Click **Connect** -> **Drivers** -> **Node.js** and copy your Connection String.

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_receiving_email@gmail.com
```

Start the backend server:
```bash
npm run dev
```

**Generate the initial admin user:**
In a separate terminal, run:
```bash
curl -X POST http://localhost:5000/api/auth/setup
```
*(On Windows PowerShell, use `Invoke-RestMethod -Method POST -Uri http://localhost:5000/api/auth/setup`)*

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The app will now be running at `http://localhost:5173`.

---

## 📖 User Guides

### 👔 Admin Guide (For the Barber)
1. **Login:** Go to `http://localhost:5173/admin/login`. Enter the username `admin` and password `admin123`.
2. **Dashboard Overview:** At the top, you'll see your quick statistics (Total, Pending, Completed, Cancelled).
3. **List View:** Use the search bar to find clients by name or phone. Use the dropdown to filter by status. 
4. **Calendar View:** Click the "Calendar" button to see a visual layout of your day/week/month.
5. **Managing Appointments:** In the List view, use the status dropdown on any appointment to mark it as `Confirmed`, `Completed`, or `Cancelled`. Use the trash icon to permanently delete test bookings.

### ✂️ Client Guide
1. Navigate to the main website.
2. Scroll to the "Reserve Your Seat" section.
3. Fill in your details (Name, Phone, Email), select your desired service, date, and time.
4. Click "Confirm Booking". A green notification will confirm your appointment.

---

## 🧪 Testing Instructions

1. **Double Booking Prevention:**
   - Go to the public booking form. Book a slot (e.g., June 15th at 10:00 AM).
   - Try to book the exact same slot again. The system should reject it and display a red error toast.
2. **Admin Statistics:**
   - Log into the admin dashboard. Note the "Pending" count.
   - Go to the list view and change a "Pending" appointment to "Completed".
   - The "Pending" count should decrease, and "Completed" should increase automatically.
3. **Security Rate Limiting:**
   - Rapidly refresh the public site or send multiple API requests. After 100 requests in 15 minutes, the API will return a "Too many requests" error.

---

## 🚀 Deployment Guide

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Create an account on [Render](https://render.com/).
3. Create a new **Web Service** and connect your repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add all your `.env` variables under the "Environment" tab in Render.
8. Click **Deploy**. Copy your new Render URL.

### Deploying the Frontend (Vercel)
1. In your `frontend/src/context/AuthContext.jsx` and `frontend/src/components/BookingForm.jsx` and `Dashboard.jsx`, update the `http://localhost:5000` URLs to point to your new Render Backend URL.
2. Push changes to GitHub.
3. Create an account on [Vercel](https://vercel.com/).
4. Import your repository. Set the Framework Preset to `Vite`.
5. Set the Root Directory to `frontend`.
6. Click **Deploy**.

> **Note:** Once the frontend is deployed on Vercel, remember to update the `CORS_ORIGIN` variable in your Render backend settings to match your new Vercel domain!
