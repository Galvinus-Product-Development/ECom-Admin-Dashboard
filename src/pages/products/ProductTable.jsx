import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../../services/api";
import "./ProductTable.css";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts();
      console.log("Fetched Products:", response);
      // Axios wraps the actual response data inside `response.data`
      const { success, data } = response.data;
      if (success && Array.isArray(data)) {
        setProducts(data); // ✅ Correctly setting products
      } else {
        console.error("Expected data to be an array, received:", typeof data);
        setError("Invalid data format received from the server.");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };



  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-table">
    <table>
      <thead>
        <tr>
        <th>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Status</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {products.length > 0 ? (
        products.map((product) => (
          <tr key={product.product_id}>
            <td>
            {product.ProductItems?.[0]?.ProductImages?.[0]?.image_url ? (
                <img 
                  src={product.ProductItems[0].ProductImages[0].image_url} 
                  alt={product.product_name} 
                  className="product-image-thumbnail" 
                />
                ) : (
                  <span>No Image</span>
                )}
              </td>
            <td>{product.product_name}</td>
            <td>{product.ProductCategory?.category_name || "N/A"}</td>
            <td>{product.Brand?.brand_name || "N/A"}</td>
            <td>${product.ProductItems[0]?.sale_price || "N/A"}</td>
            <td>{product.status}</td>
            <td>{product.ProductItems.reduce((total, item) => total + item.qty_in_stocks, 0)}</td>
            <td className="product-actions">
            <button className="view-btn" onClick={() => navigate(`/products/${product.product_id}`)}>View Details</button>
            <button className="edit-btn" onClick={() => navigate(`/products/edit/${product.product_id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product.product_id)}>Delete</button>
              
            </td>
          </tr>
        ))
      ):(<tr>
        <td colSpan="8">No products available.</td>
      </tr>
    )}
      </tbody>
    </table>
    </div>
  );
  
};

export default ProductTable;
