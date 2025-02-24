import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  Box,
  CreditCard,
  BarChart2,
  Shield,
  Bell,
  Home,
} from "lucide-react";
import "./Sidebar.css";
import gal_logo from "../../../assets/gal_logo.png";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "User Management", path: "/users" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Box, label: "Inventory", path: "/inventory" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Shield, label: "Roles & Access", path: "/roles" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="container">

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-item ${isActive ? "active" : ""}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
