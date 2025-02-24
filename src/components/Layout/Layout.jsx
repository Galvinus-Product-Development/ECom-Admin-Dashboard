import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import './layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="main-header">
          <Header />
        </div>
        <main className="main-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
