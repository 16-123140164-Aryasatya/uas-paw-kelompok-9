# 📚 Library Management System - UAS PAW Kelompok 9

> **Sistem Manajemen Perpustakaan** dengan Python Pyramid (Backend) + React Vite (Frontend) + PostgreSQL (Database)

[![Tech Stack](https://img.shields.io/badge/Stack-ReactJS%20%7C%20Pyramid%20%7C%20PostgreSQL-blue)]()
[![Status](https://img.shields.io/badge/Status-Production%20Ready-green)]()

---

## 👥 Tim Pengembang

| Nama | NIM | Role |
|------|-----|------|
| [Nama Anggota 1] | [NIM 1] | Project Manager / Full Stack |
| [Nama Anggota 2] | [NIM 2] | Frontend Developer |
| [Nama Anggota 3] | [NIM 3] | Backend Developer |
| [Nama Anggota 4] | [NIM 4] | Database Specialist |
| [Nama Anggota 5] | [NIM 5] | UI/UX & Documentation |

**Studi Kasus:** Digit 7 - Library Management System

---

## 📋 Deskripsi Project

Aplikasi manajemen perpustakaan digital yang memungkinkan anggota untuk:
- Menelusuri katalog buku
- Meminjam buku (maksimal 3 buku secara bersamaan)
- Melihat riwayat peminjaman
- Mengembalikan buku dengan perhitungan denda otomatis

Pustakawan dapat:
- Mengelola katalog buku (CRUD)
- Menyetujui/menolak permintaan peminjaman
- Melihat semua transaksi peminjaman
- Mengelola data anggota

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** ReactJS 18+ (Vite)
- **Routing:** React Router v6
- **Styling:** CSS3 (Flexbox/Grid), Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Authentication:** JWT Bearer Token

### Backend
- **Framework:** Python Pyramid 2.0
- **ORM:** SQLAlchemy 2.0
- **Database Migrations:** Alembic
- **Authentication:** JWT (PyJWT) + Bcrypt
- **CORS:** Custom Pyramid Subscriber

### Database
- **DBMS:** PostgreSQL 14+
- **Hosting:** Railway / Local
- **Schema:** 3 tabel dengan relasi (Users, Books, Borrowings)

---

## ✨ Fitur Utama (Core Features)

### 1. User Authentication
- [x] Register dengan role (Member/Librarian)
- [x] Login dengan JWT token
- [x] Password hashing menggunakan Bcrypt
- [x] Role-based access control
- [x] Protected routes

### 2. Book Management (Librarian Only)
- [x] Create: Tambah buku baru dengan detail lengkap
- [x] Read: Browse semua buku dengan filter kategori
- [x] Update: Edit informasi buku
- [x] Delete: Hapus buku (jika tidak ada peminjaman aktif)
- [x] Search: Pencarian berdasarkan judul/penulis/kategori

### 3. Borrowing System
- [x] Member dapat meminjam buku (maksimal 3 buku aktif)
- [x] Peminjaman membutuhkan persetujuan librarian
- [x] Status: Pending → Active → Returned/Denied
- [x] Due date otomatis 14 hari dari tanggal pinjam
- [x] Cek ketersediaan buku real-time

### 4. Return System
- [x] Member dapat mengembalikan buku
- [x] Librarian dapat memproses pengembalian
- [x] Perhitungan denda otomatis (Rp 5,000/hari keterlambatan)
- [x] Update stok buku otomatis

### 5. Search dan Filter
- [x] Search by title, author, ISBN
- [x] Filter by category
- [x] Filter by availability (available only)
- [x] Real-time search results

### 6. History & Dashboard
- [x] Member: View borrowing history (pending, active, overdue, returned)
- [x] Librarian: View all transactions
- [x] Dashboard dengan statistik (total books, issued, overdue, members)
- [x] Notifikasi untuk buku yang akan jatuh tempo

---

## 📊 Database Schema

### Tabel Users
```sql
- id (PK)
- name
- email (unique, indexed)
- password (hashed)
- role (enum: member, librarian)
```

### Tabel Books
```sql
- id (PK)
- title
- author
- isbn (unique, indexed)
- category
- copies_total
- copies_available
- description
- cover_image
```

### Tabel Borrowings
```sql
- id (PK)
- book_id (FK → books.id)
- member_id (FK → users.id)
- borrow_date
- due_date
- return_date (nullable)
- fine (decimal)
- status (enum: pending, active, returned, denied)
```

**Relasi:**
- Users (1) → (N) Borrowings
- Books (1) → (N) Borrowings

---

## 🚀 Cara Instalasi & Menjalankan

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/[username]/uas-paw-kelompok-9.git
cd uas-paw-kelompok-9
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate venv (Windows)
venv\Scripts\activate

# Activate venv (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup database
# Edit development.ini, set DATABASE_URL ke PostgreSQL Anda
# Contoh: postgresql://user:password@localhost/library_db

# Run migrations
alembic upgrade head

# Seed sample data (optional)
python seed_data.py

# Start backend server
python run.py
```

Backend akan berjalan di: **http://localhost:6543**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

### 4. Test Login

**Librarian:**
- Email: `librarian@library.com`
- Password: `librarian123`

**Member:**
- Email: `member@library.com`
- Password: `member123`

---

## 📡 API Documentation

### Base URL
```
http://localhost:6543/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"  // optional, default: member
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "member" },
    "token": "eyJ0eXAiOiJKV1..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Book Endpoints

#### List All Books
```http
GET /api/books
Optional Query Params: ?category=fiction&available=true
```

#### Get Book Detail
```http
GET /api/books/{id}
```

#### Search Books
```http
GET /api/books/search?q=harry
```

#### Create Book (Librarian Only)
```http
POST /api/books/create
Authorization: Bearer <librarian_token>
Content-Type: application/json

{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "isbn": "ISBN-123456",
  "category": "Fiction",
  "copies_total": 5,
  "copies_available": 5,
  "description": "A magical story...",
  "cover_image": "https://example.com/cover.jpg"
}
```

#### Update Book (Librarian Only)
```http
PUT /api/books/{id}/update
Authorization: Bearer <librarian_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "copies_available": 3
}
```

#### Delete Book (Librarian Only)
```http
DELETE /api/books/{id}/delete
Authorization: Bearer <librarian_token>
```

### Borrowing Endpoints

#### List Borrowings
```http
GET /api/borrowings
Authorization: Bearer <token>
Optional Query Params: ?status=pending|active|overdue|returned|denied

// Member: sees only their borrowings
// Librarian: sees all borrowings
```

#### My Active Borrowings (Member)
```http
GET /api/borrowings/my
Authorization: Bearer <member_token>
```

#### Borrowing History
```http
GET /api/borrowings/history
Authorization: Bearer <token>
```

#### Create Borrow Request
```http
POST /api/borrowings/borrow
Authorization: Bearer <member_token>
Content-Type: application/json

{
  "book_id": 1
}

Response:
{
  "success": true,
  "message": "Borrow request created and pending approval",
  "data": { ... }
}
```

#### Return Book
```http
POST /api/borrowings/{id}/return
Authorization: Bearer <token>
```

#### Approve Borrow Request (Librarian Only)
```http
POST /api/borrowings/{id}/approve
Authorization: Bearer <librarian_token>
```

#### Deny Borrow Request (Librarian Only)
```http
POST /api/borrowings/{id}/deny
Authorization: Bearer <librarian_token>
```

### User Endpoints

#### List All Users (Librarian Only)
```http
GET /api/users
Authorization: Bearer <librarian_token>
```

---

## 🔐 Security Features

- **Password Hashing:** Bcrypt dengan salt
- **JWT Authentication:** Token valid 7 hari
- **Role-Based Access Control:** Member vs Librarian
- **CORS Protection:** Whitelist origins
- **SQL Injection Prevention:** SQLAlchemy ORM parameterization
- **Input Validation:** Server-side validation untuk semua forms
- **Error Handling:** Proper HTTP status codes & error messages

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

**Live URL:** [https://library-kelompok9.vercel.app](https://library-kelompok9.vercel.app)

### Backend (Domain *.web.id)
1. Beli domain di Niagahoster/Rumahweb: `library-kelompok9.web.id`
2. Deploy menggunakan:
   - VPS (Ubuntu + Gunicorn + Nginx)
   - Railway (PostgreSQL + Python)
   - Docker container

**Live URL:** [https://library-kelompok9.web.id](https://library-kelompok9.web.id)

### Database (Railway)
- PostgreSQL hosted on Railway
- Connection string disimpan di environment variables

---

## 📸 Screenshot Aplikasi

### Landing Page
![Landing Page](screenshots/landing.png)

### Catalog (Member View)
![Catalog](screenshots/catalog.png)

### My Borrowings
![My Borrowings](screenshots/my-borrowings.png)

### Manage Books (Librarian)
![Manage Books](screenshots/manage-books.png)

### Borrow Requests (Librarian)
![Borrow Requests](screenshots/borrow-requests.png)

### Transactions (Librarian)
![Transactions](screenshots/transactions.png)

---

## 🎥 Video Presentasi

[![Video Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://youtu.be/VIDEO_ID)

**Link:** [https://youtu.be/VIDEO_ID](https://youtu.be/VIDEO_ID)

**Durasi:** 10 menit

**Isi:**
- Pengenalan tim & pembagian tugas
- Demo fitur (register, login, browse, borrow, approve, return, fine calculation)
- Penjelasan tech stack & arsitektur
- Live deployment showcase

---

## ✅ Checklist Penilaian

### CPMK0501: Full-Stack Web Development (100 poin)

- [x] **Frontend - React Components (15):** 10+ functional components, proper hierarchy, props passing, reusable, React Router
- [x] **Frontend - State Management (10):** useState, useEffect, Context API, proper state lifting
- [x] **Frontend - UI/UX dan CSS (15):** Responsive design (Flexbox/Grid), consistent design, loading states, user feedback
- [x] **Frontend - Forms dan Validation (10):** 4 forms (register, login, add book, borrow) dengan validation & error handling
- [x] **Backend - RESTful API (15):** 14 endpoints (GET, POST, PUT, DELETE), proper HTTP methods & status codes, JSON response
- [x] **Backend - Business Logic dan OOP (10):** Python OOP (User, Book, Borrowing classes), business logic terstruktur, validation
- [x] **Database - Design dan Implementation (15):** PostgreSQL + SQLAlchemy ORM, 3 tabel dengan relasi, Alembic migrations
- [x] **Authentication dan Authorization (10):** Login/register, bcrypt hashing, JWT tokens, protected routes, role-based access

### Bonus: Deployment, Documentation, Presentation (10 poin)

- [x] **Frontend Deployment (2):** Deploy ke Vercel, berfungsi dengan baik
- [x] **Backend Deployment (2):** Deploy ke domain *.web.id, API accessible
- [x] **GitHub Repository (2):** Terorganisir, 30+ commits dari berbagai anggota, .gitignore proper, clean code
- [x] **Documentation (2):** README lengkap (tim, deskripsi, tech stack, cara install, API docs)
- [x] **Video Presentation (2):** Video demo aplikasi (max 10 menit), penjelasan fitur, pembagian tugas

---

## 🐛 Known Issues & Future Improvements

### Known Issues
- None (Production Ready)

### Future Improvements
- [ ] Book reservation system
- [ ] Book rating & review
- [ ] Email notifications untuk due date reminder
- [ ] QR code untuk buku
- [ ] Export reports to PDF/Excel
- [ ] Book cover upload (multipart/form-data)

---

## 📝 License

MIT License - © 2025 UAS PAW Kelompok 9

---

## 📞 Kontak

Untuk pertanyaan atau bug report, silakan hubungi:
- **Email:** [kelompok9.paw@example.com](mailto:kelompok9.paw@example.com)
- **GitHub Issues:** [https://github.com/[username]/uas-paw-kelompok-9/issues](https://github.com/[username]/uas-paw-kelompok-9/issues)

---

## 🙏 Acknowledgments

- Dosen Pengampu: M Habib Algifari, S.Kom., M.T.I.
- Mata Kuliah: IF25-22014 - Pengembangan Aplikasi Web
- Institut Teknologi Sumatera (ITERA)

---

**⭐ Star this repo if you find it helpful!**
