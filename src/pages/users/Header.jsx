import React from 'react';
import './Header.css'; // Import the CSS file

export const Header = () => (
  <div className="header-container"> {/* Apply class for styling */}
    <h1 className="header-title">User Management</h1> {/* Apply title class */}
    <p className="header-subtitle">Manage users, roles, and permissions</p> {/* Apply subtitle class */}
  </div>
);
