import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContexts";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/users/UserManagement";
import ProductManagement from "./pages/products/ProductManagement";
import OrderManagement from "./pages/orders/OrderManagement";
import InventoryManagement from "./pages/inventory/InventoryManagement";
import PaymentManagement from "./pages/Payment/PaymentManagement";
import AnalyticsManagement from "./pages/Analytics/AnalyticsManagement";
import RolesManagement from "./pages/roles/RolesManagement";
import NotificationManagement from "./pages/notifications/NotificationManagement";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                // <PrivateRoute>
                  <Layout />
                // </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/Analytics" element={<AnalyticsManagement />} />
              <Route path="/roles" element={<RolesManagement />} />
              <Route
                path="/notifications"
                element={<NotificationManagement />}
              />
              {/* Add other routes here */}
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
