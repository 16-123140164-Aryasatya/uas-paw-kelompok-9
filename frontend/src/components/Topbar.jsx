import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Topbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const { user, logout, role } = useAuth();

  const title =
    loc.pathname === "/" ? "Dashboard" :
    loc.pathname === "/inventory" ? "Inventory" :
    loc.pathname === "/requests" ? "Borrow Requests" :
    loc.pathname === "/transactions" ? "Transactions" :
    loc.pathname === "/members" ? "Members" :
    loc.pathname === "/manage-books" ? "Manage Books" :
    loc.pathname.startsWith("/user") ? "Member Portal" : "Dashboard";

  const handleLogout = () => {
    if (window.confirm("Anda yakin ingin logout?")) {
      logout();
      nav("/login");
    }
  };

  const getRoleBadge = () => {
    if (!user) return null;
    
    const roleInfo = {
      member: { label: "Member", color: "#10b981", bg: "#ecfdf5" },
      librarian: { label: "Admin", color: "#137fec", bg: "#e8f0ff" }
    };

    const info = roleInfo[role] || roleInfo.member;
    return (
      <span className="role-badge" style={{ background: info.bg, color: info.color }}>
        {info.label}
      </span>
    );
  };

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        <div className="topTitle" style={{ margin: 0 }}>{title}</div>
      </div>

      <div className="topIcons">
        {user && (
          <>
            {getRoleBadge()}
            <div className="user-info">
              <span className="user-name">{user.name}</span>
            </div>
            <button 
              className="logout-btn" 
              title="Logout" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
