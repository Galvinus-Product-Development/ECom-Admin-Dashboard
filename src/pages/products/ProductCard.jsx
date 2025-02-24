import React from "react";
import { Edit, Trash2 } from "lucide-react";
import "./ProductCard.css"; // Import the CSS file

const getStockStatus = (stock) => {
  if (stock <= 0) return { className: "out-of-stock", label: "Out of Stock" };
  if (stock < 10) return { className: "low-stock", label: "Low Stock" };
  return { className: "in-stock", label: "In Stock" };
};

const ProductCard = ({ product, setSelectedProduct, setShowProductModal ,handleDeleteProduct}) => (
  <div className="product-card">
    <div className="product-card-image-container">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="product-card-content">
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-description">{product.description}</p>
      <div className="product-card-footer">
        <span className="product-card-price">${product.price}</span>
        <span
          className={`product-card-stock ${
            getStockStatus(product.stock).className
          }`}
        >
          {getStockStatus(product.stock).label}
        </span>
      </div>
      <div className="product-card-tags">
        {product.tags.map((tag, index) => (
          <span key={index} className="product-card-tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="product-card-actions">
        <button
          onClick={() => {
            setSelectedProduct(product);
            setShowProductModal(true);
          }}
          className="product-card-button edit"
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          onClick={() => handleDeleteProduct(product.id)}
          className="product-card-button delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
