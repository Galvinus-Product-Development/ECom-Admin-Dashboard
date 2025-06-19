import axios from "axios";

// Set your backend API base URL
const API_BASE_URL = "http://localhost:5001/api/v1"; 

const api = axios.create({
    baseURL: API_BASE_URL,
  });

  //  PRODUCT APIs 

// Create product with images
export const createProductWithImages = (productData, images = []) => {
    const formData = new FormData();
    
    // Append each product field individually
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    // Append images
    images.forEach((image) => {
      formData.append('images', image.file || image);
    });
  
    return api.post("/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

// Add images to existing product
export const addProductImages = (productId, images = []) => {
  const formData = new FormData();
  images.forEach((image) => {
      formData.append('images', image.file || image);
  });

  return api.post(`/products/${productId}/images`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};

// Fetch all products
export const fetchProducts = (params = {}) => api.get("/products", { params });

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Update a product by ID
// Update a product with images (complete update including image management)
export const updateProductWithImages = (productId, productData, newImages = [], deletedImageIds = []) => {
  const formData = new FormData();
  
  // Append each product field individually
  Object.keys(productData).forEach(key => {
    // Convert null values to empty string for form data
    const value = productData[key] === null ? '' : productData[key];
    formData.append(key, value);
  });

  // Append deleted image IDs as JSON string
  if (deletedImageIds.length > 0) {
    formData.append('deletedImageIds', JSON.stringify(deletedImageIds));
  }

  // Append new images
  newImages.forEach((image) => {
    formData.append('images', image.file || image);
  });

  return api.put(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// export const updateProduct = (productId, productData) => api.put(`/products/${productId}`, productData);

// Delete a product (soft delete)
export const deleteProduct = (productId) => api.delete(`/products/${productId}`);

// Toggle publish status
export const togglePublishStatus = (productId) => api.patch(`/products/${productId}/toggle-publish`);

//  PRODUCT ITEM (VARIANT) APIs 

// Add variant with images
export const addVariantWithImages = (productId, variantData, images = []) => {
  console.log('Adding variant with productId:', productId);
    console.log('Variant data:', variantData);
  console.log('Images:', images);
  
  const formData = new FormData();
 // Append each variant data field individually instead of stringifying
 Object.keys(variantData).forEach(key => {
  // Convert null values to empty string
  const value = variantData[key] === null ? '' : variantData[key];
  formData.append(key, value);
});

// Append images
images.forEach((image) => {
  formData.append('images', image.file || image);
});

  return api.post(`/variants/${productId}/variants`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};

// Add images to existing variant
export const addVariantImages = (productItemId, images = []) => {
  const formData = new FormData();
  images.forEach((image) => {
      formData.append('images', image.file || image);
  });

  return api.post(`/variants/${productItemId}/images`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};
export const deleteVariantImage = (imageId) => {
  return api.delete(`/variants/images/${imageId}`);
};

// Fetch all variants for a product
export const fetchProductVariants = async (productId) => {
  try {
    console.log('Fetching variants for product:', productId);
    const response = await api.get(`/variants/${productId}/variants`);
    
    // Handle both response structures
    const data = response.data?.data || response.data;
    
    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching variants:', error);
    throw error;
  }
};

// Update a variant by ID
export const updateVariant = (variantId, variantData, images = []) => {
  const formData = new FormData();
  
  // Append variant data
  Object.keys(variantData).forEach(key => {
    formData.append(key, variantData[key]);
  });
  
  // Append images if provided
  images.forEach(image => {
    formData.append('images', image.file || image);
  });

  return api.put(`/variants/${variantId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Delete a variant by ID
export const deleteVariant = (variantId) => {
  console.log('Deleting variant:', variantId);
  return api.delete(`/variants/${variantId}`);
};

// Fetch a specific variant by ID
export const fetchVariantById = (variantId) => {
  console.log('Fetching variant by ID:', variantId);
  return api.get(`/variants/${variantId}`);
};

 
// Category API functions
export const fetchCategories = async () => {
  try {
    const response = await api.get("/product-categories");
    console.log('API response data:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; // Fetch all categories
export const fetchCategoryById = (categoryId) => api.get(`/product-categories/${categoryId}`); // Fetch category by ID
export const fetchParentCategories = () => api.get("/product-categories/parents"); // Fetch all parent categories
export const fetchSubcategories = (categoryId) => api.get(`/product-categories/${categoryId}/subcategories`); // Fetch subcategories
export const createCategory = (categoryData) => api.post("/product-categories", categoryData); // Create a new category
export const updateCategory = (categoryId, categoryData) => api.put(`/product-categories/${categoryId}`, categoryData); // Update category
export const deleteCategory = (categoryId) => api.delete(`/product-categories/${categoryId}`); // Delete category
export const moveSubcategory = (subcategoryId, newParentId) => api.put(`/product-categories/${subcategoryId}/move/${newParentId}`); // Move subcategory
export const fetchActiveCategories = () => api.get("/product-categories/status/active"); // Fetch active categories
export const fetchInactiveCategories = () => api.get("/product-categories/status/inactive"); // Fetch inactive categories

// Brand API functions
export const fetchBrands = () => api.get("/brands");
export const fetchBrandById = (id) => api.get(`/brands/${id}`);
export const createBrand = (brandData) => api.post("/brands", brandData);
export const updateBrand = (id, brandData) => api.put(`/brands/${id}`, brandData);
export const deleteBrand = (id) => api.delete(`/brands/${id}`);
export const restoreBrand = (id) => api.patch(`/brands/${id}/restore`);

// Colour API methods
export const fetchColours = async () => {
  try {
    const response = await api.get('/colours');
    return Array.isArray(response) ? response : (response.data || []);
  } catch (error) {
    console.error('Error fetching colours:', error);
    throw error;
  }
};

export const createColour = async (colourData) => {
  try {
    const response = await api.post('/colours', colourData);
    return response.data;
  } catch (error) {
    console.error('Error creating colour:', error);
    throw error;
  }
};

export const updateColour = async (id, colourData) => {
  try {
    const response = await api.put(`/colours/${id}`, colourData);
    return response.data;
  } catch (error) {
    console.error('Error updating colour:', error);
    throw error;
  }
};

export const deleteColour = async (id) => {
  try {
    await api.delete(`/colours/${id}`);
  } catch (error) {
    console.error('Error deleting colour:', error);
    throw error;
  }
};

// Size API methods
export const fetchSizes = async () => {
  try {
    const response = await api.get('/size-options', {
      params: {
        include: 'category' 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sizes:', error);
    throw error;
  }
};

export const fetchSizesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/size-options/category/${categoryId}`);
    return Array.isArray(response) ? response : (response.data || []);
  } catch (error) {
    console.error('Error fetching sizes by category:', error);
    throw error;
  }
};

export const createSize = async (sizeData) => {
  try {
    const response = await api.post('/size-options', sizeData);
    return response.data;
  } catch (error) {
    console.error('Error creating size:', error);
    throw error;
  }
};

export const updateSize = async (id, sizeData) => {
  try {
    const response = await api.put(`/size-options/${id}`, sizeData);
    return {
      ...response.data,
      product_category_id: response.data.product_category_id,
      category_name: response.data.category?.category_name || sizeData.category_name
    };
  } catch (error) {
    console.error('Error updating size:', error);
    throw error;
  }
};

export const deleteSize = async (id) => {
  try {
    await api.delete(`/size-options/${id}`);
  } catch (error) {
    console.error('Error deleting size:', error);
    throw error;
  }
};

// Create a new coupon
export const createCoupon = (couponData) => {
  return api.post('/coupons', couponData);
};

// Get all coupons with optional filters
export const fetchCoupons = (params = {}) => {
  return api.get('/coupons', {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || '',
      ...params
    }
  });
};

// Get a single coupon by ID with all rules and rewards
export const fetchCouponById = (couponId) => {
  return api.get(`/coupons/${couponId}`);
};

// Update a coupon
export const updateCoupon = (couponId, couponData) => {
  return api.put(`/coupons/${couponId}`, couponData);
};

// Delete a coupon
export const deleteCoupon = (couponId) => {
  return api.delete(`/coupons/${couponId}`);
};

// Validate a coupon code
export const validateCoupon = (code, userId, orderDetails) => {
  return api.post(`/coupons/validate/${code}`, {
    userId,
    orderDetails
  });
};

// Add a rule to a coupon
export const addCouponRule = (couponId, ruleData) => {
  return api.post(`/coupons/${couponId}/rules`, ruleData);
};

// Add a reward to a coupon
export const addCouponReward = (couponId, rewardData) => {
  return api.post(`/coupons/${couponId}/rewards`, rewardData);
};

// Get all discount types (static data)
export const getDiscountTypes = () => {
  return Promise.resolve([
    { value: 'ProductDiscount', label: 'Product Discount' },
    { value: 'TotalOrderDiscount', label: 'Total Order Discount' },
    { value: 'BuyYAndGetX', label: 'Buy Y and Get X' },
    { value: 'FreeShipping', label: 'Free Shipping' }
  ]);
};

// Get all usage limit types (static data)
export const getUsageLimitTypes = () => {
  return Promise.resolve([
    { value: 'total', label: 'Limit overall uses' },
    { value: 'per_user', label: 'One time use per user' }
  ]);
};

// Get all reward types (static data)
export const getRewardTypes = () => {
  return Promise.resolve([
    { value: 'product_discount', label: 'Product Discount' },
    { value: 'order_discount', label: 'Order Discount' },
    { value: 'free_product', label: 'Free Product' },
    { value: 'free_shipping', label: 'Free Shipping' }
  ]);
};

// Get all rule types (static data)
export const getRuleTypes = () => {
  return Promise.resolve([
    { value: 'minimum_order_value', label: 'Minimum Order Value' },
    { value: 'minimum_quantity', label: 'Minimum Quantity' },
    { value: 'product_based', label: 'Product Based' },
    { value: 'category_based', label: 'Category Based' }
  ]);
};


export default api;

