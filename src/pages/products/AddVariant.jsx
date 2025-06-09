import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductItem, fetchColours, fetchSizeOptions, uploadProductImages } from "../../services/api";
import './AddVariant.css';

const AddVariant = () => {
    const { productId } = useParams();
    console.log("Product ID in AddVariant:", productId);
    const navigate = useNavigate();
    const [colours, setColours] = useState([]);
    const [sizes, setSizes] = useState([]); 
    const [variantData, setVariantData] = useState({
        colour_id: "",
        size_id: "", 
        original_price: "",
        discount_applicable: 0,
        sale_price: "",
        qty_in_stocks: ""
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [productItemId, setProductItemId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            const coloursResponse = await fetchColours();
            const sizesResponse = await fetchSizeOptions();
            setColours(coloursResponse.data);
            setSizes(sizesResponse.data);
        };
        fetchInitialData();
    }, []);

    const handleChange = (e) => {
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

    const handleVariantSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await addProductItem(productId, variantData);
            const newProductItemId = response.data.data.product_item_id;
            setProductItemId(newProductItemId); // Store the generated product_item_id for uploading images
           // onVariantAdded(); // Notify parent component about the added variant
            setImageUploadSuccess(false);
            toast.success("Product variant created successfully!");
            console.log("Product Variant Created Successfully:", newProductItemId);
            
        } catch (error) {
            console.error("Error adding variant:", error);
            toast.error("Failed to create product variant.");
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
        <div className="add-variant-container">
            <h1>Add Variants: </h1>
            <form  className="variant-form" onSubmit={handleVariantSubmit}>
                <select name="colour_id" value={variantData.colour_id} onChange={handleChange} required>
                    <option value="">Select Colour</option>
                    {colours.map((colour) => (
                        <option key={colour.colour_id} value={colour.colour_id}>{colour.colour_name}</option>
                    ))}
                </select>

                <select name="size_id" value={variantData.size_id} onChange={handleChange} required>
                    <option value="">Select Size</option>
                    {sizes.map((size) => (
                        <option key={size.size_id} value={size.size_id}>{size.size_name}</option>
                    ))}
                </select>

                <input type="number" name="original_price" placeholder="Original Price" value={variantData.original_price} onChange={handleChange} required />
                <input type="number" name="discount_applicable" placeholder="Discount (%)" value={variantData.discount_applicable} onChange={handleChange} />
                <input type="number" name="sale_price" placeholder="Sale Price" value={variantData.sale_price} onChange={handleChange} required />
                <input type="number" name="qty_in_stocks" placeholder="Stock Quantity" value={variantData.qty_in_stocks} onChange={handleChange} required />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding Variant..." : "Add Variant"}
                </button>
            </form>

            {productItemId && !imageUploadSuccess &&(
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
                <div className="button-group">
                <button  className="add-variant-button" onClick={() => navigate(`/products/add-variant/${productId}`)}>Add Variant</button>
                <button className="submit-product-button" onClick={() => navigate('/products')}>Submit Product</button>
            </div>
            )}
        </div>
    );
};

AddVariant.propTypes = {
   // productId: PropTypes.number.isRequired,
   // onVariantAdded: PropTypes.func.isRequired,
    //onSubmitComplete: PropTypes.func.isRequired,
};


export default AddVariant;
