import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";
import ProductTable from "./ProductTable";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="product-management-container">
      <h1>Product Management</h1>
      <input
        type="text"
        className="product-search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="add-product-btn" onClick={() => navigate("/products/new-product")}>Add Product</button>
      <ProductTable searchTerm={searchTerm} />
    </div>
  );
};

export default ProductManagement;
