import { ArrowLeft, DollarSign, Edit3, Info, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';

// Same mock data as in EditProduct component
const mockProducts = {
  'prod-001': {
    id: 'prod-001',
    name: 'Premium Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with 30-hour battery life',
    category: 'electronics',
    brand: 'SoundMaster',
    type: 'Goods',
    price: 299.99,
    salePrice: 249.99,
    isPublished: true,
    sku: 'SM-WH-2023',
    barcode: '123456789012',
    stockStatus: 'In Stock',
    trackInventory: true,
    quantity: 50,
    continueSellingWhenOutOfStock: false,
    minStockLimit: 10,
    belowLimit: 5,
    isPhysicalProduct: true,
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 15,
      height: 8
    },
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        name: 'headphones-front.jpg'
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        name: 'headphones-side.jpg'
      }
    ],
    variants: [
      {
        id: 'var-1',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        variantValue: 'Black',
        salePrice: 249.99,
        stock: 30,
        isPublished: true
      },
      {
        id: 'var-2',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop',
        variantValue: 'Silver',
        salePrice: 259.99,
        stock: 20,
        isPublished: true
      }
    ]
  },
  'prod-002': {
    id: 'prod-002',
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton unisex t-shirt',
    category: 'clothing',
    brand: 'EcoWear',
    type: 'Goods',
    price: 29.99,
    salePrice: 24.99,
    isPublished: true,
    sku: 'EW-TS-1001',
    barcode: '987654321098',
    stockStatus: 'In Stock',
    trackInventory: true,
    quantity: 100,
    continueSellingWhenOutOfStock: true,
    minStockLimit: 20,
    belowLimit: 5,
    isPhysicalProduct: true,
    weight: 0.2,
    dimensions: {
      length: 30,
      width: 20,
      height: 2
    },
    images: [
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        name: 'tshirt-front.jpg'
      }
    ],
    variants: [
      {
        id: 'var-3',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        variantValue: 'White, S',
        salePrice: 24.99,
        stock: 25,
        isPublished: true
      },
      {
        id: 'var-4',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        variantValue: 'White, M',
        salePrice: 24.99,
        stock: 30,
        isPublished: true
      }
    ]
  },
  'prod-003': {
    id: 'prod-003',
    name: 'Smart Fitness Watch',
    description: 'Water-resistant fitness tracker with heart rate monitor',
    category: 'electronics',
    brand: 'FitTech',
    type: 'Goods',
    price: 249.99,
    salePrice: 199.99,
    isPublished: false,
    sku: 'FT-SW-2023',
    barcode: '456789123456',
    stockStatus: 'Low Stock',
    trackInventory: true,
    quantity: 25,
    continueSellingWhenOutOfStock: false,
    minStockLimit: 15,
    belowLimit: 5,
    isPhysicalProduct: true,
    weight: 0.15,
    dimensions: {
      length: 10,
      width: 8,
      height: 2
    },
    images: [
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        name: 'watch-front.jpg'
      }
    ],
    variants: []
  },
  'prod-004': {
    id: 'prod-004',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with alignment lines',
    category: 'sports',
    brand: 'ZenFit',
    type: 'Goods',
    price: 59.99,
    salePrice: 49.99,
    isPublished: true,
    sku: 'ZF-YM-2023',
    barcode: '789123456789',
    stockStatus: 'In Stock',
    trackInventory: true,
    quantity: 75,
    continueSellingWhenOutOfStock: true,
    minStockLimit: 25,
    belowLimit: 10,
    isPhysicalProduct: true,
    weight: 1.2,
    dimensions: {
      length: 180,
      width: 60,
      height: 0.5
    },
    images: [
      {
        id: 'img-5',
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        name: 'yoga-mat.jpg'
      }
    ],
    variants: []
  }
};

