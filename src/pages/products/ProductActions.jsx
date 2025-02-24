import React from "react";
import { Plus } from "lucide-react";
import "./ProductActions.css"; // Import the CSS file
const ProductActions = ({ setSelectedProduct, setShowProductModal }) => (
  <div className="product-actions">
    <button
      onClick={() => {
        setSelectedProduct(null);
        setShowProductModal(true);
      }}
      className="product-actions-button"
    >
      <Plus size={20} />
      Add Product
    </button>
  </div>
);

export default ProductActions;

