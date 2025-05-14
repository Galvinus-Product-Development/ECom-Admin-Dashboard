import axios from "axios";

// Set your backend API base URL
const API_BASE_URL = "http://localhost:5001/api/v1"; 

const api = axios.create({
    baseURL: API_BASE_URL,
  });

  //  PRODUCT APIs 

// Fetch all products
export const fetchProducts = () => api.get("/products");

// Fetch a single product by ID
export const fetchProductById = (productId) => api.get(`/products/${productId}`);

// Fetch available product statuses (e.g., available, out of stock, discontinued)
export const fetchProductStatuses = () => api.get("/products/product-statuses");

// Create a new product
export const createProduct = (productData) => api.post("/products", productData);

// Update a product by ID
export const updateProduct = (productId, productData) => api.put(`/products/${productId}`, productData);

// Delete a product (soft delete)
export const deleteProduct = (productId) => api.delete(`/products/${productId}`);

// Restore a deleted product
export const restoreProduct = (productId) => api.patch(`/products/${productId}/restore`);


//  PRODUCT ITEM (VARIANT) APIs 

// Fetch all variants for a product
export const fetchProductItems = (productId) => api.get(`/product-items/product/${productId}`);

// Fetch a specific product variant by ID
export const fetchProductItemById = (productItemId) => api.get(`/product-items/item/${productItemId}`);

// Add a new variant to a product
export const addProductItem = (productId, variantData) => api.post(`/product-items/${productId}`, variantData);

// Update a variant by ID
export const updateProductItem = (productItemId, variantData) => api.put(`/product-items/${productItemId}`, variantData);

// Delete a variant by ID
export const deleteProductItem = (productItemId) => api.delete(`/product-items/${productItemId}`);


//PRODUCT IMAGE APIs 

// Upload images for a specific product variant (Up to 5 images)
export const uploadProductImages = (productItemId, images) => {
    const formData = new FormData();
    images.forEach(image => {
        formData.append("images", image);
    });
    return api.post(`/product-images/${productItemId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

// Retrieve all images for a specific product variant
export const fetchProductImages = (productItemId) => api.get(`/product-images/${productItemId}`);

// Delete a specific image by its ID
export const deleteProductImage = (imageId) => api.delete(`/product-images/${imageId}`);

 
// Category API functions
export const fetchCategories = () => api.get("/product-categories"); // Fetch all categories
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

// Colour API functions
export const fetchColours = () => api.get("/colours"); // Fetch all colours
export const fetchColourById = (id) => api.get(`/colours/${id}`); // Fetch colour by ID
export const createColour = (colourData) => api.post("/colours", colourData); // Create a new colour
export const updateColour = (id, colourData) => api.put(`/colours/${id}`, colourData); // Update colour
export const deleteColour = (id) => api.delete(`/colours/${id}`); // Soft delete colour
export const restoreColour = (id) => api.patch(`/colours/${id}/restore`); // Restore deleted colour

//SIZE CATEGORIES API
export const fetchSizeCategories = () => api.get("/size-categories");
export const addSizeCategory = (data) => api.post("/size-categories", data);
export const updateSizeCategory = (id, data) => api.put(`/size-categories/${id}`, data);
export const deleteSizeCategory = (id) => api.delete(`/size-categories/${id}`);
//SIZE OPTIONS API
export const fetchSizeOptions = (categoryId) => {
  const url = categoryId ? `/size-options?category_id=${categoryId}` : "/size-options";
  return api.get(url);
};
export const addSizeOption = (data) => api.post("/size-options", data);
export const updateSizeOption = (id, data) => api.put(`/size-options/${id}`, data);
export const deleteSizeOption = (id) => api.delete(`/size-options/${id}`);

export default api;

/*
// Products API functions 
export const fetchProducts = () => api.get("/products");
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post("/products", productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const restoreProduct = (id) => api.patch(`/products/${id}/restore`);

// Product Items API functions
export const fetchProductItems = (productId) => api.get(`/product-items/product/${productId}`);
export const createProductItem = (productItemData) => api.post("/product-items", productItemData);
export const updateProductItem = (itemId, productItemData) => api.put(`/product-items/${itemId}`, productItemData);
export const deleteProductItem = (itemId) => api.delete(`/product-items/${itemId}`);


export const createProductWithImages = async (productData, images) => {
  try {
    // Step 1: Create the Product
    const response = await api.post("/products", productData, {
      headers: { "Content-Type": "application/json" },
    });

    const { product_item_id } = response.data; // Destructure product_item_id from response

    if (!product_item_id) {
      throw new Error("Product item ID not returned from the server.");
    }

    console.log("✅ Product Created, ID:", product_item_id);

    // Step 2: Upload Images for the Product Item
    if (images && images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      const uploadResponse = await api.post(`/products/${product_item_id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Images Uploaded Successfully:", uploadResponse.data);
    }

  } catch (error) {
    console.error("❌ Error in Creating Product or Uploading Images:", error.message);
  }
};

 // Product API functions
 export const fetchProducts = () => api.get("/products"); // Fetch all products
 export const fetchProductById = (productId) => api.get(`/products/${productId}`); // Fetch product by ID
 export const createProduct = (productData) => api.post("/products", productData, {
   headers: { "Content-Type": "application/json" },
 }); // Create new product
 export const updateProduct = (productId, productData) => api.put(`/products/${productId}`, productData); // Update product
 export const deleteProduct = (productId) => api.delete(`/products/${productId}`); // Delete product
 export const restoreProduct = (productId) => api.patch(`/products/${productId}/restore`); // Restore product
 
 
 // Product Images API
 export const uploadProductImages = (productItemId, images) => {
   const formData = new FormData();
   images.forEach((image) => formData.append("images", image));
 
   return api.post(`/products/${productItemId}/images`, formData, {
     headers: { "Content-Type": "multipart/form-data" },
   });
 };
 
 export const fetchProductImages = (productItemId) =>
   api.get(`/products/${productItemId}/images`); // Fetch product images
 
 export const deleteProductImage = (imageId) =>
   api.delete(`/products/images/${imageId}`); // Delete a specific product image
 
 // Product Status API
 export const fetchProductStatuses = () => api.get("/products/product-statuses"); // Fetch product statuses
 */