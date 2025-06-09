// import {
//   BarChart2,
//   Bell,
//   Box,
//   CreditCard,
//   FolderOpen,
//   Home,
//   Package,
//   Palette,
//   Ruler,
//   Shield,
//   ShoppingCart,
//   Tag,
//   Users,
// } from "lucide-react";
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Sidebar.css";

// const menuItems = [
//   { icon: Home, label: "Dashboard", path: "/" },
//   { icon: Users, label: "User Management", path: "/users" },
//   { icon: Package, label: "Products", path: "/products" },
//   { icon: FolderOpen, label: "Product Category", path: "/product-categories" },
//   { icon: Tag, label: "Brands", path: "/brands" },
//   { icon: Tag, label: "Attributes", path: "/attributes" },
//   { icon: Palette, label: "Colours", path: "/colours" },
//   { icon: Ruler, label: "Size", path: "/sizes" },
//   { icon: ShoppingCart, label: "Orders", path: "/orders" },
//   { icon: Box, label: "Inventory", path: "/inventory" },
//   { icon: CreditCard, label: "Payments", path: "/payments" },
//   { icon: CreditCard, label: "Payment Settings", path: "/payment-setting" },
//   { icon: BarChart2, label: "Analytics", path: "/analytics" },
//   { icon: Shield, label: "Roles & Access", path: "/roles" },
//   { icon: Bell, label: "Notifications", path: "/notifications" },
// ];

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <aside className="sidebar">
//       <div className="container">
//         <nav>
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`menu-item ${isActive ? "active" : ""}`}
//               >
//                 <Icon size={20} />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import {
  BarChart2,
  Bell,
  Box,
  CreditCard,
  FolderOpen,
  Home,
  Package,
  Palette,
  Ruler,
  Shield,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "User Management", path: "/users" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: FolderOpen, label: "Product Category", path: "/product-categories" },
  { icon: Tag, label: "Brands", path: "/brands" },
  { icon: Tag, label: "Attributes", path: "/attributes" },
  // { icon: Palette, label: "Colours", path: "/colours" },
  // { icon: Ruler, label: "Size", path: "/sizes" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Box, label: "Inventory", path: "/inventory" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: CreditCard, label: "Payment Settings", path: "/payment-setting" },
  {
    icon: CreditCard,
    label: "Coupons & Discounts",
    path: "/coupons&discounts",
  },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: BarChart2, label: "Customer Support", path: "/customerSupport" },
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
