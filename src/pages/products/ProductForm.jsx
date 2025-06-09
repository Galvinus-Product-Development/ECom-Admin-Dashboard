import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import './ProductForm.css';
import ProductVariants from './ProductVariants';

export default function ProductForm() {
    const [showVariants, setShowVariants] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    brand: '',
    productType: 'Goods',
    originalPrice: '',
    salePrice: '',
    isPublished: false,
    sku: '',
    barcode: '',
    stockStatus: '',
    trackInventory: false,
    quantity: '',
    continueSellingOutOfStock: false,
    minimumStockLimit: '',
    belowLimit: '',
    isPhysicalProduct: true,
    weight: '',
    length: '',
    breadth: '',
    height: ''
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSave = () => {
    console.log('Product Data:', formData);
    console.log('Images:', uploadedImages);
      alert('Product saved successfully!');
      setShowVariants(true); 
  };

  const handleCancel = () => {
    setFormData({
      productName: '',
      description: '',
      category: '',
      brand: '',
      productType: 'Goods',
      originalPrice: '',
      salePrice: '',
      isPublished: false,
      sku: '',
      barcode: '',
      stockStatus: '',
      trackInventory: false,
      quantity: '',
      continueSellingOutOfStock: false,
      minimumStockLimit: '',
      belowLimit: '',
      isPhysicalProduct: true,
      weight: '',
      length: '',
      breadth: '',
      height: ''
    });
    setUploadedImages([]);
  };

  return (
    <div className="product-form-container">
      {/* Header */}
      <div className="form-header">
        <h1 className="form-title">New Product</h1>
        <div className="button-group">
          <button 
            onClick={handleSave}
            className="btn btn-save"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="btn btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* General Information Section */}
      <div className="form-section">
        <h2 className="section-title">General Information</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter product name"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="form-textarea"
            placeholder="Enter product description"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter brand name"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Product Type</label>
          <div className="radio-group">
            {['Goods', 'Services', 'Combo'].map(type => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  name="productType"
                  value={type}
                  checked={formData.productType === type}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Original Price</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="form-input"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleInputChange}
              className="form-input"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="form-group">
          <label className="form-label">Images</label>
          <div className="upload-area">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-label">
              <Upload className="upload-icon" />
              <span className="upload-text">Upload your images</span>
            </label>
          </div>
          
          {uploadedImages.length > 0 && (
            <div className="image-preview-grid">
              {uploadedImages.map(image => (
                <div key={image.id} className="image-preview">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="preview-image"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="remove-image-btn"
                  >
                    <X className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
            className="checkbox-input"
          />
          <label className="checkbox-label">Is Published</label>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="form-section">
        <h2 className="section-title">Inventory</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">SKU (Stock Keeping Unit)</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter SKU"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter barcode"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Stock Status</label>
          <input
            type="text"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter stock status"
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="trackInventory"
            checked={formData.trackInventory}
            onChange={handleInputChange}
            className="checkbox-input"
          />
          <label className="checkbox-label">Track Inventory</label>
          
          {formData.trackInventory && (
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="quantity-input"
              placeholder="Qty"
            />
          )}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="continueSellingOutOfStock"
            checked={formData.continueSellingOutOfStock}
            onChange={handleInputChange}
            className="checkbox-input"
          />
          <label className="checkbox-label">Continue selling when out of stock</label>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Minimum stock quantity limit</label>
            <input
              type="number"
              name="minimumStockLimit"
              value={formData.minimumStockLimit}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter minimum limit"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Below</label>
            <input
              type="number"
              name="belowLimit"
              value={formData.belowLimit}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter below limit"
            />
          </div>
        </div>
      </div>

      {/* Shipping Section */}
      <div className="form-section">
        <h2 className="section-title">Shipping</h2>
        
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="isPhysicalProduct"
            checked={formData.isPhysicalProduct}
            onChange={handleInputChange}
            className="checkbox-input"
          />
          <label className="checkbox-label">Physical Product</label>
        </div>

        {formData.isPhysicalProduct && (
          <>
            <div className="form-group full-width">
              <label className="form-label">Weight (in KG)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter weight"
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Dimensions (cm)</label>
              <div className="dimensions-grid">
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Length"
                />
                <input
                  type="number"
                  name="breadth"
                  value={formData.breadth}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Breadth"
                />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Height"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <ProductVariants 
        isOpen={showVariants} 
        onClose={() => setShowVariants(false)}
        productData={formData}
      />
    </div>
  );
}