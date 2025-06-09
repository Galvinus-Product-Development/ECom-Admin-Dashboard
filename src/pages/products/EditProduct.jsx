import { ArrowLeft, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductForm.css';
import ProductVariants from './ProductVariants';

// Mock product data that aligns with ProductTable
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

export default function EditProduct({ onSave, onCancel }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
  const [existingVariants, setExistingVariants] = useState([]);

  // Load mock product data when component mounts or productId changes
  useEffect(() => {
    const loadProductData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const product = mockProducts[productId];
        if (product) {
          setFormData({
            productName: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            productType: product.type || 'Goods',
            originalPrice: product.price,
            salePrice: product.salePrice,
            isPublished: product.isPublished,
            sku: product.sku,
            barcode: product.barcode,
            stockStatus: product.stockStatus,
            trackInventory: product.trackInventory,
            quantity: product.quantity,
            continueSellingOutOfStock: product.continueSellingWhenOutOfStock,
            minimumStockLimit: product.minStockLimit,
            belowLimit: product.belowLimit,
            isPhysicalProduct: product.isPhysicalProduct,
            weight: product.weight,
            length: product.dimensions?.length,
            breadth: product.dimensions?.width,
            height: product.dimensions?.height
          });

          setUploadedImages(product.images || []);
          setExistingVariants(product.variants || []);
        } else {
          console.warn(`Product with ID ${productId} not found in mock data`);
        }
        setLoading(false);
      }, 800); // Simulate network delay
    };

    if (productId) {
      loadProductData();
    }
  }, [productId]);

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

  const handleUpdate = () => {
    // Simulate API call with mock data
    setTimeout(() => {
      console.log('Updated product data:', {
        id: productId,
        ...formData,
        images: uploadedImages,
        variants: existingVariants
      });
      alert('Product updated successfully! (mock)');
      
      if (onSave) {
        onSave();
      } else {
        navigate('/products');
      }
    }, 500);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/products');
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="product-form-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  if (!mockProducts[productId]) {
    return (
      <div className="product-form-container">
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

  return (
    <div className="product-form-container">
      <div className="form-header">
        <div className="header-left">
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <h1 className="form-title">Edit Product</h1>
        </div>
        <div className="button-group">
          <button 
            onClick={handleUpdate}
            className="btn btn-save"
          >
            Update Product
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

      {/* Variants Section */}
      {existingVariants.length > 0 && (
        <div className="form-section">
          <div className="section-header">
            <h2 className="section-title">Product Variants</h2>
            <button 
              onClick={() => setShowVariants(true)}
              className="btn btn-secondary"
            >
              Manage Variants ({existingVariants.length})
            </button>
          </div>
          
          <div className="variants-preview">
            {existingVariants.slice(0, 3).map(variant => (
              <div key={variant.id} className="variant-item">
                <img 
                  src={variant.image} 
                  alt={variant.variantValue}
                  className="variant-image"
                />
                <div className="variant-info">
                  <span className="variant-name">{variant.variantValue}</span>
                  <span className="variant-price">${variant.salePrice}</span>
                  <span className="variant-stock">Stock: {variant.stock}</span>
                </div>
              </div>
            ))}
            {existingVariants.length > 3 && (
              <div className="variant-item more-variants">
                <span>+{existingVariants.length - 3} more variants</span>
              </div>
            )}
          </div>
        </div>
      )}

      <ProductVariants 
        isOpen={showVariants} 
        onClose={() => setShowVariants(false)}
        productData={formData}
        initialVariants={existingVariants}
        onVariantsChange={setExistingVariants}
      />
    </div>
  );
}
/* import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProductImage,
  deleteProductItem,
  fetchBrands,
  fetchCategories,
  fetchColours, 
  fetchProductById,
  fetchSizeOptions,
  updateProduct,
  updateProductItem,
  uploadProductImages
} from "../../services/api";
import './EditProduct.css';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productItems, setProductItems] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colours, setColours] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [variantImages, setVariantImages] = useState({});
    const [selectedImages, setSelectedImages] = useState({});

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
        loadProductDetails();
    }, [productId]);

    const fetchInitialData = async () => {
        try {
            const [brandsResponse, categoriesResponse, coloursResponse, sizesResponse] = await Promise.all([
                fetchBrands(), fetchCategories(), fetchColours(), fetchSizeOptions()
            ]);
            setBrands(brandsResponse.data);
            setCategories(categoriesResponse.data);
            setColours(coloursResponse.data);
            setSizes(sizesResponse.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch initial data.");
        }
    };

    const loadProductDetails = async () => {
        try {
            const response = await fetchProductById(productId);
            const { data } = response;
            setProduct(data.data.product);
            setProductItems(data.data.productItems);

            const imagesData = {};
            data.data.productItems.forEach(item => {
                imagesData[item.product_item_id] = item.ProductImages  || [];
            });
            setVariantImages(imagesData);
        } catch (error) {
          console.error(error);
            toast.error("Failed to load product details.");
        }
    };

    const handleProductChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateProduct(productId, product);
            toast.success("Product updated successfully!");
           // navigate('/products');
        } catch (error) {
          console.error(error);
            toast.error("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    const handleVariantChange = (index, e) => {
        const updatedVariants = [...productItems];
        updatedVariants[index][e.target.name] = e.target.value;
        setProductItems(updatedVariants);
    };

    const handleUpdateVariant = async (index, productItemId) => {
        const variant = productItems[index];
        try {
            await updateProductItem(productItemId, variant);
            toast.success("Variant updated successfully!");
        } catch (error) {
          console.error(error);
            toast.error("Failed to update variant.");
        }
    };

    const handleDeleteVariant = async (productItemId) => {
        try {
            await deleteProductItem(productItemId);
            setProductItems(productItems.filter(item => item.product_item_id !== productItemId));
            toast.success("Variant deleted successfully!");
        } catch (error) {
          console.error(error);
            toast.error("Failed to delete variant.");
        }
    };
    const handleFileChange = (e, index, productItemId) => {
      const files = e.target.files;
      if (files && files[0]) {
          const currentImages = variantImages[productItemId] || [];
          const newImagesCount = (selectedImages[productItemId] || []).length;
  
          if (currentImages.length + newImagesCount >= 5) {
              toast.error("Cannot upload more than 5 images per variant.");
              return;
          }
  
          const updatedSelectedImages = { ...selectedImages };
        if (!updatedSelectedImages[productItemId]) {
            updatedSelectedImages[productItemId] = [];
        }
        updatedSelectedImages[productItemId].push(files[0]);

        setSelectedImages(updatedSelectedImages);
        toast.info(`Image selected: ${files[0].name}`);
      }
  };
  
  const handleImageUpload = async (e, productItemId) => {
    e.preventDefault();

    const currentImages = variantImages[productItemId] || [];
    const newImages = selectedImages[productItemId] || [];
    const totalImages = currentImages.length + newImages.length;

    if (totalImages > 5) {
        toast.error("Total images cannot exceed 5 per variant.");
        return;
    }

    const formData = new FormData();
    newImages.forEach(image => {
        if (image) formData.append("images", image);
    });

    try {
        await uploadProductImages(productItemId, formData);
        toast.success("Images uploaded successfully!");
        // Clear the uploaded images from the state
        const updatedSelectedImages = { ...selectedImages };
        delete updatedSelectedImages[productItemId];
        setSelectedImages(updatedSelectedImages);

        // Reload the images to reflect newly uploaded ones
        loadProductDetails();
    } catch (error) {
      console.error(error);
        toast.error("Failed to upload images.");
    }
};


  const handleDeleteImage = async (productItemId, imageId) => {
      try {
          await deleteProductImage(imageId);

          setVariantImages(prev => ({
              ...prev,
              [productItemId]: prev[productItemId].filter(img => img.image_id !== imageId)
          }));
          toast.success("Image deleted successfully!");
      } catch (error) {
          console.error(error);
          toast.error("Failed to delete image.");
      }
  };


    return (
        <div className="edit-product-container">
            <h1>Edit Product</h1>
            {product && (
                <form onSubmit={handleUpdateProduct } className="mb-4">
                    <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleProductChange}
                        className="p-2 mb-2 w-full border rounded"
                        required
                    />
                    <textarea
                        name="product_description"
                        value={product.product_description}
                        onChange={handleProductChange}
                        className="p-2 mb-2 w-full border rounded"
                        required
                    />

                    <select name="brand_id" value={product.brand_id} onChange={handleProductChange} className="p-2 mb-2 w-full border rounded" required>
                        {brands.map(brand => <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>)}
                    </select>

                    <select name="product_category_id" value={product.product_category_id} onChange={handleProductChange} className="p-2 mb-2 w-full border rounded" required>
                        {categories.map(category => <option key={category.product_category_id} value={category.product_category_id}>{category.category_name}</option>)}
                    </select>

                    <select name="status" value={product.status} onChange={handleProductChange} className="p-2 mb-2 w-full border rounded">
                        <option value="available">Available</option>
                        <option value="out of stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                    </select>

                    <button type="submit" disabled={loading} className="bg-indigo-600 text-white py-2 px-4 rounded">
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            )}

            <h2>Edit Variants</h2>
            {productItems.map((variant, index) => (
                <div key={variant.product_item_id} className="variant-container">
                    <select name="colour_id" value={variant.colour_id} onChange={handleVariantChange} className="p-2 mb-2 w-full border rounded" >
                    <option value="">Select Colour</option>
                    {colours.map((colour) => (
                        <option key={colour.colour_id} value={colour.colour_id}>{colour.colour_name}</option>
                    ))}
                </select>

                <select name="size_id" value={variant.size_id} onChange={handleVariantChange} className="p-2 mb-2 w-full border rounded" >
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                        <option key={size.size_id} value={size.size_id}>{size.size_name}</option>
                    ))}
                </select>
                    <input
                        type="text"
                        name="original_price"
                        value={variant.original_price}
                        onChange={(e) => handleVariantChange(index, e)}
                        className="p-2 mb-2 w-full border rounded"
                    />

                    <input
                        type="text"
                        name="sale_price"
                        value={variant.sale_price}
                        onChange={(e) => handleVariantChange(index, e)}
                        className="p-2 mb-2 w-full border rounded"
                    />

                    <input
                        type="text"
                        name="qty_in_stocks"
                        value={variant.qty_in_stocks}
                        onChange={(e) => handleVariantChange(index, e)}
                        className="p-2 mb-2 w-full border rounded"
                    />

                    <button onClick={() => handleUpdateVariant(index, variant.product_item_id)} className="bg-indigo-600 text-white py-1 px-4 rounded">Update Variant</button>
                    <button onClick={() => handleDeleteVariant(variant.product_item_id)} className="bg-indigo-600 text-white py-1 px-4 rounded">Delete Variant</button>

                    <div>
                        <h3>Images</h3>
                        <div className="existing-images">
                            {variantImages[variant.product_item_id]?.map((image, index) => (
                                <div key={image.image_id} className="image-preview">
                                    <img src={image.image_url} alt={`Image ${index + 1}`} />
                                    <button onClick={() => handleDeleteImage(variant.product_item_id, image.image_id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="image-upload-section">
                              {[...Array(5 - (variantImages[variant.product_item_id]?.length || 0))].map((_, index) => (
                                  <div key={index} className="image-input-container">
                                      <input 
                                          type="file" 
                                          accept="image/*" 
                                          onChange={(e) => handleFileChange(e, index, variant.product_item_id)}
                                      />
                                  </div>
                              ))}
                              <button onClick={(e) => handleImageUpload(e, variant.product_item_id)}>Upload Images (Max 5)</button>
                          </div>

                    </div>
               
                </div>
            ))}

            <button className="submit-product-button" onClick={() => navigate('/products')}>Save Updated Product</button>

        </div>
    );
};

export default EditProduct;

                      */