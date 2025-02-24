import React from "react";
import { Box, BarChart2 } from "lucide-react";
import "./ProductViewToggle.css"; // Import the CSS file
const ProductViewToggle = ({ view, setView }) => (
  <div className="product-view-toggle">
    <button
      onClick={() => setView("grid")}
      className={`product-view-toggle-button ${
        view === "grid" ? "product-view-toggle-button-active" : ""
      }`}
    >
      <Box size={20} />
    </button>
    <button
      onClick={() => setView("list")}
      className={`product-view-toggle-button ${
        view === "list" ? "product-view-toggle-button-active" : ""
      }`}
    >
      <BarChart2 size={20} />
    </button>
  </div>
);

export default ProductViewToggle;
