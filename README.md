# Sales CRM & Live Chat System

A production-level, feature-rich Sales CRM and Live Chat platform designed with a backend-first Service Layer Architecture and a premium responsive React frontend.

---

## 🚀 Key Features

- **Robust Role-Based Access Control (RBAC):**
  - **Admin:** Full system visibility, dashboard metrics, sales user creation, lead creation, and lead assignment.
  - **Sales:** Restricted view displaying only leads assigned to the logged-in sales agent (filtered strictly in the backend).
- **Real-Time Live Chat:**
  - Instantly exchange messages between Admins and Sales agents.
  - Features typing indicators, online status dots, and unread conversation badges.
  - Responsive overlay slide drawer on mobile viewports.
- **Activity & Audit Logs:**
  - Complete chronological event timeline tracking lead assignment, user creation, and status updates.
- **Real-Time Notification Bell:**
  - Unread count badge and toggle alerts when events occur.
- **Global Theme Engine:**
  - Modern Glassmorphism layout design with support for **Dark Mode** and **Light Mode** transitions.
- **100% Mobile & Device Responsive:**
  - Media queries and table scroll boundaries protecting all grid lists, settings cards, charts, and pages.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, React Router, Context API, Lucide Icons, Vanilla CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), Cookie-based auth
- **Real-Time:** WebSockets / Socket.io

---

## 📂 Project Structure

```
Sales-CRM-System/
├── backend/                  # Node.js + Express Backend Service
│   ├── seed/                 # Database seed scripts (e.g., admin initializer)
│   └── src/
│       ├── config/           # Database & server configuration variables
│       ├── controllers/      # Thin controller layer translating HTTP requests
│       ├── middleware/       # JWT protection, role checks, validation interceptors
│       ├── models/           # Mongoose schemas (User, Lead, Notification, Message)
│       ├── routes/           # REST endpoints definition
│       ├── services/         # Rich business logic layer (strictly isolates queries)
│       └── utils/            # Shared helper functions (Async wrappers, ApiResponse structures)
│
└── frontend/                 # React.js + Vite Frontend Application
    ├── public/               # Static web assets
    └── src/
        ├── assets/           # Client-side style assets and logos
        ├── components/       # Reusable React components
        │   ├── chat/         # Real-time chat sidebars, windows, and headers
        │   ├── common/       # Global inputs, custom buttons, loaders, pagination
        │   ├── layout/       # Dashboard frame, sidebar, header navbar, footer
        │   ├── notifications/# Toggle bell dropdown overlays
        │   ├── profile/      # User cards and metrics grids
        │   └── reports/      # Summary diagrams and reports
        ├── context/          # State providers (AuthContext, ThemeContext)
        ├── pages/            # Page layouts separated by role access (Admin, Sales, Shared)
        ├── services/         # Axios api interceptor wrappers
        └── styles/           # Main global CSS rules supporting dark mode bindings
```

---

## ⚙️ Installation & Setup

### 1. Database Configuration
Ensure MongoDB is running locally or provide a valid URI in your environment variables.

### 2. Run Database Seeding
Initialize the Admin user by running:
```bash
cd backend
npm run seed
```
*Default Credentials:*
- **Email:** `admin@gmail.com`
- **Password:** `Admin@123`

### 3. Run Backend Server
```bash
cd backend
npm install
npm run dev
```

### 4. Run Frontend Application
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📂 Design Architecture Rules
This codebase adheres to a clean **Layered Service Architecture**:
1. **Controllers must remain thin.** They only gather parameters from `req` and pass them to the service.
2. **Services handle all business logic.** Database calls (`Mongoose.find()`, filter filters, validation criteria) must remain isolated in the Service Layer.
3. **Responsive styling** is handled natively using custom CSS properties mapped under `:root` and `[data-theme="dark"]`. No ad-hoc classes or utility overlays are allowed.
