import { Eye, Pencil, Trash2 } from "lucide-react"; // Icon for view, edit, delete
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProductTable.css";

// Mock product data that aligns with EditProduct component
const mockProducts = [
  {
    product_id: 'prod-001',
    product_name: 'Premium Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with 30-hour battery life',
    status: 'Published',
    ProductCategory: {
      category_name: 'Electronics'
    },
    Brand: {
      brand_name: 'SoundMaster'
    },
    ProductItems: [
      {
        sale_price: 249.99,
        qty_in_stocks: 50,
        ProductImages: [
          {
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
          }
        ]
      }
    ]
  },
  {
    product_id: 'prod-002',
    product_name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton unisex t-shirt',
    status: 'Published',
    ProductCategory: {
      category_name: 'Clothing'
    },
    Brand: {
      brand_name: 'EcoWear'
    },
    ProductItems: [
      {
        sale_price: 24.99,
        qty_in_stocks: 100,
        ProductImages: [
          {
            image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
          }
        ]
      }
    ]
  },
  {
    product_id: 'prod-003',
    product_name: 'Smart Fitness Watch',
    description: 'Water-resistant fitness tracker with heart rate monitor',
    status: 'Draft',
    ProductCategory: {
      category_name: 'Electronics'
    },
    Brand: {
      brand_name: 'FitTech'
    },
    ProductItems: [
      {
        sale_price: 199.99,
        qty_in_stocks: 25,
        ProductImages: [
          {
            image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
          }
        ]
      }
    ]
  },
  {
    product_id: 'prod-004',
    product_name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with alignment lines',
    status: 'Published',
    ProductCategory: {
      category_name: 'Sports'
    },
    Brand: {
      brand_name: 'ZenFit'
    },
    ProductItems: [
      {
        sale_price: 49.99,
        qty_in_stocks: 75,
        ProductImages: [
          {
            image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop'
          }
        ]
      }
    ]
  }
];

const ProductTable = ({ searchTerm = "" }) => {
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter products based on search term
      const filteredProducts = mockProducts.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ProductCategory?.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Brand?.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Reload products when search term changes
  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Remove product from local state
        setProducts(prev => prev.filter(product => product.product_id !== productId));
        
        console.log(`Product ${productId} deleted successfully (mock)`);
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  const handleView = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

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
                    <div className="no-image">No Image</div>
                  )}
                </td>
                <td className="product-name">{product.product_name}</td>
                <td>{product.ProductCategory?.category_name || "N/A"}</td>
                <td>{product.Brand?.brand_name || "N/A"}</td>
                <td className="price">${product.ProductItems[0]?.sale_price || "N/A"}</td>
                <td>
                  <span className={`status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td className="stock">
                  {product.ProductItems.reduce((total, item) => total + item.qty_in_stocks, 0)}
                </td>
                <td className="product-actions">
                  <button 
                    className="icon-btn view-btn" 
                    onClick={() => handleView(product.product_id)}
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    className="icon-btn edit-btn" 
                    onClick={() => handleEdit(product.product_id)}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    className="icon-btn delete-btn" 
                    onClick={() => handleDelete(product.product_id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-products">
                {searchTerm ? `No products found matching "${searchTerm}"` : "No products available."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
/* import React, { useEffect, useState } from "react";
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
 */