export default function ProductDetailView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const productData = mockProducts[productId];
        if (productData) {
          setProduct(productData);
        }
        setLoading(false);
      }, 500);
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleEdit = () => {
    navigate(`/products/edit/${productId}`);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={handleBack} className="btn btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discount = product.price > product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-detail-container">
      {/* Header */}
      <div className="detail-header">
        <div className="header-left">
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <h1 className="product-title">{product.name}</h1>
        </div>
        <div className="header-actions">
          <button onClick={handleEdit} className="btn btn-primary">
            <Edit3 size={16} />
            Edit Product
          </button>
        </div>
      </div>

      <div className="product-detail-content">
        {/* Left Side - Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage]?.url || 'https://via.placeholder.com/400x400'}
              alt={product.name}
              className="product-main-image"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}

          
        </div>
        

        {/* Right Side - Product Info */}
        <div className="product-info">
          {/* Basic Info */}
          <div className="info-section">
            <div className="info-header">
              <Info size={20} />
              <h2>Basic Information</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Brand</label>
                <span>{product.brand}</span>
              </div>
              <div className="info-item">
                <label>Category</label>
                <span className="category-tag">{product.category}</span>
              </div>
              <div className="info-item">
                <label>Type</label>
                <span>{product.type}</span>
              </div>
              <div className="info-item">
                <label>Status</label>
                <span className={`status ${product.isPublished ? 'published' : 'draft'}`}>
                  {product.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="description">
              <label>Description</label>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="info-section">
            <div className="info-header">
              <DollarSign size={20} />
              <h2>Pricing</h2>
            </div>
            <div className="pricing-info">
              <div className="price-row">
                <span className="price-label">Original Price:</span>
                <span className={`price ${discount > 0 ? 'crossed' : ''}`}>
                  ${product.price}
                </span>
              </div>
              <div className="price-row">
                <span className="price-label">Sale Price:</span>
                <span className="price sale-price">${product.salePrice}</span>
              </div>
              {discount > 0 && (
                <div className="discount-badge">
                  {discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Inventory */}
          <div className="info-section">
            <div className="info-header">
              <Package size={20} />
              <h2>Inventory</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>SKU</label>
                <span>{product.sku}</span>
              </div>
              <div className="info-item">
                <label>Barcode</label>
                <span>{product.barcode}</span>
              </div>
              <div className="info-item">
                <label>Stock Status</label>
                <span className={`stock-status ${product.stockStatus.toLowerCase().replace(' ', '-')}`}>
                  {product.stockStatus}
                </span>
              </div>
              <div className="info-item">
                <label>Quantity</label>
                <span>{product.quantity} units</span>
              </div>
              <div className="info-item">
                <label>Min Stock Limit</label>
                <span>{product.minStockLimit} units</span>
              </div>
              <div className="info-item">
                <label>Track Inventory</label>
                <span>{product.trackInventory ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          {product.isPhysicalProduct && (
            <div className="info-section">
              <div className="info-header">
                <Truck size={20} />
                <h2>Shipping</h2>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>Weight</label>
                  <span>{product.weight} kg</span>
                </div>
                <div className="info-item">
                  <label>Dimensions</label>
                  <span>
                    {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Variants */}
          {/* {product.variants && product.variants.length > 0 && (
            <div className="info-section">
              <div className="info-header">
                <Package size={20} />
                <h2>Product Variants ({product.variants.length})</h2>
              </div>
              <div className="variants-grid">
                {product.variants.map(variant => (
                  <div key={variant.id} className="variant-card">
                    <img 
                      src={variant.image} 
                      alt={variant.variantValue}
                      className="variant-image"
                    />
                    <div className="variant-info">
                      <span className="variant-name">{variant.variantValue}</span>
                      <span className="variant-price">${variant.salePrice}</span>
                      <span className="variant-stock">Stock: {variant.stock}</span>
                      <span className={`variant-status ${variant.isPublished ? 'published' : 'draft'}`}>
                        {variant.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
        <div>
          
        </div>
      </div>
      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
            <div className="info-variant-section">
              <div className="info-header">
                <Package size={20} />
                <h2>Product Variants ({product.variants.length})</h2>
              </div>
              <div className="variants-grid">
                {product.variants.map(variant => (
                  <div key={variant.id} className="variant-card">
                    <img 
                      src={variant.image} 
                      alt={variant.variantValue}
                      className="variant-image"
                    />
                    <div className="variant-info">
                      <span className="variant-name">{variant.variantValue}</span>
                      <span className="variant-price">${variant.salePrice}</span>
                      <span className="variant-stock">Stock: {variant.stock}</span>
                      <span className={`variant-status ${variant.isPublished ? 'published' : 'draft'}`}>
                        {variant.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
    </div>
  );
}
/* import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductDetails();
  }, [productId]);


  
  const loadProductDetails = async () => {
    try {
      // Fetch product data
      const response = await fetchProductById(productId);
      const { data } = response;
      setProduct(data?.data?.product || {});
      setProductItems(data?.data?.productItems || []);
      
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product || Object.keys(product).length === 0) return <p>Product not found or failed to load.</p>;

  return (
    <div className="product-details-container">
        < div className="product-details-box">
        <h1>PRODUCT DETAILS: </h1>
      <h2>{product?.product_name || "Product Name Not Available"}</h2>
      <p><strong>Description:</strong> {product?.product_description || "No Description Available"}</p>
      <p><strong>Category:</strong> {product?.ProductCategory?.category_name || "N/A"}</p>
      <p><strong>Brand:</strong> {product?.Brand?.brand_name || "N/A"}</p>
      <p><strong>Status:</strong> {product?.status || "N/A"}</p>

      <h3>Product Variants</h3>
      
        <table className="product-variants-table">
          <thead>
            <tr>
            <th>Sr. No.</th>
            <th>Variant ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Original Price</th>
              <th>Discount (%)</th>
              <th>Sale Price</th>
              <th>Stock</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {productItems?.map((item, index) => (
              <tr key={item.product_item_id}>
                 <td>{index + 1}</td>
                <td>{item.product_item_id}</td>
                <td>{item.Colour?.colour_name || "N/A"}</td>
                <td>{item.SizeOption?.size_name || "N/A"}</td>
                <td>${item.original_price}</td>
                <td>{item.discount_applicable}%</td>
                <td>${item.sale_price}</td>
                <td>{item.qty_in_stocks}</td>
                <td>
                {item.ProductImages?.length > 0 ? (
                  <div className="images-container">
                    {item.ProductImages.map((image) => (
                      <img
                        key={image.image_id}
                        src={image.image_url}
                        alt={`Product Variant ${item.product_item_id}`}
                        className="variant-image-thumbnail"
                      />
                    ))}
                  </div>
                ) : (
                  <span>No Images</span>
                )}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="submit-product-button" onClick={() => navigate('/products')}>To Product Page</button>
    </div>
    </div>
  );
};

export default ProductDetails;
 */