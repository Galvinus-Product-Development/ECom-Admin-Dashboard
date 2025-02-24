import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css"; // Import the CSS file

const ProductList = ({ filteredProducts,paginatedProducts, setSelectedProduct, setShowProductModal ,handleDeleteProduct}) => (
  <div className="product-list">
    {paginatedProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        setSelectedProduct={setSelectedProduct}
        setShowProductModal={setShowProductModal}
        handleDeleteProduct={handleDeleteProduct}
      />
    ))}
  </div>
);

export default ProductList;
