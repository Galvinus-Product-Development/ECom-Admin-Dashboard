import { ArrowLeft, Upload, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createProductWithImages,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  updateProductWithImages
} from '../../services/api';
import ProductVariants from './AddVariant';
import './ProductForm.css';

export default function ProductForm({ mode = "create" }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(mode === "edit");
  const [variantCount, setVariantCount] = useState(0);
  const [showVariants, setShowVariants] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    product_category_id: '',
    brand_id: '',
    product_type: 'Goods',
    original_price: '',
    sale_price: '',
    is_published: false,
    sku: '',
    barcode: '',
    stock_status: 'in_stock',
    track_inventory: false,
    quantity: '',
    continue_selling_out_of_stock: false,
    minimum_stock_limit: '',
    weight: '',
    length: '',
    breadth: '',
    height: '',
    is_physical_product: true
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [primaryImageId, setPrimaryImageId] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [brandsRes, categoriesRes] = await Promise.all([
          fetchBrands(),
          fetchCategories(),
        ]);
        
        setBrands(brandsRes.data);
        setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);

        // If in edit mode, load product data
        if (isEditMode && productId) {
          //setIsEditMode(true);
          const productRes = await fetchProductById(productId);
          const productData = productRes.data;
          
          // Initialize form data with proper null checks
        setFormData({
          product_name: productData.product_name || '',
          description: productData.description || '',
          product_category_id: productData.product_category_id || '',
          brand_id: productData.brand_id || '',
          product_type: productData.product_type || 'Goods',
          original_price: productData.original_price || '',
          sale_price: productData.sale_price || '',
          is_published: productData.is_published || false,
          sku: productData.sku || '',
          barcode: productData.barcode || '',
          stock_status: productData.stock_status || 'in_stock',
          track_inventory: productData.track_inventory || false,
          quantity: productData.quantity || '',
          continue_selling_out_of_stock: productData.continue_selling_out_of_stock || false,
          minimum_stock_limit: productData.minimum_stock_limit || '',
          weight: productData.weight || '',
          length: productData.length || '',
          breadth: productData.breadth || '',
          height: productData.height || '',
          is_physical_product: productData.is_physical_product !== false
        });

        setExistingImages(productData.images || []);
        // Set primary image if exists
        const primaryImg = productData.images?.find(img => img.is_primary);
        if (primaryImg) {
          setPrimaryImageId(primaryImg.image_id);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load initial data');
      navigate('/products'); // Redirect if error loading product
    } finally {
      setLoading(false);
    }
  };

  loadInitialData();
}, [productId, navigate, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setFormData(prev => ({
      ...prev,
      product_category_id: newCategoryId
    }));
    
    // This will automatically trigger the variants component to update sizes
  };
  
  // Update your image handling functions
const handleSetPrimaryImage = (id) => {
  setPrimaryImageId(id);
  // If setting an existing image as primary
  const existingImg = existingImages.find(img => img.image_id === id);
  if (existingImg) {
    setFormData(prev => ({
      ...prev,
      primaryImageId: id
    }));
  }
};

