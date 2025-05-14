import { useEffect, useState } from "react";
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

                      {/*  {variantImages[variant.product_item_id]?.map(image => (
                            <div key={image.image_id}>
                                <img src={image.image_url} alt="Variant" />
                                <button onClick={() => handleDeleteImage(variant.product_item_id, image.image_id)}>Delete</button>
                            </div>
                        ))}
                        
                        {variantImages[variant.product_item_id]?.length < 5 && (
                            <input type="file" onChange={(e) => handleImageUpload(variant.product_item_id, e.target.files[0])} />
                        )}
                            */}