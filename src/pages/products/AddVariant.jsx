import { Edit2, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addVariantWithImages,
  deleteVariant,
  deleteVariantImage,
  fetchColours,
  fetchProductVariants,
  fetchSizesByCategory,
  updateVariant
} from '../../services/api';
import './AddVariant.css';

const AddVariant = ({
  productId,
  productCategories = [],
  selectedCategoryId,
  isOpen = true,
  onClose,
  onVariantUpdate,
  autoOpenAddVariant = false
}) => {
  // State management
  const [variants, setVariants] = useState([]);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(autoOpenAddVariant);
  const [editingVariant, setEditingVariant] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingColours, setLoadingColours] = useState(false);
  const [loadingSizes, setLoadingSizes] = useState(false);
  
  // Form data - Added variant_barcode field
  const [formData, setFormData] = useState({
    colour_id: '',
    size_id: '',
    original_price: 0,
    discount_applicable: 0,
    sale_price: 0,
    qty_in_stocks: 0,
    weight: 0,
    length: 0,
    breadth: 0,
    height: 0,
    variant_sku: '',
    variant_barcode: ''  // New field added
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId);

  useEffect(() => {
    if (!Array.isArray(variants)) {
      console.warn('Variants was not an array, resetting to empty array');
      setVariants([]);
    }
  }, [variants]);
  // Update when the prop changes
  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  // Load initial data
  useEffect(() => {
    if (productId) {
      loadVariants();
      loadColours();
      
      // Auto-load sizes if category is pre-selected
      if (selectedCategoryId) {
        loadSizesByCategory(selectedCategoryId);
      }
    }
  }, [productId, selectedCategoryId]);

  // Load sizes when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadSizesByCategory(selectedCategory);
    } else {
      setSizes([]);
    }
    // Reset size selection when category changes
    setFormData(prev => ({ ...prev, size_id: '' }));
  }, [selectedCategory]);

  // Calculate sale price when original price or discount changes
  useEffect(() => {
    const originalPrice = Number(formData.original_price) || 0;
    const discount = Math.min(100, Math.max(0, Number(formData.discount_applicable) || 0));
    const salePrice = originalPrice * (1 - (discount / 100));
    
    setFormData(prev => ({
      ...prev,
      sale_price: salePrice.toFixed(2),
      discount_applicable: discount // Ensure discount stays within bounds
    }));
  }, [formData.original_price, formData.discount_applicable]);

  const loadVariants = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProductVariants(productId);
      console.log('Variants response:', response); // Debug log
    
      // Ensure we have an array and transform the data
      const variantsData = Array.isArray(response) ? response : [response];
      
      setVariants(variantsData.map(variant => ({
        ...variant,
        // Ensure all required fields are present
        product_item_id: variant.product_item_id || variant.id,
        colour_name: variant.colour_name || variant.Colour?.colour_name,
        size_name: variant.size_name || variant.SizeOption?.size_name,
        images: variant.images || variant.variantImages || []
      })));
    } catch (error) {
      console.error('Error loading variants:', error);
      toast.error(error.response?.data?.message || 'Failed to load variants');
      setVariants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadColours = async () => {
    try {
      setLoadingColours(true);
      const colours = await fetchColours();
      setColours(colours || []);
    } catch (error) {
      console.error('Error loading colours:', error);
      toast.error('Failed to load colours');
      setColours([]);
    } finally {
      setLoadingColours(false);
    }
  };

  const loadSizesByCategory = async (categoryId) => {
    try {
      setLoadingSizes(true);
      const sizes = await fetchSizesByCategory(categoryId);
    setSizes(sizes || []);

    } catch (error) {
      console.error('Error loading sizes:', error);
      console.log('Actual API response:', sizes);
      toast.error('Failed to load sizes for this category');
      setSizes([]);
    } finally {
      setLoadingSizes(false);
    }
  };

  const resetForm = () => {
    setFormData({
      colour_id: '',
      size_id: '',
      original_price: 0,
      discount_applicable: 0,
      sale_price: 0,
      qty_in_stocks: 0,
      weight: 0,
      length: 0,
      breadth: 0,
      height: 0,
      variant_sku: '',
      variant_barcode: ''  
    });
    setSelectedImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      'original_price', 
      'discount_applicable',
      'qty_in_stocks',
      'weight',
      'length',
      'breadth',
      'height'
    ];
  
    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) 
        ? parseFloat(value) || 0  // Convert to number, default to 0 if invalid
        : value
    }));
  };
  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + selectedImages.length > 5) {
      toast.error('Maximum 5 images allowed per variant');
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: event.target.result,
          name: file.name,
          file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    const imageToRemove = selectedImages.find(img => img.id === imageId);
    
    if (!imageToRemove) return;
  
    if (imageToRemove.isExisting) {
      // For existing images, we'll use handleDeleteImage
      handleDeleteImage(imageId);
    } else {
      // For new images, just remove from selection
      setSelectedImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const validateForm = () => {

    if (!Array.isArray(variants)) {
      console.error('Variants is not an array:', variants);
      return false;
    }
    // Check if category is selected
    if (!selectedCategory) {
      toast.error('Please select a product category first');
      return false;
    }
    
    const originalPrice = Number(formData.original_price);
    if (originalPrice <= 0 || isNaN(originalPrice)) {
      toast.error('Original price must be a positive number');
      return false;
    }
  
    const discount = Number(formData.discount_applicable);
    if (discount < 0 || discount > 100 || isNaN(discount)) {
      toast.error('Discount must be between 0 and 100');
      return false;
    }
  
    const quantity = Number(formData.qty_in_stocks);
    if (quantity < 0 || isNaN(quantity)) {
      toast.error('Quantity must be a positive number');
      return false;
    }
    // Check for duplicate variant
    const duplicate = variants.some(v => 
      v.colour_id === formData.colour_id && 
      v.size_id === formData.size_id &&
      (!editingVariant || v.product_item_id !== editingVariant.product_item_id)
    );
    
    if (duplicate) {
      toast.error('A variant with this color and size already exists');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        colour_id: formData.colour_id, 
        size_id: formData.size_id, 
        original_price: Number(formData.original_price),
        discount_applicable: Number(formData.discount_applicable),
        qty_in_stocks: Math.max(0, Math.floor(Number(formData.qty_in_stocks))), // Ensure non-negative integer
        weight: formData.weight ? Number(formData.weight) : null,
        length: formData.length ? Number(formData.length) : null,
        breadth: formData.breadth ? Number(formData.breadth) : null,
        height: formData.height ? Number(formData.height) : null,
      };

      if (editingVariant) {
        // Get new images to upload (filter out existing ones)
      const newImages = selectedImages.filter(img => img.file && !img.isExisting);
      
      // Call the unified updateVariant function
      await updateVariant(
        editingVariant.product_item_id, 
        payload,
        newImages
      );
      
      await loadVariants();
      toast.success('Variant updated successfully!');
        setEditingVariant(null);
        
      } else {
        console.log('Submitting new variant payload:', payload);
        // Add new variant
        const imagesToUpload = selectedImages.filter(img => img.file);
        const response = await addVariantWithImages(productId, payload, imagesToUpload);
        console.log('Add response:', response);

         // Reload variants to get fresh data with all fields
        await loadVariants();
        toast.success('Variant added successfully!');
      }

      resetForm();
      setShowAddForm(false);
      
      if (onVariantUpdate) {
        onVariantUpdate(prevVariants => prevVariants + 1);
      }

    } catch (error) {
      console.error('Error saving variant:', error);
      toast.error(error.response?.data?.message || 'Failed to save variant');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (variant) => {
    setEditingVariant(variant);
    setFormData({
      colour_id: variant.colour_id,
      size_id: variant.size_id,
      original_price: Number(variant.original_price) || 0,
      discount_applicable: Number(variant.discount_applicable) || 0,
      sale_price: Number(variant.sale_price) || 0,
      qty_in_stocks: Math.floor(Number(variant.qty_in_stocks)) || 0,
      weight: variant.weight ? Number(variant.weight) : 0,
      length: variant.length ? Number(variant.length) : 0,
      breadth: variant.breadth ? Number(variant.breadth) : 0,
      height: variant.height ? Number(variant.height) : 0,
      // variant_sku: variant.variant_sku || '',
      // variant_barcode: variant.variant_barcode || ''  
    });
    setSelectedImages(
      variant.images?.map(img => ({
        id: img.image_id || Date.now(),
        url: img.image_url || img.url,
        name: img.image_name || img.name,
        isExisting: true,
        // Keep reference to original image if needed for deletion
        originalImage: img
      })) || []
    );
    setShowAddForm(true);
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }
  
    try {
      await deleteVariantImage(imageId);
      // Remove the image from state
      setSelectedImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(error.response?.data?.message || 'Failed to delete image');
    }
  };
  

  const handleDelete = async (variantId) => {
    if (!window.confirm('Are you sure you want to delete this variant?')) {
      return;
    }

    try {
      await deleteVariant(variantId);
      setVariants(prev => prev.filter(v => v.product_item_id !== variantId));
      toast.success('Variant deleted successfully!');
      
      if (onVariantUpdate) {
        onVariantUpdate(variants.length - 1);
      }
    } catch (error) {
      console.error('Error deleting variant:', error);
      toast.error('Failed to delete variant');
    }
  };

  const handleCancel = () => {
    const hasUnsavedChanges = Object.values(formData).some(
      (value) => value !== '' && value !== 0
    ) || selectedImages.length > 0;

    if (!hasUnsavedChanges || window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      setShowAddForm(false);
      setEditingVariant(null);
      resetForm();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="add-variant-container">
      {/* Header */}
      <div className="variant-header">
        <div className="variant-header-content">
          <h2 className="variant-header-title">Product Variants</h2>
          <p className="variant-header-description">
            Add size and color variations for your product
          </p>
        </div>
        <div className="variant-header-buttons">
          <button
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm || !selectedCategory}
            className="btn-add-variant"
            title={!selectedCategory ? "Please select a category first" : ""}
          >
            <Plus size={16} />
            Add Variant
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="btn-close-variant"
            >
              <X size={16} />
              Close
            </button>
          )}
        </div>
      </div>

      <div className="variant-content">
        {/* Category Selection - Enhanced with better UX */}
        <div className="category-selection">
          <label className="variant-form-label">
            <span className="label-text">Size Category:</span>
            <span className="label-value">
              {productCategories.find(c => c.product_category_id === selectedCategory)?.category_name || 
               <span className="text-red-500">Not selected</span>}
            </span>
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            required
          >
            <option value="">Select a category to load sizes</option>
            {productCategories.map(category => (
              <option key={category.product_category_id} value={category.product_category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          
          {/* Category Selection Hint */}
          {!selectedCategory && (
            <p className="text-sm text-amber-600 mt-2">
              ⚠️ You must select a category before adding variants. This determines available sizes.
            </p>
          )}
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="variant-form-container">
            <h3 className="variant-form-title">
              {editingVariant ? 'Edit Variant' : 'Add New Variant'}
            </h3>
            
            <form onSubmit={handleSubmit} className="variant-form">
              {/* Basic Info */}
              <div className="form-grid-2">
                <div className="variant-form-group">
                  <label className="variant-form-label">Colour</label>
                  {loadingColours ? (
                    <select className="variant-form-select" disabled>
                      <option>Loading colours...</option>
                    </select>
                  ) : (
                    <select
                      name="colour_id"
                      value={formData.colour_id}
                      onChange={handleInputChange}
                      className="variant-form-select"
                      
                    >
                      <option value="">Select colour</option>
                      {colours.map(colour => (
                        <option key={colour.colour_id} value={colour.colour_id}>
                          {colour.colour_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="variant-form-group">
                  <label className="variant-form-label">Size</label>
                  {loadingSizes ? (
                    <select className="variant-form-select" disabled>
                      <option>Loading sizes...</option>
                    </select>
                  ) : (
                    <select
                      name="size_id"
                      value={formData.size_id}
                      onChange={handleInputChange}
                      className="variant-form-select"
                      disabled={!selectedCategory || sizes.length === 0}
                      
                    >
                      <option value="">{sizes.length === 0 ? 'No sizes available' : 'Select size'}</option>
                      {sizes.map(size => (
                        <option key={size.size_id} value={size.size_id}>
                          {size.size_name}
                        </option>
                      ))}
                    </select>
                  )}
                  {!loadingSizes && selectedCategory && sizes.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">No sizes found for this category</p>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="form-grid-3">
                <div className="variant-form-group">
                  <label className="variant-form-label">Original Price</label>
                  <input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      const value = Math.max(0, Number(e.target.value) || 0);
                      setFormData(prev => ({ ...prev, original_price: value }));
                    }}
                    min="0"
                    step="0.01"
                    required
                    className="variant-form-input"
                    placeholder="0.00"
                  />
                </div>

                <div className="variant-form-group">
                  <label className="variant-form-label">Discount (%)</label>
                  <input
                    type="number"
                    name="discount_applicable"
                    value={formData.discount_applicable}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="variant-form-input"
                    placeholder="0"
                  />
                </div>

                <div className="variant-form-group">
                  <label className="variant-form-label">Sale Price</label>
                  <input
                    type="number"
                    name="sale_price"
                    value={Number(formData.sale_price).toFixed(2)}
                    readOnly
                    className="variant-form-input"
                    placeholder="Auto calculated"
                  />
                </div>
              </div>

              {/* Stock & Dimensions */}
              <div className="form-grid-2">
                <div className="variant-form-group">
                  <label className="variant-form-label">Stock Quantity</label>
                  <input
                    type="number"
                    name="qty_in_stocks"
                    value={formData.qty_in_stocks}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="variant-form-input"
                    placeholder="0"
                  />
                </div>

                <div className="variant-form-group">
                  <label className="variant-form-label">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="variant-form-input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div className="variant-form-group">
                <label className="variant-form-label">Dimensions (cm)</label>
                <div className="form-grid-3">
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="variant-form-input"
                    placeholder="Length"
                  />
                  <input
                    type="number"
                    name="breadth"
                    value={formData.breadth}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="variant-form-input"
                    placeholder="Breadth"
                  />
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="variant-form-input"
                    placeholder="Height"
                  />
                </div>
              </div>

              {/* SKU and Barcode - Display only when editing */}
              {editingVariant && (
                <div className="form-grid-2">
                  <div className="variant-form-group">
                    <label className="variant-form-label">SKU</label>
                    <input
                      type="text"
                      name="variant_sku"
                      value={formData.variant_sku}
                      readOnly
                      className="variant-form-input"
                      placeholder="Auto-generated"
                    />
                  </div>

                  <div className="variant-form-group">
                    <label className="variant-form-label">Barcode</label>
                    <input
                      type="text"
                      name="variant_barcode"
                      value={formData.variant_barcode}
                      readOnly
                      className="variant-form-input"
                      placeholder="Auto-generated"
                    />
                  </div>
                </div>
              )}
              {/* Image Upload */}
              <div className="image-upload-section">
                <label className="variant-form-label">
                  Variant Images (Max 5)
                </label>
                <div className={`image-upload-area ${selectedImages.length >= 5 ? 'disabled' : ''}`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={selectedImages.length >= 5}
                    className="upload-input"
                    id="variant-images"
                  />
                  <label
                    htmlFor="variant-images"
                    className="upload-label"
                  >
                    <Upload className="upload-icon" />
                    <p className="upload-text">
                      {selectedImages.length > 0 
                        ? `${selectedImages.length}/5 images selected`
                        : 'Click to upload variant images'
                      }
                    </p>
                  </label>
                </div>

                {selectedImages.map(image => (
                  <div key={image.id} className="image-preview-item">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="remove-image-btn"
                    >
                      <X size={12} />
                    </button>
                    {image.isExisting && (
                      <span className="existing-image-badge">Existing</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="loading-spinner"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save size={16} />
                      {editingVariant ? 'Update Variant' : 'Add Variant'}
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Variants List */}
        {isLoading ? (
          <div className="variants-loading">
            <div className="loading-spinner-large"></div>
            <p className="loading-text">Loading variants...</p>
          </div>
        ) : variants.length > 0 ? (
          <div className="variants-list-container">
            <div className="variants-list-header">
              <h3 className="variants-list-title">
                Existing Variants ({variants.length})
              </h3>
            </div>
            
            <div className="variants-table-container">
              <table className="variants-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Details</th>
                    <th>Pricing</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {variants.map((variant, index) => {
                       const displayVariant = {
                          product_item_id: variant.product_item_id || variant.id,
                          colour_name: variant.colour_name || variant.Colour?.colour_name,
                          size_name: variant.size_name || variant.SizeOption?.size_name,
                          original_price: variant.original_price,
                          sale_price: variant.sale_price,
                          qty_in_stocks: variant.qty_in_stocks,
                          variant_sku: variant.variant_sku,
                          variant_barcode: variant.variant_barcode,
                          images: variant.images || variant.variantImages || [],
                          _raw: variant
                       };
                       // Get primary image URL (with fallback)
                        const primaryImage = displayVariant.images[0]?.url || 
                                            displayVariant.images[0]?.image_url;
                      
                      return (
                        <tr key={displayVariant.product_item_id || index}>
                          <td>
                          {primaryImage ? (
                              <img
                                src={primaryImage}
                                alt="Variant"
                                className="variant-image"
                              />
                            ) : (
                              <div className="variant-no-image">
                                <span>No Image</span>
                              </div>
                            )}
                          </td>
                             <td>
                            <div className="variant-detail-primary">
                              {displayVariant.colour_name || 'No color'}
                            </div>
                            <div className="variant-detail-secondary">
                              Size: {displayVariant.size_name || 'No size'}
                            </div>
                            <div className="variant-detail-tertiary">
                              SKU: {displayVariant.variant_sku || 'Not set'}
                            </div>
                            <div className="variant-detail-tertiary">
                              Barcode: {displayVariant.variant_barcode || 'Not set'}
                            </div>
                          </td>
                          <td>
                              <div className="variant-price-current">
                                ₹{Number(displayVariant.sale_price || 0).toFixed(2)}
                              </div>
                              {displayVariant.original_price !== displayVariant.sale_price && (
                                <div className="variant-price-original">
                                  ₹{Number(displayVariant.original_price || 0).toFixed(2)}
                                </div>
                              )}
                            </td>
                            <td>
                              {displayVariant.qty_in_stocks || 0}
                            </td>
                          <td>
                            <div className="variant-actions">
                              <button
                                onClick={() => handleEdit(displayVariant._raw)}
                                className="action-btn edit"
                                title="Edit variant"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(displayVariant.product_item_id)}
                                className="action-btn delete"
                                title="Delete variant"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !showAddForm && (
            <div className="variants-empty-state">
              <div className="empty-state-icon">
                <Plus size={24} />
              </div>
              <h3 className="empty-state-title">No variants yet</h3>
              <p className="empty-state-description">
                Add size and color variations to make your product more appealing to customers.
              </p>
              {selectedCategory ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-first-variant"
                >
                  Add Your First Variant
                </button>
              ) : (
                <div className="empty-state-warning">
                  <p className="text-amber-600 mb-2">
                    Please select a product category first to enable variant creation.
                  </p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

AddVariant.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  productCategories: PropTypes.arrayOf(
    PropTypes.shape({
      product_category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      category_name: PropTypes.string
    })
  ).isRequired,
  selectedCategoryId: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onVariantUpdate: PropTypes.func,
  autoOpenAddVariant: PropTypes.bool
};

AddVariant.defaultProps = {
  isOpen: true,
  selectedCategoryId: '',
  onVariantUpdate: () => {},
  autoOpenAddVariant: false
};

export default AddVariant;


// import { Edit2, Plus, Trash2, Upload, X } from 'lucide-react';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import {
//   addVariantWithImages,
//   deleteVariant,
//   fetchColours,
//   fetchProductVariants,
//   fetchSizes,
//   updateVariant
// } from '../../services/api';
// import './ProductVariants.css';

// const ProductVariants = ({
//   productId, 
//   sizeCategories, 
//   onVariantUpdate,
//   isOpen,
//   onClose,
//   autoOpenAddVariant
// }) => {
//   const [variants, setVariants] = useState([]);
//   const [productData, setProductData] = useState(null);
//   const [colours, setColours] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [selectedSizeCategory, setSelectedSizeCategory] = useState('');
//   const [showAddVariant, setShowAddVariant] = useState(autoOpenAddVariant || false);
//   const [editingVariant, setEditingVariant] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Form data for adding/editing variants
//   const [variantData, setVariantData] = useState({
//     colour_id: '',
//     size_id: '',
//     original_price: '',
//     discount_applicable: 0,
//     sale_price: '',
//     qty_in_stocks: '',
//     weight: '',
//     length: '',
//     breadth: '',
//     height: ''
//   });
  
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);

//   useEffect(() => {
//     const loadVariants = async () => {
//       try {
//         const response = await fetchProductVariants(productId);
//         setVariants(response.data|| []);
        
//         // Set product data from the first variant (if exists)
//         if (response.data.length > 0 && response.data[0].Product) {
//           setProductData(response.data[0].Product);
//         }
//       } catch (error) {
//         console.error('Error loading variants:', error);
//         toast.error('Failed to load product variants');
//       }
//     };
    
//     if (productId) {
//       loadVariants();
//     }
//   }, [productId]);
//   // Set showAddVariant when autoOpenAddVariant changes
//   useEffect(() => {
//     if (autoOpenAddVariant) {
//       setShowAddVariant(true);
//     }
//   }, [autoOpenAddVariant]);

//   // Load initial data
//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const coloursResponse = await fetchColours();
//         setColours(coloursResponse.data || []);
        
//         if (sizeCategories.length > 0) {
//           setSelectedSizeCategory(sizeCategories[0].size_category_id);
//         }
//       } catch (error) {
//         toast.error('Failed to load colours');
//         console.error('Error loading colours:', error);
//       }
//     };
//     loadInitialData();
//   }, [sizeCategories]);

//   // Load sizes when size category changes
//   useEffect(() => {
//     const fetchSizes = async () => {
//       if (!selectedSizeCategory) return;
//       try {
//         const sizesResponse = await fetchSizes(selectedSizeCategory);
//         setSizes(sizesResponse.data);
//       } catch (error) {
//         toast.error('Failed to load sizes');
//         console.error('Error loading sizes:', error);
//       }
//     };
//     fetchSizes();
//   }, [selectedSizeCategory]);

//   // Reset form data
//   const resetForm = () => {
//     setVariantData({
//       colour_id: '',
//       size_id: '',
//       original_price: '',
//       discount_applicable: 0,
//       sale_price: '',
//       qty_in_stock: '',
//       weight: '',
//       length: '',
//       breadth: '',
//       height: ''
//     });
//     setSelectedImages([]);
//     setExistingImages([]);
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVariantData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Calculate sale price if original price or discount changes
//     if (name === 'original_price' || name === 'discount_applicable') {
//       const originalPrice = name === 'original_price' ? parseFloat(value) || 0 : parseFloat(variantData.original_price) || 0;
//       const discount = name === 'discount_applicable' ? parseFloat(value) || 0 : parseFloat(variantData.discount_applicable) || 0;
      
//       setVariantData(prev => ({
//         ...prev,
//         sale_price: (originalPrice * (1 - (discount / 100))).toFixed(2)
//       }));
//     }
//   };

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + selectedImages.length > 5) {
//       toast.error('You can upload a maximum of 5 images per variant');
//       return;
//     }

//     files.forEach(file => {
//       if (!file.type.match('image.*')) {
//         toast.error(`${file.name} is not an image file`);
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setSelectedImages(prev => [...prev, {
//           id: Date.now() + Math.random(),
//           url: event.target.result,
//           name: file.name,
//           file
//         }]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Remove image
//   const removeImage = (id) => {
//     setSelectedImages(prev => prev.filter(img => img.id !== id));
//   };

//   // Add new variant
//   const handleAddVariant = async (e) => {
//     e.preventDefault();
    
//     if (!variantData.colour_id) {
//       toast.error('Please select a color');
//       return;
//     }
//     if (!variantData.size_id) {
//       toast.error('Please select a size');
//       return;
//     }
//     if (!variantData.original_price) {
//       toast.error('Please enter original price');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         ...variantData,
//         original_price: parseFloat(variantData.original_price),
//         discount_applicable: parseFloat(variantData.discount_applicable),
//         qty_in_stock: parseInt(variantData.qty_in_stock || 0),
//         weight: parseFloat(variantData.weight || 0),
//         length: parseFloat(variantData.length || 0),
//         breadth: parseFloat(variantData.breadth || 0),
//         height: parseFloat(variantData.height || 0)
//       };

//       const imagesToUpload = selectedImages.filter(img => img.file);
//       const response = await addVariantWithImages(productId, payload, imagesToUpload);
      
//       const newVariant = {
//         ...response.data,
//         colour_name: colours.find(c => c.colour_id === payload.colour_id)?.colour_name || 'Unknown',
//         size_name: sizes.find(s => s.size_id === payload.size_id)?.size_name || 'Unknown',
//         images: imagesToUpload.map(img => ({ url: img.url, name: img.name }))
//       };

//       setVariants(prev => [...prev, newVariant]);
//       toast.success('Variant added successfully!');
//       resetForm();
//       setShowAddVariant(false);
      
//       if (onVariantUpdate) {
//         onVariantUpdate(variants.length + 1);
//       }

//     } catch (error) {
//       console.error('Error adding variant:', error);
//       toast.error(error.response?.data?.message || 'Failed to add variant');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Edit variant
//   const handleEditVariant = (variant) => {
//     setEditingVariant(variant);
//     setVariantData({
//       colour_id: variant.colour_id,
//       size_id: variant.size_id,
//       original_price: variant.original_price,
//       discount_applicable: variant.discount_applicable || 0,
//       sale_price: variant.sale_price,
//       qty_in_stock: variant.qty_in_stock,
//       weight: variant.weight || '',
//       length: variant.length || '',
//       breadth: variant.breadth || '',
//       height: variant.height || ''
//     });
//     setExistingImages(variant.images || []);
//   };

//   // Update variant
//   const handleUpdateVariant = async (e) => {
//     e.preventDefault();
    
//     if (!editingVariant) return;

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         ...variantData,
//         original_price: parseFloat(variantData.original_price),
//         discount_applicable: parseFloat(variantData.discount_applicable),
//         qty_in_stock: parseInt(variantData.qty_in_stock || 0),
//         weight: parseFloat(variantData.weight || 0),
//         length: parseFloat(variantData.length || 0),
//         breadth: parseFloat(variantData.breadth || 0),
//         height: parseFloat(variantData.height || 0)
//       };

//       await updateVariant(editingVariant.product_item_id, payload);
      
//       // Update local state
//       setVariants(prev => prev.map(v => 
//         v.product_item_id === editingVariant.product_item_id 
//           ? { ...v, ...payload, 
//               colour_name: colours.find(c => c.colour_id === payload.colour_id)?.colour_name || 'Unknown',
//               size_name: sizes.find(s => s.size_id === payload.size_id)?.size_name || 'Unknown'
//             }
//           : v
//       ));

//       toast.success('Variant updated successfully!');
//       setEditingVariant(null);
//       resetForm();

//     } catch (error) {
//       console.error('Error updating variant:', error);
//       toast.error(error.response?.data?.message || 'Failed to update variant');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete variant
//   const handleDeleteVariant = async (variantId) => {
//     if (!window.confirm('Are you sure you want to delete this variant?')) {
//       return;
//     }

//     try {
//       await deleteVariant(variantId);
//       setVariants(prev => prev.filter(v => v.product_item_id !== variantId));
//       toast.success('Variant deleted successfully!');
      
//       if (onVariantUpdate) {
//         onVariantUpdate(variants.length - 1);
//       }
//     } catch (error) {
//       console.error('Error deleting variant:', error);
//       toast.error('Failed to delete variant');
//     }
//   };

//   // Cancel editing
//   const handleCancelEdit = () => {
//     setEditingVariant(null);
//     setShowAddVariant(false);
//     resetForm();
//   };

//   // Handle finish - close the variants section
//   const handleFinish = () => {
//     if (onClose) {
//       onClose();
//     }
//   };

//   return (
//     <div className="product-form-container">
//       {/* Header with finish button */}
//       <div className="form-header">
//         <h1 className="form-title">Add Product Variants for: {productData?.product_name || 'Product'}</h1>
//         <div className="button-group">
//           <button 
//             onClick={handleFinish}
//             className="btn btn-primary"
//           >
//             Finish & Continue
//           </button>
//           {variants.length > 0 && (
//             <button 
//               onClick={handleFinish}
//               className="btn btn-secondary"
//             >
//               Skip Variants
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="variants-section">
//         <div className="variants-header">
//           <h2 className="section-title">Product Variants</h2>
//           <button 
//             className="btn btn-primary"
//             onClick={() => setShowAddVariant(true)}
//             disabled={showAddVariant || editingVariant}
//           >
//             <Plus size={16} />
//             Add Variant
//           </button>
//         </div>

//         {/* Size Category Selection */}
//         <div className="form-section">
//           <div className="size-category-selector">
//             <label className="form-label">Size Category</label>
//             <select
//               value={selectedSizeCategory}
//               onChange={(e) => setSelectedSizeCategory(e.target.value)}
//               className="form-select"
//             >
//               <option value="">Select size category</option>
//               {sizeCategories.map(category => (
//                 <option key={category.size_category_id} value={category.size_category_id}>
//                   {category.size_category_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Add/Edit Variant Form */}
//         {(showAddVariant || editingVariant) && (
//           <div className="form-section">
//             <div className="variant-form-container">
//               <h3 className="form-subtitle">
//                 {editingVariant ? 'Edit Variant' : 'Add New Variant'}
//               </h3>
              
//               <form onSubmit={editingVariant ? handleUpdateVariant : handleAddVariant}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label className="form-label">Colour*</label>
//                     <select
//                       name="colour_id"
//                       value={variantData.colour_id}
//                       onChange={handleChange}
//                       className="form-select"
//                       required
//                     >
//                       <option value="">Select colour</option>
//                       {colours.map(colour => (
//                         <option key={colour.colour_id} value={colour.colour_id}>
//                           {colour.colour_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Size*</label>
//                     <select
//                       name="size_id"
//                       value={variantData.size_id}
//                       onChange={handleChange}
//                       className="form-select"
//                       required
//                     >
//                       <option value="">Select size</option>
//                       {sizes.map(size => (
//                         <option key={size.size_id} value={size.size_id}>
//                           {size.size_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label className="form-label">Original Price*</label>
//                     <input
//                       type="number"
//                       name="original_price"
//                       value={variantData.original_price}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Discount (%)</label>
//                     <input
//                       type="number"
//                       name="discount_applicable"
//                       value={variantData.discount_applicable}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="0"
//                       min="0"
//                       max="100"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Sale Price</label>
//                     <input
//                       type="number"
//                       name="sale_price"
//                       value={variantData.sale_price}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       readOnly
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Stock Quantity</label>
//                     <input
//                       type="number"
//                       name="qty_in_stock"
//                       value={variantData.qty_in_stock}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="0"
//                       min="0"
//                     />
//                   </div>
//                 </div>

//                 {/* Dimensions */}
//                 <div className="form-group">
//                   <label className="form-label">Dimensions & Weight</label>
//                   <div className="dimensions-grid">
//                     <input
//                       type="number"
//                       name="weight"
//                       value={variantData.weight}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Weight (kg)"
//                       min="0"
//                       step="0.01"
//                     />
//                     <input
//                       type="number"
//                       name="length"
//                       value={variantData.length}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Length (cm)"
//                       min="0"
//                       step="0.01"
//                     />
//                     <input
//                       type="number"
//                       name="breadth"
//                       value={variantData.breadth}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Breadth (cm)"
//                       min="0"
//                       step="0.01"
//                     />
//                     <input
//                       type="number"
//                       name="height"
//                       value={variantData.height}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="Height (cm)"
//                       min="0"
//                       step="0.01"
//                     />
//                   </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="form-group">
//                   <label className="form-label">Variant Images (Max 5)</label>
//                   <div className="upload-area">
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden-input"
//                       id="variant-image-upload"
//                       disabled={selectedImages.length >= 5}
//                     />
//                     <label htmlFor="variant-image-upload" className="upload-label">
//                       <Upload className="upload-icon" />
//                       <span className="upload-text">
//                         {selectedImages.length > 0 
//                           ? `Add more images (${selectedImages.length}/5)`
//                           : 'Upload variant images'}
//                       </span>
//                     </label>
//                   </div>
                  
//                   {selectedImages.length > 0 && (
//                     <div className="image-preview-grid">
//                       {selectedImages.map(image => (
//                         <div key={image.id} className="image-preview">
//                           <img
//                             src={image.url}
//                             alt={image.name}
//                             className="preview-image"
//                           />
//                           <button
//                             onClick={() => removeImage(image.id)}
//                             className="remove-image-btn"
//                             type="button"
//                           >
//                             <X className="remove-icon" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Saving...' : (editingVariant ? 'Update Variant' : 'Add Variant')}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="btn btn-secondary"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Variants List */}
//         {variants.length > 0 && (
//           <div className="form-section">
//             <div className="variants-list">
//               <h3 className="variants-list-title">Product Variants ({variants.length})</h3>
//               <div className="variants-table">
//                 <div className="table-header">
//                   <div className="table-cell">Image</div>
//                   <div className="table-cell">Colour</div>
//                   <div className="table-cell">Size</div>
//                   <div className="table-cell">Price</div>
//                   <div className="table-cell">Stock</div>
//                   <div className="table-cell">Actions</div>
//                 </div>
                
//                 {variants.map((variant, index) => (
//                   <div key={variant.product_item_id || index} className="table-row">
//                     <div className="table-cell">
//                       {variant.images && variant.images.length > 0 ? (
//                         <img 
//                           src={variant.images[0].url} 
//                           alt="Variant" 
//                           className="variant-thumbnail"
//                         />
//                       ) : (
//                         <div className="no-image">No Image</div>
//                       )}
//                     </div>
//                     <div className="table-cell">{variant.colour_name}</div>
//                     <div className="table-cell">{variant.size_name}</div>
//                     <div className="table-cell">
//                       <div className="price-info">
//                         <span className="sale-price">₹{variant.sale_price}</span>
//                         {variant.original_price !== variant.sale_price && (
//                           <span className="original-price">₹{variant.original_price}</span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="table-cell">{variant.qty_in_stock}</div>
//                     <div className="table-cell">
//                       <div className="action-buttons">
//                         <button
//                           onClick={() => handleEditVariant(variant)}
//                           className="btn-icon btn-edit"
//                           title="Edit variant"
//                         >
//                           <Edit2 size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteVariant(variant.product_item_id)}
//                           className="btn-icon btn-delete"
//                           title="Delete variant"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {variants.length === 0 && !showAddVariant && !editingVariant && (
//           <div className="form-section">
//             <div className="empty-variants">
//               <p>No variants added yet. Click "Add Variant" to create your first variant.</p>
//               <p><small>You can also skip this step and add variants later.</small></p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// ProductVariants.propTypes = {
//   productId: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   sizeCategories: PropTypes.arrayOf(
//     PropTypes.shape({
//       size_category_id: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//       ]).isRequired,
//       size_category_name: PropTypes.string.isRequired
//     })
//   ).isRequired,
//   onVariantUpdate: PropTypes.func,
//   isOpen: PropTypes.bool,
//   onClose: PropTypes.func,
//   autoOpenAddVariant: PropTypes.bool 
// };

// ProductVariants.defaultProps = {
//   onVariantUpdate: () => {},
//   isOpen: false,
//   onClose: () => {},
//   autoOpenAddVariant: false 
// };

// export default ProductVariants;