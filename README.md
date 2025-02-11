# 📒 NotesApp

## NotesApp is a note-taking application that allows users to create, edit, delete, and restore notes.
## It supports user authentication, password reset, and includes a Dashboard page with various statistics and visualizations of user notes.

---

## 🚀 Technologies

### Frontend
- **TypeScript**
- **React**
- **Material-UI** (UI components)
- **Axios** (HTTP requests)
- **Chart.js** (charts and visualizations)

### Backend
- **TypeScript**
- **Node.js**
- **Express** (framework)
- **Supabase** (database)
- **JWT** (JSON Web Token authentication)

### Hosting
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase

---

## 🔧 Installation & Setup

### 1️⃣ Backend

#### Environment Variables (`backend/.env`)
Create a `.env` file in the `backend` directory and add the following variables:


    JWT_SECRET=your_jwt_secret
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key

Install Dependencies & Start Backend

    cd backend
    npm install
    npm start

The backend will run on port 5000 by default.

### 2️⃣ Frontend
-Environment Variables
    (frontend/.env and frontend/.env.local)

-Create the following environment variable files in the frontend directory:

Production (frontend/.env):

    REACT_APP_API_URL=https://yourdomain.onrender.com

Development (frontend/.env.local):
    
    REACT_APP_API_URL=http://localhost:5000

Install Dependencies & Start Frontend

    cd frontend
    npm install
    npm start

The frontend will run on port 3000 by default.
### 🛠 Features

    ✅ User authentication (Register, Login, Logout)

    ✅ Password reset functionality

    ✅ Create, edit, delete, and restore notes

    ✅ Move notes to the trash bin & permanently delete them

    ✅ View notes in a calendar page

    ✅ Dashboard page with note statistics & charts

    ✅ Color-coded notes

    ✅ Responsive UI (Material-UI)

📊 Dashboard Page

The Dashboard page provides an overview of user notes with real-time statistics, including:

    📌 Total number of notes

    📌 Color distribution (Pie Chart)

    📌 Notes created in the last 7 days (Bar Chart)

    📌 Notes per user (Bar Chart)

    📌 Latest notes

    📌 Bold, italic, and underlined notes count

📜 API Endpoints
🔑 Authentication

    POST /auth/register → Register a new user

    POST /auth/login → Login

    POST /auth/reset-password → Request password reset

    POST /auth/change-password → Change password

📝 Notes

    GET /notes → Fetch all notes

    POST /notes → Create a new note

    PUT /notes/:id → Update a note

    DELETE /notes/:id → Move a note to the trash bin

    DELETE /notes/:id/permanent → Permanently delete a note

    PUT /notes/:id/restore → Restore a note from the trash bin

📊 Statistics

    GET /stats → Fetch note statistics

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
