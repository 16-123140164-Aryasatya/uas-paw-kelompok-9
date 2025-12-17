import React, { useState } from "react";
import "./borrow_user.css";

const borrowedBooksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classics",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxkSBqckID-Y-0a6wyjt973_TEG5MN423RoRXIiIoWNy1_mSHXAMHaAGzb2eHjbcZpt2MeBgGPFIxcLCgcRq2_vk3FWTm-tNiNZOF8Wpn7fMed0mbLDfNFZEpCHhxI_J9W5NOiXo9sA3F9C7qPnAXTFNM0Q_eTQ8XLBlkEacLekNXkoiVLds8W1HEWpSsYQVkqwBQ1lGtmP3SGbF2pa1gGeq7-z2nP_0IktcE2x_0DHKLYTD9tTaO2wvL1A9YSGkX-RmYfOw4bJkSJ",
    borrowedDate: "Sep 20, 2023",
    dueDate: "Oct 10, 2023",
    status: "overdue",
    renewals: "0/3",
    fine: 5.00
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0TAqeY_eee-1aa8vyEajOGBy6tQQpa8wgMZR2oOJIItF9_AvIHmgzOVamrXv4Bbe5VY2dzFVVBegdM1_M7mPhNprkv_hw-K1Mhv85yvQt2rr16QaiQk_oJnjOCxIsnC155DzH9Hv4HsdbpKJO_Ztm7TWcsowqLWbN0SpWuXcEvZqKkW-ndS3pDOM3_ysLDKiI9lY6Pt1b8753yaC3N-c6VEKhTtbn54gNQUeLHqgre8pYJvzZzTpVcekUwz47Wfm6hARjsh8WiiQf",
    borrowedDate: "Oct 01, 2023",
    dueDate: "Oct 25, 2023",
    status: "due-soon",
    renewals: "1/3"
  },
  {
    id: 3,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Design",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEkRKYeqnzc1VbxooRMmA_uBGaT6fDdHrqF2sldrj0KDFh9QU_WaCuBhHaqm7UNLUv5mqOy35flP_XwviIZNK6wUCJnLLTO26I_yOKutsWSu4OuWgMnbNnK--k2UjMmomXvHcV317fM6l95DzfCk06-OoCgidQmYy7E1eGOgqliyv42DkUx467dpVuPciJwcpGqRj_Y2GNT0syowBGolokh4t3kZxVsxJU5yQOPKp8ZSefgXN-Gui3ZGNehLEX7XFKkIDrZ3A-U7Jz",
    borrowedDate: "Oct 10, 2023",
    dueDate: "Nov 10, 2023",
    status: "active",
    renewals: "3/3"
  },
  {
    id: 4,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuwANTa3gTlQcBWoCKtQSHfZtPX-iwLRGeQRk6TjoSwqO2_YbnSlY0NfChzCRFxlTTSqY8kRYU6tvOtvNZaGGux3f0lw_JwfRpXhzGueRC-vwQjEj7hkB0hQZF4_Kf2l4M_rDCi_3dsCgFZTF7kNJzfAps7MuQNS7BGhtldZQBa1JhMIf2LEZmnq7qdP_glmWid2cTCiSui2osZSzWWTATE89MzOnKlLPybdC-6rHvCapzMklC2rwS9JEJFANNnA3Z5ZyfMPKfcXV5",
    borrowedDate: "Oct 15, 2023",
    dueDate: "Nov 15, 2023",
    status: "active",
    renewals: "3/3"
  }
];

const BorrowUser = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status) => {
    switch (status) {
      case "overdue":
        return { label: "Overdue", className: "status-overdue" };
      case "due-soon":
        return { label: "Due Soon", className: "status-due-soon" };
      case "active":
        return { label: "Active", className: "status-active" };
      default:
        return { label: status, className: "" };
    }
  };

  const totalBorrowed = borrowedBooksData.length;
  const dueSoon = borrowedBooksData.filter(book => book.status === "due-soon").length;
  const overdue = borrowedBooksData.filter(book => book.status === "overdue").length;

  return (
    <>
      <div className="borrow-container">
        {/* Alert Banner */}
        {overdue > 0 && (
          <div className="alert-banner alert-danger">
            <div className="alert-content">
              <div className="alert-header">
                <span className="alert-icon">⚠️</span>
                <p className="alert-title">Action Required: Outstanding Fine</p>
              </div>
              <p className="alert-message">
                You have an overdue fine of $5.00. Please clear this balance to renew books.
              </p>
            </div>
            <button className="btn-pay-now">Pay Now</button>
          </div>
        )}

        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Current Borrowings</h1>
            <p className="page-subtitle">
              Manage your active loans, renew books, and track due dates.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-history">
              <span className="btn-icon">📜</span>
              View History
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">📚</span>
              <p className="stat-label">Total Borrowed</p>
            </div>
            <p className="stat-value">{totalBorrowed}</p>
          </div>
          <div className="stat-card stat-warning">
            <div className="stat-header">
              <span className="stat-icon">⏰</span>
              <p className="stat-label">Due Soon</p>
            </div>
            <p className="stat-value">{dueSoon}</p>
          </div>
          <div className="stat-card stat-danger">
            <div className="stat-header">
              <span className="stat-icon">⚠️</span>
              <p className="stat-label">Overdue</p>
            </div>
            <p className="stat-value">{overdue}</p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="filter-bar">
          <div className="filter-chips">
            <button
              className={`filter-chip ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All Loans
            </button>
            <button
              className={`filter-chip ${filterStatus === "overdue" ? "active" : ""}`}
              onClick={() => setFilterStatus("overdue")}
            >
              Overdue
              {overdue > 0 && <span className="chip-badge">{overdue}</span>}
            </button>
            <button
              className={`filter-chip ${filterStatus === "due-soon" ? "active" : ""}`}
              onClick={() => setFilterStatus("due-soon")}
            >
              Due Soon
            </button>
          </div>
          <div className="sort-info">
            <span className="sort-icon">↕️</span>
            <span>Sort by Due Date</span>
          </div>
        </div>

        {/* Books List */}
        <div className="books-list">
          {borrowedBooksData
            .filter(book => filterStatus === "all" || book.status === filterStatus)
            .map((book) => {
              const statusBadge = getStatusBadge(book.status);
              const isOverdue = book.status === "overdue";

              return (
                <div
                  key={book.id}
                  className={`book-item ${isOverdue ? "book-item-overdue" : ""}`}
                >
                  <div className="book-cover-container">
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      className="book-cover"
                    />
                  </div>
                  <div className="book-info">
                    <div className="book-header">
                      <div>
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-meta">
                          {book.author} • {book.category}
                        </p>
                      </div>
                      <span className={`status-badge ${statusBadge.className}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="book-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Borrowed</span>
                        <span className="detail-value">{book.borrowedDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Due Date</span>
                        <span className={`detail-value ${isOverdue ? "text-danger" : ""}`}>
                          {book.dueDate}
                        </span>
                      </div>
                      {book.renewals && (
                        <div className="detail-item">
                          <span className="detail-label">Renewals</span>
                          <span className="detail-value">{book.renewals} Left</span>
                        </div>
                      )}
                    </div>

                    <div className="book-actions">
                      {isOverdue ? (
                        <>
                          <button className="btn-secondary">Return Book</button>
                          <button className="btn-danger">Pay Fine</button>
                        </>
                      ) : (
                        <>
                          <button className="btn-primary">Renew Loan</button>
                          <button className="btn-outline">Return Book</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BorrowUser;
