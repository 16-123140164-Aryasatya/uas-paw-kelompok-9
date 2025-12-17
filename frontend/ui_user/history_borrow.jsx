import React, { useState } from "react";
import "./history_borrow.css";

const historyData = [
  {
    id: 1,
    title: "Dune",
    author: "Frank Herbert",
    borrowDate: "Nov 01, 2023",
    returnDate: "Nov 15, 2023",
    status: "overdue",
    fee: 1.50,
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOFjZzcNXvXLEtnAL_Wi1Fyf2wXiiCM7tLf3mY43DiImBQtNalqEBmfPoaVA5gpKDcbUMUCf29YXZTPDfiSktJ8uGNi5TMFu1y4Yav5LwpMpdluXk9T2fijJutexTbMq1UKDeweg5UWsja2UQG7dc312JlN5Z_-zkAXH5eZetdc6zYSuW5lBRCSVdY0-rovFwOG_UUu_V_VqkZY7CXpxJLPNyF6iJtYX1yDwcD5RswdVTEAJ7MD37OqBQt8ngqY4I-bTmh610OTjTk"
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowDate: "Oct 12, 2023",
    returnDate: "Oct 20, 2023",
    status: "returned",
    fee: 0,
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrcxOyfBF5UUqevrvS_oCHCHqA93U0-NqrQtI8sNPYnE6CsT582sho9PkudBKdMK8igIbIM_0MtYvCtP3Fxr8N0pD6LOxpKjXeVNb_HNtCNIlXIStK8wEGvwSml0Fb_9oF3h9EyxeqAYo7ktQkouFJNLob3hR9R2ey6ZSK6JUCl6CuqoKA0o_zhrqm2esBFx4_4mZ2csu4gUkBBd5ia3GYwzR7tzkp75so2e1VN9deR7mvDpDKFPc7GFOX8eOeujkraILbNVp69UY7"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    borrowDate: "Dec 05, 2023",
    returnDate: "Dec 19, 2023",
    status: "checked-out",
    fee: 0,
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeP_e7g69GkmggjlClrVm1ld9Jeg11mE5JJmZxf3zW47jOcmrU5TDUj_rIWGiu2OK3iS4gZ3PjUdqhQATeLOudFdoEq0geN45ZDPT43fqFDNY710lqKYl__qw4Mj1popOv1-EaGSmajkVu8fwKC8zxUlBbwLm4TTMqFTTHgq5Z3yvqmgx-ACUVXPYjXTa7YmxmXjCwp0324o2k1zntlO9N45stZE1gfCjOOBrm_aGe-IKjqKl2yuHovidyUE2gtfXsCMHIeW7WrJDF"
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    borrowDate: "Sep 15, 2023",
    returnDate: "Sep 25, 2023",
    status: "returned",
    fee: 0,
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtvsJjFOB9lONon05pjDTGiYHLaFZIV-5q8tkZCiJ3_tSlSogS1R8w4gIwML_BQtqQt5n749Rc-eeHbkO40N1SYQM2ZpryuOjDePYtKcej3AbkOXnZTIdB-YjohLdF9rlhhr0NuR1l0v26AOdjiRayFNZHUag1MfTjjlsXZfTVOzUdXDftHIsSMIyRNPWXUMqfi2TsV9XfOb6rIONhYTPtQTCCTHG6i1AgkQiEd-BEyrXRwCYL9tXYyqOrtzTXxpa8OPMZP6pcDBH_"
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    borrowDate: "Aug 01, 2023",
    returnDate: "Aug 20, 2023",
    status: "returned",
    fee: 0.50,
    feePaid: true,
    coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoNKWemtnIuPASOX_Jqu8eppNoiWMuMqdkv-PbgDT05CBg3oIHWtLLQ7xSGtq4a6yBJJC_M_h2KH9k4_NLVFsiC-Ht0bq4gKQBMszP4b1XAVFCTY5lCSoF6WxDCd8PZpn5NNndvDvuS4XYVxHInNyKFU6zXgtm1IDfiynZbulFWw9ZIXYXC-6z19oyqYee43CscupKY5VqqJltLbF0ZZgObw6aCDejYwpWTdSPV83jh6xlYWtqqmQI4ipvcEuOVwU9AdECA4I1dgH2"
  }
];

const HistoryBorrow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status) => {
    const badges = {
      "overdue": { label: "Overdue", className: "status-overdue" },
      "returned": { label: "Returned", className: "status-returned" },
      "checked-out": { label: "Checked Out", className: "status-checked-out" }
    };
    return badges[status] || badges["returned"];
  };

  return (
    <>
      <div className="history-container">
        <div className="history-header">
          <div className="header-content">
            <h1>My Borrowing History</h1>
            <p className="header-subtitle">Manage your reading journey and track past transactions.</p>
          </div>
          <button className="btn-export">
            <span>📥</span>
            <span>Export History</span>
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon stat-icon-primary">📚</span>
              <p className="stat-label">Total Borrowed</p>
            </div>
            <p className="stat-value">42</p>
            <p className="stat-meta">All time history</p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon stat-icon-orange">⏱️</span>
              <p className="stat-label">Checked Out</p>
            </div>
            <p className="stat-value">3</p>
            <p className="stat-meta">1 book due soon</p>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon stat-icon-red">💰</span>
              <p className="stat-label">Unpaid Fees</p>
            </div>
            <p className="stat-value stat-value-red">$1.50</p>
            <p className="stat-meta">Late return on "Dune"</p>
          </div>
        </div>

        <div className="filters-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by Title, Author, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <div className="date-picker">
              <span>📅</span>
              <span>Last 6 Months</span>
              <span>▼</span>
            </div>
            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="checked-out">Checked Out</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th className="col-cover">Cover</th>
                <th className="col-details">Book Details</th>
                <th className="col-date">Borrowed</th>
                <th className="col-date">Return Date</th>
                <th className="col-status">Status</th>
                <th className="col-fee">Fees</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => {
                const badge = getStatusBadge(item.status);
                return (
                  <tr key={item.id}>
                    <td>
                      <div
                        className="book-cover"
                        style={{ backgroundImage: `url(${item.coverUrl})` }}
                      />
                    </td>
                    <td>
                      <div className="book-info">
                        <span className="book-title">{item.title}</span>
                        <span className="book-author">{item.author}</span>
                      </div>
                    </td>
                    <td className="text-date">{item.borrowDate}</td>
                    <td>
                      {item.status === "overdue" ? (
                        <div className="return-date-overdue">
                          <span className="date-text">{item.returnDate}</span>
                          <span className="due-label">DUE</span>
                        </div>
                      ) : item.status === "checked-out" ? (
                        <span className="date-italic">{item.returnDate}</span>
                      ) : (
                        <span className="text-date">{item.returnDate}</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${badge.className}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-fee">
                      {item.fee > 0 ? (
                        <span className={item.feePaid ? "fee-paid" : "fee-unpaid"}>
                          ${item.fee.toFixed(2)}
                        </span>
                      ) : (
                        <span className="fee-none">-</span>
                      )}
                    </td>
                    <td>
                      <button className="btn-more">⋮</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <p className="pagination-info">
            Showing <span className="info-highlight">1</span> to <span className="info-highlight">5</span> of <span className="info-highlight">42</span> results
          </p>
          <div className="pagination-buttons">
            <button className="btn-pagination" disabled>
              <span>‹</span> Previous
            </button>
            <button className="btn-pagination btn-pagination-next">
              Next <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryBorrow;
