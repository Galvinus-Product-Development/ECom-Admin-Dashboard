import React from "react";
import { Bell, Settings, User, LogOut } from "lucide-react";

import gal_logo from "../../../assets/gal_logo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContexts";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src={gal_logo} className="navbar-logo" />
          <span className="navbar-title">Galvinus Admin Dashboard</span>
        </div>
        {/* <div className="search-container">
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
        </div> */}

        <div className="icons-container">
          <div className="search-container">
            <input
              type="text"
              name="search"
              placeholder="Search....."
              className="navbar-search-input"
            />
          </div>
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button">
            <Settings size={20} />
          </button>
          <div className="user-container">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <span className="user-name">Admin</span>
          </div>
          <button onClick={handleLogout} className="icon-button" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
