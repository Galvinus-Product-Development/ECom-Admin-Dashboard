import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../src/contexts/AuthContexts";
import Layout from "./components/Layout/Layout";
import AnalyticsManagement from "./pages/Analytics/AnalyticsManagement";
import Attributes from "./pages/Attributes/Attributes";
import LoginPage from "./pages/auth/LoginPage";
import BrandManagement from "./pages/brands/BrandManagement";
// import ColourManagement from "./pages/colours/ColourManagement";
import AddCoupon from "./pages/Coupons&Discounts/AddCoupon";
import CouponAndDiscount from "./pages/Coupons&Discounts/CouponAndDiscount";
import CustomerSupport from "./pages/CustomerSupport/CustomerSupport";
import Dashboard from "./pages/Dashboard/Dashboard";
import InventoryManagement from "./pages/inventory/InventoryManagement";
import NotificationManagement from "./pages/notifications/NotificationManagement";
import OrderManagement from "./pages/orders/OrderManagement";
import PaymentManagement from "./pages/Payment/PaymentManagement";
import PaymentSetting from "./pages/Payment_Setting/PaymentSetting";
import NewCategory from "./pages/product-categories/NewCategory";
import ProductCategoryManagement from "./pages/product-categories/ProductCategoryManagement";
import AddVariant from "./pages/products/AddVariant";
import ProductDetails from "./pages/products/ProductDetails";
import ProductForm from "./pages/products/ProductForm";
import ProductManagement from "./pages/products/ProductManagement";
import RolesManagement from "./pages/roles/RolesManagement";
// import SizeManagement from "./pages/sizes/SizeManagement";
import UserManagement from "./pages/users/UserManagement";
import store from "./redux/store";

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
              <Route path="/products/new-product" element={<ProductForm mode="create" />} />
              <Route
                path="/products/add-variant/:productId"
                element={<AddVariant />}
              />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/products/:productId/edit" element={<ProductForm mode="edit" />} />
              <Route
                path="/product-categories"
                element={<ProductCategoryManagement />}
              />
              <Route
                path="/product-categories/new-category"
                element={<NewCategory />}
              />
              <Route path="/brands" element={<BrandManagement />} />
              {/* <Route path="/colours" element={<ColourManagement />} />
              <Route path="/sizes" element={<SizeManagement />} /> */}
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/payment-setting" element={<PaymentSetting />} />
              <Route
                path="/coupons&discounts"
                element={<CouponAndDiscount />}
              />

              <Route path="/customerSupport" element={<CustomerSupport />} />
              <Route path="/add-coupon" element={<AddCoupon />} />
              <Route path="/coupons/edit/:couponId" element={<AddCoupon mode="edit" />} />
              <Route path="/coupons/view/:couponId" element={<AddCoupon mode="view" />} />
              <Route path="/coupons/duplicate/:couponId" element={<AddCoupon mode="duplicate" />} />

              <Route path="/Analytics" element={<AnalyticsManagement />} />
              <Route path="/roles" element={<RolesManagement />} />
              <Route
                path="/notifications"
                element={<NotificationManagement />}
              />
              <Route path="/attributes" element={<Attributes />} />
              {/* Add other routes here */}
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
