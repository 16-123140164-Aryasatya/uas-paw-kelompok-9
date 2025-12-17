import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    const res = await login({ email, name, role: selectedRole });
    setBusy(false);

    if (!res.ok) {
      alert(res.message || "Login gagal");
      return;
    }

    // Redirect berdasarkan role
    if (selectedRole === 'librarian') {
      nav("/");
    } else {
      nav("/user/dashboard");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">📚</div>
          <h1 className="login-title">Sistem Perpustakaan</h1>
          <p className="login-subtitle">Pilih peran Anda untuk testing fitur</p>
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          {/* Role Selector */}
          <div className="role-selector">
            <label className="role-label">Pilih Peran:</label>
            <div className="role-buttons">
              <button
                type="button"
                className={`role-btn ${selectedRole === 'user' ? 'active' : ''}`}
                onClick={() => setSelectedRole('user')}
              >
                <div className="role-icon">👤</div>
                <div className="role-info">
                  <div className="role-name">Member / User</div>
                  <div className="role-desc">Pinjam buku, lihat katalog</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`role-btn ${selectedRole === 'librarian' ? 'active' : ''}`}
                onClick={() => setSelectedRole('librarian')}
              >
                <div className="role-icon">👨‍💼</div>
                <div className="role-info">
                  <div className="role-name">Staf Perpustakaan</div>
                  <div className="role-desc">Kelola buku, transaksi, member</div>
                </div>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="info-box">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <strong>Mode Testing:</strong> Pilih peran untuk melihat fitur yang berbeda.
              {selectedRole === 'user' ? (
                <div className="features-list">
                  <div>✓ Dashboard Member</div>
                  <div>✓ Katalog Buku</div>
                  <div>✓ Pinjam Buku</div>
                  <div>✓ Riwayat Peminjaman</div>
                </div>
              ) : (
                <div className="features-list">
                  <div>✓ Dashboard Staf</div>
                  <div>✓ Kelola Inventori</div>
                  <div>✓ Permintaan Peminjaman</div>
                  <div>✓ Transaksi & Member</div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="name">Nama (opsional)</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={selectedRole === 'user' ? 'Member Perpustakaan' : 'Staf Perpustakaan'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (opsional)</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`${selectedRole}@library.com`}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={busy}>
            {busy ? '⏳ Masuk...' : `🚀 Masuk sebagai ${selectedRole === 'user' ? 'Member' : 'Staf'}`}
          </button>
        </form>

        <div className="login-footer">
          <p>💡 <strong>Testing Tips:</strong> Ganti peran untuk melihat perbedaan fitur!</p>
        </div>
      </div>
    </div>
  );
}
