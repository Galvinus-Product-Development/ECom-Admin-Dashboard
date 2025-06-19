import { ArrowLeft, DollarSign, Edit3, Info, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/api';
import './ProductDetails.css';

export default function ProductDetailView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const transformProductData = (apiResponse) => {
    const productData = apiResponse.data;
    return {
      id: productData.product_id,
      name: productData.product_name,
      description: productData.description,
      category: productData.ProductCategory?.category_name,
      brand: productData.Brand?.brand_name,
      type: productData.product_type,
      price: parseFloat(productData.original_price),
      salePrice: parseFloat(productData.sale_price),
      isPublished: productData.is_published,
      sku: productData.sku,
      barcode: productData.barcode,
      stockStatus: productData.stock_status,
      quantity: productData.quantity,
      minStockLimit: productData.minimum_stock_limit,
      trackInventory: productData.track_inventory,
      isPhysicalProduct: productData.is_physical_product,
      weight: productData.weight,
      dimensions: {
        length: productData.length,
        width: productData.breadth,
        height: productData.height
      },
      images: productData.images?.map(img => ({
        id: img.image_id,
        url: img.image_url,
        name: img.image_name,
        isPrimary: img.is_primary
      })) || [],
      variants: productData.ProductItems?.map(variant => ({
        id: variant.product_item_id,
        image: variant.variantImages?.[0]?.image_url || '',
        variantValue: `${variant.Colour?.colour_name || ''}${variant.Colour && variant.SizeOption ? ', ' : ''}${variant.SizeOption?.size_name || ''}`,
        salePrice: parseFloat(variant.sale_price),
        stock: variant.qty_in_stocks,
        isPublished: true
      })) || []
    };
  };

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProductById(productId);
        console.log('API Response:', response);
        
        if (!response.success) {
          throw new Error('Failed to fetch product data');
        }
        
        const transformedData = transformProductData(response);
        setProduct(transformedData);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleBack = () => navigate('/products');
  const handleEdit = () => navigate(`/products/${productId}/edit`);

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

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you&apos;re looking for doesn&apos;t exist.'}</p>
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
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="price-row">
                <span className="price-label">Sale Price:</span>
                <span className="price sale-price">${product.salePrice.toFixed(2)}</span>
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
                <span>{product.sku || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Barcode</label>
                <span>{product.barcode || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Stock Status</label>
                <span className={`stock-status ${product.stockStatus.toLowerCase().replace(' ', '-')}`}>
                  {product.stockStatus}
                </span>
              </div>
              <div className="info-item">
                <label>Quantity</label>
                <span>{product.quantity || 0} units</span>
              </div>
              <div className="info-item">
                <label>Min Stock Limit</label>
                <span>{product.minStockLimit || 'N/A'}</span>
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
                  <span>{product.weight || 'N/A'} kg</span>
                </div>
                <div className="info-item">
                  <label>Dimensions</label>
                  <span>
                    {product.dimensions.length || 'N/A'} × {product.dimensions.width || 'N/A'} × {product.dimensions.height || 'N/A'} cm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Variants Section */}
      {product.variants.length > 0 && (
        <div className="info-variant-section">
          <div className="info-header">
            <Package size={20} />
            <h2>Product Variants ({product.variants.length})</h2>
          </div>
          <div className="variants-grid">
            {product.variants.map(variant => (
              <div key={variant.id} className="variant-card">
                <img 
                  src={variant.image || 'https://via.placeholder.com/150'} 
                  alt={variant.variantValue}
                  className="variant-image"
                />
                <div className="variant-info">
                  <span className="variant-name">{variant.variantValue}</span>
                  <span className="variant-price">${variant.salePrice.toFixed(2)}</span>
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