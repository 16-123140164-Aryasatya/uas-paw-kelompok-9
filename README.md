# Library Management System – UAS Kelompok 9

Aplikasi manajemen perpustakaan dengan **Python Pyramid + SQLAlchemy + PostgreSQL** backend dan **React Vite** frontend.

**6 Core Features:** Auth • Book Management • Borrowing (max 3 books) • Return & Fine • Search/Filter • History

## ��� Quick Start

```bash
# Backend
cd backend
python run.py  # http://localhost:6543

# Frontend (in another terminal)
cd frontend
npm install
npm run dev  # http://localhost:5173
```

Lihat [QUICK_START.md](QUICK_START.md) untuk API endpoints dan setup lengkap.

## ��� Project Structure

```
backend/                 # Pyramid + SQLAlchemy
├── app/
│   ├── models/         # User, Book, Borrowing
│   ├── views/          # API endpoints (14 total)
│   └── routes.py       # URL routing
├── alembic/            # Database migrations
├── development.ini     # Config
├── run.py             # Start server
└── sync_db.py         # Sync database schema

frontend/              # React + Vite
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page views
│   ├── auth/         # JWT auth
│   ├── api/          # API client
│   └── store/        # State management
└── package.json
```

## ��� Database

- **PostgreSQL** on Railway
- **Tables:** users (roles: member/librarian), books, borrowings
- **ORM:** SQLAlchemy with Alembic migrations

## ✨ Features Implemented

- ✅ User auth with JWT (member & librarian roles)
- ✅ Book CRUD (librarian) & browse (member)
- ✅ Borrow system with 3-book limit & 14-day due date
- ✅ Return with auto fine calculation (5000 Rp/day late)
- ✅ Search & filter (title, author, category)
- ✅ Borrowing history (member) & transaction history (librarian)

**Removed:** Bonus features (password change, profile update, cover upload, created_at, last_login, bio, publication_year)

## ��� Authentication

- JWT tokens valid for 7 days
- Bcrypt password hashing
- Role-based access (member/librarian)

## ��� API

14 total endpoints across:
- **Auth** (3): register, login, me
- **Books** (6): list, detail, create, update, delete, search
- **Borrowing** (7): list, my, history, borrow, return, approve, deny
- **Users** (1): list

## ��� Notes

- CORS enabled for localhost:5173 and localhost:3000
- All responses include only spec-required fields
- Database: PostgreSQL required (no SQLite fallback)

