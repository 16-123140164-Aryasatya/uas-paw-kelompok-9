import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ProtectedRoute from "../auth/ProtectedRoute";

import Dashboard from "../pages/librarian/Dashboard";
import Inventory from "../pages/librarian/Inventory";
import BorrowRequests from "../pages/librarian/BorrowRequests";
import Transactions from "../pages/librarian/Transactions";
import Members from "../pages/librarian/Members";
import UserProfile from "../../ui_user/user_profile";
import UserDashboard from "../../ui_user/user_dashboard";
import HistoryBorrow from "../../ui_user/history_borrow";
import Catalog from "../../ui_user/catalog";
import BorrowUser from "../../ui_user/borrow_user";
import BookDetail from "../../ui_user/book_detail";

export default function AppLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <div className="appMain">
        <Topbar />
        <main className="page">
          <Routes>
            {/* Librarian Routes - hanya untuk role 'librarian' */}
            <Route path="/" element={
              <ProtectedRoute requiredRole="librarian">
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute requiredRole="librarian">
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/requests" element={
              <ProtectedRoute requiredRole="librarian">
                <BorrowRequests />
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute requiredRole="librarian">
                <Transactions />
              </ProtectedRoute>
            } />
            <Route path="/members" element={
              <ProtectedRoute requiredRole="librarian">
                <Members />
              </ProtectedRoute>
            } />

            {/* User Routes - hanya untuk role 'member' */}
            <Route path="/user/profile" element={
              <ProtectedRoute requiredRole="member">
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/user/dashboard" element={
              <ProtectedRoute requiredRole="member">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user/history" element={
              <ProtectedRoute requiredRole="member">
                <HistoryBorrow />
              </ProtectedRoute>
            } />
            <Route path="/user/catalog" element={
              <ProtectedRoute requiredRole="member">
                <Catalog />
              </ProtectedRoute>
            } />
            <Route path="/user/borrow" element={
              <ProtectedRoute requiredRole="member">
                <BorrowUser />
              </ProtectedRoute>
            } />
            <Route path="/user/book/:id" element={
              <ProtectedRoute requiredRole="member">
                <BookDetail />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
