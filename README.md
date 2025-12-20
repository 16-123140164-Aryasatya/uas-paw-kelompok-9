# Library Management System
## UAS Pengembangan Aplikasi Web - Kelompok 9

> **Studi Kasus:** Library Management System (Digit 7)  
> **Mata Kuliah:** IF25-22014 - Pengembangan Aplikasi Web  
> **Dosen Pengampu:** M Habib Algifari, S.Kom., M.T.I.

---

## 👥 Tim Pengembang

| Nama | NIM | Role | Pembagian Tugas |
|------|-----|------|-----------------|
| [Nama Anggota 1] | [NIM] | Team Leader | [Tugas yang dikerjakan] |
| [Nama Anggota 2] | [NIM] | Frontend Developer | [Tugas yang dikerjakan] |
| [Nama Anggota 3] | [NIM] | Frontend Developer | [Tugas yang dikerjakan] |
| [Nama Anggota 4] | [NIM] | Backend Developer | [Tugas yang dikerjakan] |
| [Nama Anggota 5] | [NIM] | Backend Developer | [Tugas yang dikerjakan] |

---

## 📖 Deskripsi Project

Aplikasi **Library Management System** adalah sistem manajemen perpustakaan digital yang memungkinkan anggota untuk meminjam buku dan pustakawan untuk mengelola koleksi buku serta transaksi peminjaman. Sistem ini dibangun menggunakan **Python Pyramid Framework** untuk backend dan **ReactJS** untuk frontend dengan database **PostgreSQL**.

### Fitur Utama

#### ✅ Fitur Wajib (Core Features):

1. **User Authentication**
   - Register dan Login dengan role Member dan Librarian
   - JWT-based authentication
   - Password hashing dengan Bcrypt

2. **Book Management**
   - Librarian: CRUD buku (title, author, ISBN, category, copies)
   - Member: Browse dan search katalog buku

3. **Borrowing System**
   - Member dapat meminjam maksimal 3 buku
   - Periode peminjaman 14 hari
   - Status: Pending → Approved → Active → Returned

4. **Return System**
   - Librarian memproses pengembalian buku
   - Perhitungan denda otomatis: Rp 5.000/hari keterlambatan

5. **Search & Filter**
   - Pencarian berdasarkan judul, penulis, atau kategori
   - Filter by kategori dan ketersediaan buku

6. **History & Dashboard**
   - Member: Riwayat peminjaman pribadi
   - Librarian: Dashboard transaksi semua peminjaman

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** ReactJS (Vite)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS (Custom) + Tailwind CSS
- **State Management:** React Context API

### Backend
- **Framework:** Python Pyramid Framework
- **ORM:** SQLAlchemy
- **Database Migrations:** Alembic
- **Authentication:** JWT (PyJWT)
- **Password Hashing:** Bcrypt

### Database
- **DBMS:** PostgreSQL
- **Hosting:** Railway (Production)
- **Tables:** users, books, borrowings

### Deployment
- **Frontend:** Vercel
- **Backend:** [Domain *.web.id - To be deployed]
- **Database:** Railway PostgreSQL

---

## 📂 Struktur Project

```
uas-paw-kelompok-9/
├── backend/                    # Python Pyramid Backend
│   ├── app/
│   │   ├── models/            # Database Models
│   │   │   ├── user.py        # User & UserRole
│   │   │   ├── book.py        # Book model
│   │   │   └── borrowing.py   # Borrowing & BorrowStatus
│   │   ├── views/             # API Endpoints
│   │   │   ├── auth.py        # Authentication endpoints
│   │   │   ├── book.py        # Book management
│   │   │   ├── borrowing.py   # Borrowing operations
│   │   │   └── user.py        # User management
│   │   └── routes.py          # URL routing configuration
│   ├── alembic/               # Database migrations
│   ├── development.ini        # Pyramid configuration
│   ├── requirements.txt       # Python dependencies
│   ├── run.py                 # Application entry point
│   └── .env.example           # Environment variables template
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   │   ├── librarian/     # Librarian dashboard & views
│   │   │   └── user/          # Member views
│   │   ├── auth/              # Authentication context
│   │   ├── api/               # API client & endpoints
│   │   ├── store/             # State management
│   │   └── styles/            # Global styles
│   ├── package.json           # Node dependencies
│   └── vite.config.js         # Vite configuration
│
└── README.md                   # Project documentation
```

---

## 🚀 Cara Instalasi dan Menjalankan

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL 13+
- Git

### 1. Clone Repository

