import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createProduct, fetchBrands, fetchCategories, fetchColours, fetchSizeOptions, uploadProductImages } from "../../services/api";
import './NewProduct.css';

const NewProduct = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colours, setColours] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [productData, setProductData] = useState({
        product_name: "",
        product_description: "",
        product_category_id: "",
        brand_id: "",
        status: "available"
    });
    const [variantData, setVariantData] = useState({
        colour_id: "",
        size_id: "",
        original_price: "",
        discount_applicable: 0,
        sale_price: "",
        qty_in_stocks: ""
    });
    const [productId, setProductId] = useState(null);
    const [productItemId, setProductItemId] = useState(null); // Store product_item_id of first variant
    const [selectedImages, setSelectedImages] = useState(Array(5).fill(null));
    const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
        try {
            console.log("Fetching initial data...");
            const [brandsResponse, categoriesResponse, coloursResponse, sizesResponse] = await Promise.all([
                fetchBrands(), fetchCategories(), fetchColours(), fetchSizeOptions()
            ]);

            setBrands(brandsResponse.data);
            setCategories(categoriesResponse.data);
            setColours(coloursResponse.data);
            setSizes(sizesResponse.data);
            //toast.success("Initial data fetched successfully!");
        } 
        catch (error) {
            console.error("Error fetching initial data:", error);
            toast.error("Failed to fetch initial data.");
        }
        };
        fetchInitialData();
    }, []);

    const handleProductChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleVariantChange = (e) => {
        setVariantData({ ...variantData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, index) => {
        const files = e.target.files;
        if (files && files[0]) {
            const updatedImages = [...selectedImages];
            updatedImages[index] = files[0];
            setSelectedImages(updatedImages);
            console.log(`Image selected for index ${index}:`, files[0].name);
            toast.info(`Image selected: ${files[0].name}`);        
        }
    };

    
    const handleRemoveImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages[index] = null;
        setSelectedImages(updatedImages);
        console.log(`Image removed from index ${index}`);
        toast.info(`Image removed from slot ${index + 1}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Creating product and initial variant...");
        try {
            const requestData = { productData, variantData };
            const response = await createProduct(requestData);
            const newProductId = response.data.data.product.product_id;
            const newProductItemId = response.data.data.product_item.product_item_id;

            setProductId(newProductId); // Set productId for adding variants
            setProductItemId(newProductItemId); 
            toast.success("Product and variant created successfully!");
            console.log("Product and Variant Created Successfully:", newProductId, newProductItemId);
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!productItemId) {
            toast.error("Please create a variant first.");
            return;
        }
        console.log("Uploading images...");
        const formData = new FormData();
        for (let i = 0; i < selectedImages.length; i++) {
            if (selectedImages[i]) {
                formData.append("images", selectedImages[i]);
            }
        }
        if (!formData.has("images")) {
            toast.error("Please select at least one image to upload.");
            return;
        }

        try {
            await uploadProductImages(productItemId, formData);
            setImageUploadSuccess(true);
            toast.success("Images uploaded successfully!");
            console.log("Images uploaded successfully!");
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error("Failed to upload images.");
        }
    };


    return (
      <div className="new-product-container">
        <h1>New Product</h1>
        <form className="new-product-form" onSubmit={handleSubmit}>
            <div className="product-details-section">
            <h2>Product Details</h2>
            <div className="form-group">
            <input type="text" name="product_name" placeholder="Product Name" value={productData.product_name} onChange={handleProductChange} required />

            <textarea name="product_description" placeholder="Product Description" value={productData.product_description} onChange={handleProductChange} required />

            <select name="brand_id" value={productData.brand_id} onChange={handleProductChange} required>
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                ))}
            </select>

            <select name="product_category_id" value={productData.product_category_id} onChange={handleProductChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.product_category_id} value={category.product_category_id}>{category.category_name}</option>
                ))}
            </select>

            <select name="status" value={productData.status} onChange={handleProductChange}>
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
            </div>
            </div>
        <div className="variant-details-section">
        <h2>Initial Variant Details</h2>
        <div className="form-group">
            <select name="colour_id" value={variantData.colour_id} onChange={handleVariantChange} required>
                    <option value="">Select Colour</option>
                    {colours.map((colour) => (
                        <option key={colour.colour_id} value={colour.colour_id}>{colour.colour_name}</option>
                    ))}
                </select>

                <select name="size_id" value={variantData.size_id} onChange={handleVariantChange} required>
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                        <option key={size.size_id} value={size.size_id}>{size.size_name}</option>
                    ))}
                </select>

                <input type="number" name="original_price" placeholder="Original Price" value={variantData.original_price} onChange={handleVariantChange} required />
                <input type="number" name="discount_applicable" placeholder="Discount (%)" value={variantData.discount_applicable} onChange={handleVariantChange} />
                <input type="number" name="sale_price" placeholder="Sale Price" value={variantData.sale_price} onChange={handleVariantChange} required />
                <input type="number" name="qty_in_stocks" placeholder="Stock Quantity" value={variantData.qty_in_stocks} onChange={handleVariantChange} required />
                </div>
              </div>  

            <button type="submit" className="submit-button" disabled={loading}>{loading ? "Creating Product..." : "Create Product"}</button>
       </form>

       {productItemId && !imageUploadSuccess && (
                <form className="image-upload-section" onSubmit={handleImageUpload}>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="image-input-container">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, index)}
                            />
                            {selectedImages[index] && (
                            <div className="image-preview">
                                <p>{selectedImages[index].name}</p>
                                <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                            </div>
                        )}
                        </div>
                    ))}
                    <button type="submit">Upload Images (Max 5)</button>
                </form>
            )}


        {imageUploadSuccess && productId && (
            <div className="add-variant-section">
              {/*  <AddVariant 
                    productId={productId} 
                    onVariantAdded={() => alert("Variant added successfully!")} 
                    onSubmitComplete={() => alert("Product submitted successfully!")}
                 />*/}
                    <div className="button-group">
                        <button  className="add-variant-button" onClick={() => navigate(`/products/add-variant/${productId}`)}>Add Variant</button>
                        <button className="submit-product-button" onClick={() => navigate('/products')}>Submit Product</button>
                    </div>
                    </div>
        )};
        </div>
    );
}                               



export default NewProduct;

