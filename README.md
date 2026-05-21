# 📚 MediQueue – Tutor Booking System

**MediQueue** is a full-stack tutor booking web application where students can register, log in, browse available tutors, and book online or offline learning sessions based on subject and time availability. The system generates digital session tokens, manages slot availability automatically, and provides a smooth and conflict-free booking experience.

🌐 **Live Site URL:** [https://mediqueue.vercel.app](https://mediqueue.vercel.app)

---

## ✨ Key Features

- 🔐 **Secure Authentication System** — Users can register and log in using email/password or Google OAuth. JWT tokens are issued on login and stored on the client side to protect all private routes.
- 📋 **Tutor Listing & Booking** — Browse all available tutors in a 3-column card grid, filter by subject/category, and book sessions with a single click. Each booking auto-decreases available slots.
- 🔍 **Search & Filter** — Search tutors by name (case-insensitive using `$regex`) and filter by session start/end date using MongoDB's `$gte` and `$lte` operators.
- 🧑‍💼 **My Tutors Dashboard** — Logged-in users can view, update (via modal), and delete their own tutor listings without page reload.
- 📅 **My Booked Sessions** — Users can view all their booked sessions in a table, and cancel bookings via a confirmation modal which sends a `PATCH` request to update the booking status.
- 🌙 **Dark / Light Theme Toggle** — Full application-wide dark/light mode switcher available directly in the Navbar.
- 🔒 **Private Route Protection** — All protected routes (Add Tutor, My Tutors, My Booked Sessions, Tutor Details) require login. Logged-in users are never redirected to login on page reload.
- 🎟️ **Auto Slot Management** — Booking is blocked when total slots reach 0 or if the current date is before the session start date. Slots automatically decrease by 1 after a successful booking.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** — Component-based UI
- **React Router DOM** — Client-side routing with private route guards
- **Tailwind CSS** — Utility-first styling
- **Firebase Authentication** — Email/password + Google OAuth
- **Axios** — HTTP requests with JWT token headers
- **React Hot Toast / SweetAlert2** — Notifications and confirmation modals
- **Swiper.js** — Homepage image carousel/slider
- **React Datepicker** — Date selection for session start date
- **React Helmet** — Dynamic page title per route

### Backend
- **Node.js + Express.js** — RESTful API server
- **MongoDB + Mongoose** — Database with `$regex`, `$gte`, `$lte` query operators
- **JWT (jsonwebtoken)** — Token creation and verification for private API routes
- **CORS** — Cross-origin resource sharing configuration
- **dotenv** — Environment variable management

---

## 📄 Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with banner slider, 6 featured tutors, and 2 extra sections |
| `/tutors` | Public | All tutors with search & filter functionality |
| `/tutors/:id` | Private | Tutor details page with booking option |
| `/add-tutor` | Private | Form to create a new tutor listing |
| `/my-tutors` | Private | Manage own tutor listings (update/delete) |
| `/my-booked-sessions` | Private | View and cancel booked sessions |
| `/login` | Public | Login with email/password or Google |
| `/register` | Public | Register with name, email, photo URL, password |
| `*` | Public | 404 Not Found page |

---

## 🔑 Authentication Details

- **Email/Password Login** with password validation:
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
- **Google Social Login** (OAuth via Firebase)
- **JWT Token** created on login and stored in `localStorage`; sent in Authorization header for all private API requests
- Redirects user to intended private route after login

---

## 📦 Booking System Logic

1. User clicks **Book Session** on a tutor's detail page
2. System checks:
   - `totalSlot > 0` → if 0, booking is blocked with message: *"No available slots left."*
   - `currentDate >= sessionStartDate` → if not, booking blocked with: *"Booking is not available yet for this tutor."*
3. On successful booking:
   - Booking is saved to database with auto-generated status
   - `totalSlot` is decremented by 1 via `PATCH` request
4. User can cancel bookings from **My Booked Sessions** page

---

## 🧩 Home Page Sections

1. **Banner / Carousel** — 3-slide image slider with tutor/learning highlights and CTA button
2. **Available Tutors** — 6 tutors fetched from DB using `$limit` operator, displayed in cards
3. **Why Choose Us** — Highlights platform benefits (extra section 1)
4. **How It Works** — Step-by-step booking guide (extra section 2)

---

## 🗂️ Add Tutor Form Fields

| Field | Type |
|---|---|
| Tutor Name | Text input |
| Photo | Image URL (imgbb / postimage) |
| Subject / Category | Dropdown |
| Available Days & Time Slot | Text (e.g. Sun–Thu 5:00–8:00 PM) |
| Hourly Fee | Number input |
| Total Slots | Number input |
| Session Start Date | Date picker |
| Institution & Experience | Text input |
| Location (Area/City) | Text input |
| Teaching Mode | Dropdown (Online / Offline / Both) |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project

### Client Side

```bash
git clone https://github.com/Ridoy-vai/Tutor-Booking-System
cd mediqueue-client
npm install
```

Create a `.env.local` file:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_SERVER_URL=http://localhost:5000
```

```bash
npm run dev
```

### Server Side

```bash
git clone https://github.com/your-username/mediqueue-server.git
cd mediqueue-server
npm install
```

Create a `.env` file:
```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
```

```bash
node index.js
```

---

## 🌐 Deployment

| Part | Platform |
|---|---|
| Client | [Vercel](https://vercel.com) |
| Server | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |

> ⚠️ **Note:** All routes are configured to avoid 404 errors on reload. Private route state is preserved on page refresh using JWT stored in `localStorage`.

---

## 📁 Folder Structure

### Client
```
src/
├── components/       # Reusable UI components (Navbar, Footer, Cards, Modals)
├── pages/            # All route pages (Home, Tutors, Login, etc.)
├── context/          # AuthContext with Firebase integration
├── hooks/            # Custom hooks (useAxiosSecure, etc.)
├── routes/           # Route definitions and PrivateRoute wrapper
└── main.jsx          # App entry point
```

### Server
```
├── index.js          # Main Express server
├── routes/           # API route handlers (tutors, bookings, auth)
├── middleware/        # JWT verification middleware
└── .env              # Environment variables
```

---

## 📌 Notable GitHub Commits

### Client Side (15+ commits)
- Initial project setup with React + Vite + Tailwind
- Firebase authentication integration
- JWT token storage and Axios interceptor setup
- Navbar with conditional rendering and dark/light toggle
- Home page banner slider with Swiper.js
- Available Tutors section with $limit fetch
- Tutors page with search ($regex) and date filter
- Tutor Details page with booking modal
- Slot validation logic (totalSlot and sessionDate checks)
- Add Tutor private route and form with all fields
- My Tutors page with update modal and delete confirmation
- My Booked Sessions page with cancel functionality
- 404 Not Found page
- Dynamic title using React Helmet
- Responsive design finalization and UI polish

### Server Side (8+ commits)
- Express server setup with MongoDB connection
- Tutor CRUD routes (GET, POST, PATCH, DELETE)
- Booking routes with slot decrement logic
- JWT creation endpoint on login
- JWT middleware for private route verification
- Search and filter query implementation
- CORS and environment configuration
- Deployment configuration for Render

---

## 📞 Contact

For any queries or feedback, feel free to reach out:

- 📧 Email: [mdsahariyarridoy@gmail.com] (mdsahariyarridoy@gmail.com)
- 💼 LinkedIn: [www.linkedin.com/in/md-shahriar-ridoy-vai](www.linkedin.com/in/md-shahriar-ridoy-vai)
- 🐙 GitHub: [https://github.com/Ridoy-vai](https://github.com/Ridoy-vai)

---

## 📜 License

This project is built for educational purposes as part of a programming assignment.  
© 2025 MediQueue. All rights reserved.