```bash
git clone https://github.com/[username]/uas-paw-kelompok-9.git
cd uas-paw-kelompok-9
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env dengan kredensial database Anda

# Run database migrations
alembic upgrade head

# (Optional) Seed data untuk testing
python seed_data.py

# Run server
python run.py
```

Backend akan berjalan di `http://localhost:6543`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### 4. Login Credentials (Setelah Seed)

**Librarian:**
- Email: `librarian@library.com`
- Password: `librarian123`

**Member:**
- Email: `member@library.com`
- Password: `member123`

---

## 🔗 Link Deployment

- **Frontend (Vercel):** [https://[project-name].vercel.app](https://[project-name].vercel.app)
- **Backend (Domain):** [https://[domain-name].web.id](https://[domain-name].web.id)
- **Video Presentasi:** [Link YouTube/Google Drive - To be added]

---

## 📡 API Documentation

### Base URL
- **Local:** `http://localhost:6543/api`
- **Production:** `https://[domain-name].web.id/api`

### Authentication Endpoints

#### 1. Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member"
}

Response 201:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "member" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "member" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "member" }
}
```

### Book Endpoints

#### 4. Get All Books
```http
GET /api/books?category=Fiction&available=true

Response 200:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name",
      "isbn": "ISBN-123",
      "category": "Fiction",
      "copies_total": 5,
      "copies_available": 3,
      "description": "Book description",
      "cover_image": "/uploads/cover.jpg",
      "is_available": true
    }
  ]
}
```

#### 5. Get Book Detail
```http
GET /api/books/{id}

Response 200:
{
  "success": true,
  "data": { ...book details... }
}
```

#### 6. Search Books
```http
GET /api/books/search?q=Harry

Response 200:
{
  "success": true,
  "data": [ ...matching books... ]
}
```

#### 7. Create Book (Librarian Only)
```http
POST /api/books
Authorization: Bearer {librarian-token}
Content-Type: application/json

{
  "title": "New Book",
  "author": "Author Name",
  "isbn": "ISBN-12345",
  "category": "Fiction",
  "copies_total": 5,
  "copies_available": 5,
  "description": "Description",
  "cover_image": "/uploads/cover.jpg"
}

Response 201:
{
  "success": true,
  "message": "Book created successfully",
  "data": { ...book details... }
}
```

#### 8. Update Book (Librarian Only)
```http
PUT /api/books/{id}
Authorization: Bearer {librarian-token}
Content-Type: application/json

{
  "title": "Updated Title",
  "copies_available": 4
}

Response 200:
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ...updated book... }
}
```

#### 9. Delete Book (Librarian Only)
```http
DELETE /api/books/{id}
Authorization: Bearer {librarian-token}

Response 200:
{
  "success": true,
  "message": "Book deleted successfully"
}
```

### Borrowing Endpoints

#### 10. Create Borrow Request
```http
POST /api/borrowings
Authorization: Bearer {token}
Content-Type: application/json

{
  "book_id": 1
}

Response 201:
{
  "success": true,
  "message": "Borrow request created and pending approval",
  "data": {
    "id": 1,
    "book": { ...book details... },
    "member": { ...user details... },
    "borrow_date": "2025-12-20",
    "due_date": "2026-01-03",
    "status": "pending"
  }
}
```

#### 11. Get My Borrowings
```http
GET /api/borrowings/my
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [ ...active and pending borrowings... ]
}
```

#### 12. Get Borrowing History
```http
GET /api/borrowings/history
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [ ...all borrowing history... ]
}
```

#### 13. Request Return
```http
POST /api/borrowings/{id}/return
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "message": "Return request submitted, awaiting librarian approval"
}
```

#### 14. Approve Borrowing (Librarian Only)
```http
POST /api/borrowings/{id}/approve
Authorization: Bearer {librarian-token}

Response 200:
{
  "success": true,
  "message": "Borrowing approved and activated"
}
```

#### 15. Approve Return (Librarian Only)
```http
POST /api/borrowings/{id}/approve-return
Authorization: Bearer {librarian-token}

Response 200:
{
  "success": true,
  "message": "Return approved, borrowing marked as returned",
  "data": {
    "borrowing": { ...details... },
    "fine": 15000,
    "fine_message": "Late return fine: Rp 15,000"
  }
}
```

---

## 🗄️ Database Schema

### ERD (Entity Relationship Diagram)

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    Users    │         │  Borrowings  │         │    Books    │
├─────────────┤         ├──────────────┤         ├─────────────┤
│ id (PK)     │────┐    │ id (PK)      │    ┌────│ id (PK)     │
│ name        │    └───<│ member_id(FK)│    │    │ title       │
│ email       │         │ book_id (FK) │>───┘    │ author      │
│ password    │         │ borrow_date  │         │ isbn        │
│ role        │         │ due_date     │         │ category    │
└─────────────┘         │ return_date  │         │ copies_total│
                        │ fine         │         │ copies_avail│
                        │ status       │         │ description │
                        └──────────────┘         │ cover_image │
                                                 └─────────────┘
```