const removeImage = (id) => {
  if (primaryImageId === id) {
    toast.error('Cannot remove primary image. Set another image as primary first.');
    return;
  }

  const existingImage = existingImages.find(img => img.image_id === id);
  if (existingImage) {
    setImagesToDelete(prev => [...prev, existingImage.image_id]);
    setExistingImages(prev => prev.filter(img => img.image_id !== id));
  } else {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  }
};

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + uploadedImages.length + existingImages.length > 10) {
      toast.error('You can upload a maximum of 10 images');
      return;
    }

    files.forEach(file => {
      if (!file.type.match('image.*')) {
        toast.error(`${file.name} is not an image file`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => [...prev, {
          id: `new-${Date.now()}-${Math.random()}`,
          url: event.target.result,
          name: file.name,
          file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!formData.product_name) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.product_category_id) {
      toast.error('Category is required');
      return;
    }
    if (existingImages.length + uploadedImages.length === 0) {
      toast.error('At least one product image is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const productPayload = {
        ...formData,
        sale_price: formData.sale_price || formData.original_price,
        primaryImageId: primaryImageId || (existingImages[0]?.image_id || null)
      };

      let response;
      if (isEditMode) {
        response = await updateProductWithImages(
          productId,
          productPayload,
          uploadedImages.map(img => img.file),
          imagesToDelete
        );
        toast.success('Product updated successfully!');
        navigate('/products');
      } else {
        response = await createProductWithImages(
          productPayload,
          uploadedImages.map(img => img.file)
        );
        toast.success('Product created successfully!');
        navigate(`/products/${response.data.data.product_id}/edit`);
        setShowVariants(true);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/products');
    }
  };

  const handleVariantsClose = () => {
    setShowVariants(false);
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="product-form-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>
            {isEditMode 
              ? 'Loading product data...' 
              : 'Preparing new product form...'}
          </p>
        </div>
      </div>
    );
  }

  const allImages = [...existingImages, ...uploadedImages];
  const discount = formData.original_price && formData.sale_price 
    ? Math.round(((formData.original_price - formData.sale_price) / formData.original_price) * 100)
    : 0;

  return (
    <div className="product-form-container">
      {!showVariants && (
        <>
          {/* Header */}
          <div className="form-header">
            <div className="header-left">
              <button onClick={handleCancel} className="back-btn">
                <ArrowLeft size={20} />
              </button>
              <h1 className="form-title">
                {isEditMode ? 'Edit Product' : 'New Product'}
                {isEditMode && variantCount > 0 && (
                <span className="variant-count-badge">
                  {variantCount} variant{variantCount !== 1 ? 's' : ''}
                </span>
              )}
              </h1>
            </div>
            <div className="button-group">
              <button 
                onClick={handleSubmit}
                className="btn btn-save"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Save'}
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
                <label className="form-label">Product Name*</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Category*</label>
                <select
                  name="product_category_id"
                  value={formData.product_category_id || ''}
                  onChange={handleCategoryChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {categories.map(category => (
                    <option 
                      key={category.product_category_id} 
                      value={category.product_category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
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
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select brand</option>
                  {brands.map(brand => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Product Type</label>
                <select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Goods">Goods</option>
                  <option value="Services">Services</option>
                  <option value="Combo">Combo</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Original Price*</label>
                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Sale Price</label>
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {discount > 0 && (
                  <span className="discount-badge">{discount}% OFF</span>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="form-group">
              <label className="form-label">Images* (Max 10)</label>
              <div className="upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-input"
                  id="image-upload"
                  disabled={allImages.length >= 10}
                />
                <label htmlFor="image-upload" className="upload-label">
                  <Upload className="upload-icon" />
                  <span className="upload-text">
                    {allImages.length > 0 
                      ? `Add more images (${allImages.length}/10)`
                      : 'Upload your images'}
                  </span>
                </label>
              </div>
              
              {allImages.map(image => (
                  <div key={image.id || image.image_id} className="image-preview">
                    <img
                      src={image.url || image.image_url}
                      alt={image.name || image.image_name}
                      className="preview-image"
                      onClick={() => handleSetPrimaryImage(image.id || image.image_id)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id || image.image_id);
                      }}
                      className="remove-image-btn"
                      type="button"
                    >
                      <X className="remove-icon" />
                    </button>
                    {(primaryImageId === (image.id || image.image_id) || image.is_primary) && (
                      <span className="primary-badge">Primary</span>
                    )}
                  </div>
                ))}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleInputChange}
                className="checkbox-input"
                id="publish-checkbox"
              />
              <label htmlFor="publish-checkbox" className="checkbox-label">
                Publish this product
              </label>
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

            <div className="form-group">
              <label className="form-label">Stock Status</label>
              <select
                name="stock_status"
                value={formData.stock_status}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="preorder">Preorder</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="track_inventory"
                checked={formData.track_inventory}
                onChange={handleInputChange}
                className="checkbox-input"
                id="track-inventory"
              />
              <label htmlFor="track-inventory" className="checkbox-label">
                Track Inventory
              </label>
              
              {formData.track_inventory && (
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="quantity-input"
                  placeholder="Quantity"
                  min="0"
                />
              )}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="continue_selling_out_of_stock"
                checked={formData.continue_selling_out_of_stock}
                onChange={handleInputChange}
                className="checkbox-input"
                id="continue-selling"
              />
              <label htmlFor="continue-selling" className="checkbox-label">
                Continue selling when out of stock
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Minimum stock quantity limit</label>
              <input
                type="number"
                name="minimum_stock_limit"
                value={formData.minimum_stock_limit}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter minimum limit"
                min="0"
              />
            </div>
          </div>

          {/* Shipping Section */}
          <div className="form-section">
            <h2 className="section-title">Shipping</h2>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="is_physical_product"
                checked={formData.is_physical_product}
                onChange={handleInputChange}
                className="checkbox-input"
                id="physical-product"
              />
              <label htmlFor="physical-product" className="checkbox-label">
                Physical Product
              </label>
            </div>

            {formData.is_physical_product && (
              <>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter weight"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dimensions (cm)</label>
                  <div className="dimensions-grid">
                    <input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Length"
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="breadth"
                      value={formData.breadth}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Breadth"
                      min="0"
                      step="0.01"
                    />
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Height"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {isEditMode && (
            <div className="product-variants-section">
              <h2 className="section-title">Product Variants</h2>
              <ProductVariants 
                productId={productId}
                productCategories={categories}
                selectedCategoryId={formData.product_category_id}
                isOpen={true}
                onVariantUpdate={(count) => setVariantCount(count)}
              />
            </div>
          )}


      {/* Variants Section */}
      {showVariants && productId && (
        <ProductVariants
          productId={productId}
          productCategories={categories}
          selectedCategoryId={formData.product_category_id}
          isOpen={showVariants}
          onClose={handleVariantsClose}
          autoOpenAddVariant={true}
        />
      )}
    </div>
  );
}
ProductForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
};

ProductForm.defaultProps = {
  mode: 'create',
};