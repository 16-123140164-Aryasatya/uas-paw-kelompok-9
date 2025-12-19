# Library Management System - Quick Start Guide

## 🎨 Latest Update: UI Overhaul Complete

This release includes a comprehensive UI redesign with:
- **New Branding:** "Librarizz" (rebranded from LibraryHub)
- **Professional Design System:** Complete CSS overhaul with design tokens
- **Responsive Components:** Sticky sidebar, improved navigation
- **Real Data Statistics:** Dashboard uses actual calculated data
- **Production Ready:** No GenAI-like appearance, clean professional UI

See [UI_IMPROVEMENTS_PROGRESS.md](UI_IMPROVEMENTS_PROGRESS.md) for detailed changes.

---

## 🚀 Prerequisites
- Python 3.9+ (check: `python --version`)
- Node.js 16+ (check: `node --version`)
- Virtual environment (venv)
- SQLite (dev) or PostgreSQL (prod)

---

## ✅ Backend Setup & Run

### 1. Install Backend Dependencies
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install package in dev mode (IMPORTANT!)
pip install -e .

# Verify installation
pip list | grep library_backend
```

### 2. Setup Database
```bash
# Auto-create SQLite database
python sync_db.py

# (Optional) Seed sample data
python seed_data.py
```

### 3. Run Backend Server
```bash
# Start server
python run.py

# OR alternative method:
# pserve development.ini --reload

# Server running at: http://0.0.0.0:6543
```

**Core API Endpoints:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `GET /api/books` - List all books
- `GET /api/borrowings/my` - My borrowings
- `POST /api/borrowings/borrow/{book_id}` - Borrow book
- `POST /api/borrowings/{id}/return` - Return book

---

## ✅ Frontend Setup & Run

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Run Frontend Server
```bash
# Development with hot reload
npm run dev

# Server running at: http://localhost:5173
```

### 3. Production Build
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview

# Output in: dist/
```

---

## 🎯 Full Stack - Quick Start

### Terminal 1: Backend
```bash
cd backend
source venv/Scripts/activate  # Windows: venv\Scripts\activate
python run.py
# ✅ Listening on http://0.0.0.0:6543
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# ✅ Local: http://localhost:5173
```

### Open Browser
Go to: **http://localhost:5173**

### Test Credentials
**Librarian:**
- Email: `librarian@example.com`
- Password: `password`

**Member:**
- Email: `member@example.com`
- Password: `password`

---

## 🔧 Troubleshooting

### Error: "No package metadata was found for library_backend"
**Solution:**
```bash
cd backend
pip install -e . --force-reinstall --no-deps
```

### Error: "Port 6543 already in use"
**Solution:** Kill existing process or edit development.ini

### Error: "Database locked" (SQLite)
**Solution:**
```bash
rm library.db
python sync_db.py
```

### Frontend not connecting to backend
**Solution:** Check:
1. Backend running on port 6543
2. CORS enabled in backend
3. API_URL correct in frontend .env

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── views/         # API endpoints  
│   │   └── routes.py      # Route setup
│   ├── setup.py           # Package config
│   ├── run.py             # Entry point
│   ├── development.ini    # Server config
│   └── library.db         # SQLite (auto-created)
│
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # Components
│   │   ├── styles/        # CSS & design system
│   │   └── api/           # API client
│   ├── vite.config.js
│   └── package.json
│
├── UI_IMPROVEMENTS_PROGRESS.md  # Detailed UI changes
└── README.md
```

---

## 🔐 Environment Variables (Optional)

### Backend (.env)
```
DATABASE_URL=sqlite:///library.db
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
VITE_API_URL=/api
```

---

## ✨ Key Features

✅ **Professional Login/Register UI** - New "Librarizz" branding  
✅ **Role-based Access** - Librarian vs Member with distinct UIs  
✅ **Book Catalog** - Browse and search available books  
✅ **Borrow/Return Workflow** - Complete borrowing management  
✅ **Dashboard with Real Stats** - Actual calculated metrics  
✅ **API Response Caching** - 5-minute TTL for performance  
✅ **Code-splitting** - 9 lazy-loaded pages  
✅ **Image Lazy Loading** - Optimized bandwidth usage  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **User-friendly Error Messages** - In Indonesian  

---

## 📊 Performance

- Bundle size: 231.87 kB (gzip: 76.14 kB)
- Build time: 2.92 seconds
- 9 lazy-loaded chunks
- 14% smaller than before optimization
- 28% faster Time-to-Interactive

---

## 📚 Documentation

- **UI Changes:** See [UI_IMPROVEMENTS_PROGRESS.md](UI_IMPROVEMENTS_PROGRESS.md)
- **Backend Architecture:** See `backend/README.md`
- **Project Status:** See `PROJECT_COMPLETION_REPORT.md`
- **Performance Details:** See `PERFORMANCE_OPTIMIZATIONS.md`

---

## ✅ Status: Production Ready

Both frontend & backend are production-ready!

**Latest Release:**
- ✅ UI Redesign complete (Librarizz branding)
- ✅ All navigation updated
- ✅ Dashboard with real data
- ✅ Build passes (no errors)
- ✅ Performance optimized
- ✅ Mobile responsive

**Next:** Deploy to production server
- **Tables:** users, books, borrowings
- **Sync:** Run `python sync_db.py` in backend folder if needed

## Features

✅ User authentication with JWT (member & librarian roles)  
✅ Book CRUD (librarian) & browse (member)  
✅ Borrow system with 3-book limit & 14-day due date  
✅ Return with automatic fine calculation (5000 Rp/day late)  
✅ Search & filter by title, author, category  
✅ Transaction history (members & librarian)  

**Removed:** Bonus features (password change, profile update, cover upload, created_at, last_login, bio, publication_year)

## Notes

- All responses include only core fields per spec
- Auth token: JWT valid for 7 days
- CORS enabled for http://localhost:5173 and http://localhost:3000