### Table: `users`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Primary key |
| name | VARCHAR(100) | User's full name |
| email | VARCHAR(100) | Unique email (login) |
| password | VARCHAR(255) | Hashed password (bcrypt) |
| role | ENUM | 'member' or 'librarian' |

### Table: `books`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Primary key |
| title | VARCHAR(200) | Book title |
| author | VARCHAR(100) | Author name |
| isbn | VARCHAR(20) | Unique ISBN |
| category | VARCHAR(50) | Book category |
| copies_total | INTEGER | Total copies owned |
| copies_available | INTEGER | Available copies |
| description | TEXT | Book description |
| cover_image | VARCHAR(255) | Cover image path |

### Table: `borrowings`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER (PK) | Primary key |
| book_id | INTEGER (FK) | Foreign key to books |
| member_id | INTEGER (FK) | Foreign key to users |
| borrow_date | DATE | Borrowing date |
| due_date | DATE | Due date (14 days) |
| return_date | DATE | Actual return date |
| fine | NUMERIC(10,2) | Late fee (Rp 5000/day) |
| status | ENUM | 'pending', 'active', 'returned', 'denied' |

---

## 📸 Screenshots

### 1. Landing Page
![Landing Page](./screenshots/landing.png)

### 2. Member Dashboard
![Member Dashboard](./screenshots/member-dashboard.png)

### 3. Book Catalog
![Book Catalog](./screenshots/catalog.png)

### 4. Borrowing History
![Borrowing History](./screenshots/history.png)

### 5. Librarian Dashboard
![Librarian Dashboard](./screenshots/librarian-dashboard.png)

### 6. Book Management
![Book Management](./screenshots/manage-books.png)

---

## 🎥 Video Presentasi

**Link Video:** [YouTube/Google Drive - To be added]

**Durasi:** Max 10 menit

**Konten Video:**
- Intro tim dan pembagian tugas
- Demo semua fitur aplikasi
- Penjelasan teknis (Frontend, Backend, Database)
- Code walkthrough singkat
- Deployment demonstration

---

## 📝 Checklist Pengerjaan

### Frontend ✅
- [x] 6+ functional components dengan proper hierarchy
- [x] useState dan useEffect implementation
- [x] Responsive design (Flexbox/Grid)
- [x] 3+ forms dengan validation
- [x] React Router untuk navigasi
- [x] Loading states dan error handling

### Backend ✅
- [x] 15+ RESTful API endpoints
- [x] Proper HTTP methods (GET, POST, PUT, DELETE)
- [x] JSON response format
- [x] Business logic dengan OOP
- [x] Data validation dan error handling

### Database ✅
- [x] PostgreSQL dengan SQLAlchemy ORM
- [x] 3 tabel dengan relasi (One-to-Many)
- [x] Alembic migrations
- [x] Seed data untuk testing

### Authentication & Authorization ✅
- [x] User register dan login
- [x] Password hashing (bcrypt)
- [x] JWT token management
- [x] Protected routes
- [x] Role-based access (Member & Librarian)

### Deployment & Documentation 🚧
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to *.web.id domain
- [ ] Database PostgreSQL di Railway
- [x] README lengkap dengan API docs
- [x] Code comments yang membantu
- [ ] Video presentasi (max 10 menit)

---

## 👨‍💻 Development Notes

### Known Issues & Limitations
- File upload untuk cover buku masih menggunakan URL string
- Pagination belum diimplementasikan untuk list buku
- Email notification belum tersedia

### Future Improvements
- Implementasi book reservation system
- Rating dan review untuk buku
- Export laporan ke PDF/Excel
- Email notification untuk due date reminder
- Admin panel untuk statistik lengkap

---

## 📄 License

This project is created for educational purposes as part of the Web Application Development course final project at Institut Teknologi Sumatera.

---

## 🙏 Acknowledgments

- **Dosen Pengampu:** M Habib Algifari, S.Kom., M.T.I.
- **Program Studi:** Teknik Informatika
- **Fakultas:** Teknologi Industri
- **Institut:** Institut Teknologi Sumatera

---

**© 2025 Kelompok 9 - IF25-22014 Pengembangan Aplikasi Web**
