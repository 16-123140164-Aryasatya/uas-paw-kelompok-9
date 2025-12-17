import React from "react";
import "./user_profile.css";

const navLinks = [
  { label: "Dashboard", active: false },
  { label: "Search Catalog", active: false },
  { label: "Borrowed Books", active: false },
  { label: "History", active: false },
  { label: "Events", active: false },
  { label: "My Account", active: true },
  { label: "Wishlist", active: false },
];

const stats = [
  { label: "Books Borrowed", value: "3", accent: "blue" },
  { label: "Reservations", value: "1", accent: "purple" },
  { label: "Outstanding Fines", value: "$0.00", accent: "green" },
];

const personalInfo = [
  { label: "Full Name", value: "Jane Doe" },
  { label: "Email Address", value: "jane.doe@example.com" },
  { label: "Phone Number", value: "+1 (555) 123-4567" },
  { label: "Date of Birth", value: "January 15, 1990" },
  {
    label: "Residential Address",
    value: "123 Library Lane, Apt 4B, Booktown, BK 10293",
    wide: true,
  },
];

const securityMeta = [
  { label: "Last Login", value: "Oct 24, 2023 · 10:42 AM" },
  { label: "2FA Status", value: "Enabled" },
];

const UserProfile = () => {
  return (
    <>
      <div className="user-profile__breadcrumbs">
        <span>Home</span>
        <span className="divider">/</span>
        <span>My Account</span>
      </div>

      <section className="card card--profile">
        <div className="avatar avatar--xl">JD</div>
        <div className="card__profile-body">
          <div className="card__profile-heading">
            <div>
              <h2>Jane Doe</h2>
              <p className="muted">Member ID: LIB-2023-849</p>
            </div>
            <div className="card__actions">
              <button type="button" className="btn btn--neutral">
                Edit Profile
              </button>
              <button type="button" className="btn btn--primary">
                Change Password
              </button>
            </div>
          </div>
          <p className="muted">
            Avid reader and frequent visitor of the City Library. Interested
            in Science Fiction, History, and Biographies. Member since
            January 2021.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className={`stat-card stat-${item.accent}`}>
            <p className="stat-label">{item.label}</p>
            <p className="stat-value">{item.value}</p>
          </div>
        ))}
      </section>

      <div className="layout-grid">
        <section className="card card--panel">
          <div className="card__section-head">
            <h3>Personal Information</h3>
            <span className="chip">Read Only</span>
          </div>
          <div className="info-grid">
            {personalInfo.map((field) => (
              <div
                key={field.label}
                className={`info-field${field.wide ? " info-field--wide" : ""}`}
              >
                <p className="info-label">{field.label}</p>
                <p className="info-value">{field.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card card--panel card--preference">
          <div>
            <h4>Email Notifications</h4>
            <p className="muted">
              Receive updates about due dates and reservations.
            </p>
          </div>
          <label className="toggle" aria-label="Toggle email notifications">
            <input type="checkbox" defaultChecked />
            <span className="toggle__pill" aria-hidden />
          </label>
        </section>
      </div>

      <div className="layout-grid layout-grid--side">
        <section className="card card--membership">
          <div className="card__section-head">
            <div>
              <p className="muted small">City Library</p>
              <h3>Standard Member</h3>
            </div>
            <span className="muted">Wi-Fi</span>
          </div>
          <p className="membership-code">LIB 2023 849</p>
          <p className="muted small">Valid until: Dec 2025</p>
        </section>

        <section className="card card--panel card--security">
          <h3>Security</h3>
          <div className="meta-list">
            {securityMeta.map((item) => (
              <div key={item.label} className="meta-row">
                <span className="muted">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn--ghost btn--full">
            Manage Devices
          </button>
        </section>

        <section className="card card--danger">
          <h3>Danger Zone</h3>
          <p className="muted">
            Logging out will end your current session.
          </p>
          <button type="button" className="btn btn--danger btn--full">
            Sign Out
          </button>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
