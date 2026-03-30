# 💬 PingChat – MERN Real-Time Chat Application

PingChat is a modern **real-time chat web application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** and **Socket.io** for instant communication.

It allows users to chat in real time, upload profile avatars, see online users, and switch between **Light and Dark modes** with a modern responsive interface.

---

# 🚀 Features

### 💬 Real-Time Messaging
- Instant chat using **Socket.io**
- Bi-directional communication
- Messages update instantly without refresh

### 🔐 Authentication System
- Secure login and signup
- Password hashing using **bcrypt**
- **JWT authentication**
- Stored in **HTTP-only cookies**

### 👤 Profile Avatars
- Upload and update profile pictures
- Implemented using **Multer**

### 🟢 Online User Status
- Displays users currently online
- Real-time presence tracking

### 🌗 Light & Dark Mode
- Toggle between light and dark themes
- Fully responsive UI

### 🎨 Modern UI
- Built with **TailwindCSS**
- Clean glassmorphism-inspired design

### ⚡ State Management
- Global state handled using **Zustand**

### 🔔 Toast Notifications
- Instant feedback for actions and errors

---

# 🛠️ Tech Stack

## Frontend
- React.js (v19)
- Vite
- TailwindCSS v4
- Zustand
- Axios
- Lucide React Icons
- Socket.io Client

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Multer
- bcrypt
- JSON Web Tokens (JWT)
- Cookie Parser
- CORS

---

# 📦 Installation & Setup

Follow these steps to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/PingChat-A-Mern-ChatApp.git
cd PingChat-A-Mern-ChatApp

---

## 2️⃣ Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## 3️⃣ Install Dependencies

Open **two terminals**.

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 4️⃣ Run Development Servers

### Start Backend Server

```bash
cd backend
npm run dev
```

### Start Frontend Server

```bash
cd frontend
npm run dev
```

Now open your browser and visit:

```
http://localhost:5173
```

---

# 📁 Project Structure

```
PingChat-A-Mern-ChatApp
│
PingChat
├── backend/                # Server-side logic
│   ├── controllers/        # Request handlers & business logic
│   ├── db/                 # Database connection & configuration
│   ├── middleware/         # Custom authentication/error functions
│   ├── models/             # Schema definitions (e.g., Mongoose)
│   ├── routes/             # API endpoint definitions
│   ├── socket/             # Real-time communication logic
│   ├── utils/              # Helper functions
│   ├── package.json        # Backend dependencies
│   └── server.js           # Entry point for the backend
├── frontend/               # Client-side (React + Vite)
│   ├── public/             # Static assets (favicons, etc.)
│   ├── src/                # Application source code
│   ├── .gitignore          # Frontend-specific ignored files
│   ├── index.html          # Main HTML entry
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Styling configuration
│   └── vite.config.js      # Vite build configuration
├── .gitignore              # Root-level ignored files (node_modules, .env)
└── README.md               # Project documentation
```
---

# 📸 Screenshots

(Add screenshots of your chat UI here)

Example:

* Login Page
* Chat Interface
* Dark Mode
* Profile Avatar Upload

---

# 🌍 Deployment

You can deploy PingChat using:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway / Cyclic
* **Database:** MongoDB Atlas

---

# 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you like this project, don't forget to **star the repository!**
