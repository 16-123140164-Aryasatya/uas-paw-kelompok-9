import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { email, password };
      const res = await login(payload);

      if (!res.ok) {
        setError(res.message || "Login gagal. Periksa email dan password Anda.");
        setLoading(false);
        return;
      }

      const role = res.user?.role || "member";
      if (role === "librarian") {
        navigate("/");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Quick demo login without backend: logs in as librarian or member
  const demoLogin = async (asRole) => {
    setError("");
    setLoading(true);
    try {
      const res = await login({ email: `${asRole}@demo.local`, role: asRole });
      if (!res.ok) {
        setError(res.message || "Gagal login demo");
        return;
      }
      if (asRole === "librarian") {
        navigate("/");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Gagal login demo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-header">
          <div className="login-logo">
            <svg className="login-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div className="login-title">Perpustakaan Digital</div>
        </div>

        <div className="login-main-content">
          <div className="login-headings">
            <h1 className="login-h1">Masuk ke akun Anda</h1>
            <p className="login-subtitle">
              Kelola peminjaman buku dan koleksi digital Anda
            </p>
          </div>

          <form onSubmit={submit} className="login-form">
            {error && (
              <div className="login-error">
                <svg className="error-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p className="login-error-text">{error}</p>
              </div>
            )}

            <div className="login-input-section">
              <div className="login-input-group">
                <label htmlFor="email" className="login-input-label">
                  Email
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                    disabled={loading}
                  />
                  <div className="login-input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="login-input-group">
                <label htmlFor="password" className="login-input-label">
                  Password
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-password-toggle"
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="login-remember-section">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  className="login-remember-checkbox"
                  disabled={loading}
                />
                <span className="login-remember-text">Ingat saya</span>
              </label>
            </div>

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.5 }}>atau</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <div className="login-signup-section">
            <span className="login-signup-text">Belum punya akun? </span>
            <Link to="/register" className="login-signup-link">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>

      <div className="login-right">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuByQUUB6wGlhXluObx66gmVOirVDB7Pr7r5dF1vp6_zrETur6nKVvNM6MbWne-p-LQfmPm8kJH75ar2zeAWB_XMbS8jVImFpXx4de9YPjzn53hBKi7aYHBpYKzTndd6JLIkQl88kZCvmo71ROJMHba0116JqU9DLu5dKgdnzmWqLVDu0UR6PELcoof-rJCdQX60gfgD7KciWNm7B7OsEtLxPPkhjnFIAh_G91wXGuGUEYopzukHT3QNWm7TxtlOU7W9c2vrCc7OxR64"
          alt="Library Background"
          className="login-bg-image"
        />
        <div className="login-bg-overlay"></div>
        <div className="login-right-content">
          <div className="login-quote">
            <div className="login-quote-badge">
              <span className="login-quote-badge-text">✨ Inspirasi</span>
            </div>
            <blockquote className="login-quote-text">
              "Setiap buku adalah pintu menuju dunia baru yang menakjubkan"
            </blockquote>
            <div className="login-quote-footer">
              <div className="login-quote-divider"></div>
              <cite className="login-quote-author">- Penggemar Literatur</cite>
            </div>
          </div>
        </div>
        <div className="login-decorative">
          <div className="login-decorative-dot"></div>
          <div className="login-decorative-dot-2"></div>
          <div className="login-decorative-dot-3"></div>
        </div>
      </div>
    </div>
  );
}
