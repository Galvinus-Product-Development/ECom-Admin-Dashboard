import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProductDetails();
  }, [productId]);


  
  const loadProductDetails = async () => {
    try {
      // Fetch product data
      const response = await fetchProductById(productId);
      const { data } = response;
      setProduct(data?.data?.product || {});
      setProductItems(data?.data?.productItems || []);
      
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product || Object.keys(product).length === 0) return <p>Product not found or failed to load.</p>;

  return (
    <div className="product-details-container">
        < div className="product-details-box">
        <h1>PRODUCT DETAILS: </h1>
      <h2>{product?.product_name || "Product Name Not Available"}</h2>
      <p><strong>Description:</strong> {product?.product_description || "No Description Available"}</p>
      <p><strong>Category:</strong> {product?.ProductCategory?.category_name || "N/A"}</p>
      <p><strong>Brand:</strong> {product?.Brand?.brand_name || "N/A"}</p>
      <p><strong>Status:</strong> {product?.status || "N/A"}</p>

      <h3>Product Variants</h3>
      
        <table className="product-variants-table">
          <thead>
            <tr>
            <th>Sr. No.</th>
            <th>Variant ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Original Price</th>
              <th>Discount (%)</th>
              <th>Sale Price</th>
              <th>Stock</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {productItems?.map((item, index) => (
              <tr key={item.product_item_id}>
                 <td>{index + 1}</td>
                <td>{item.product_item_id}</td>
                <td>{item.Colour?.colour_name || "N/A"}</td>
                <td>{item.SizeOption?.size_name || "N/A"}</td>
                <td>${item.original_price}</td>
                <td>{item.discount_applicable}%</td>
                <td>${item.sale_price}</td>
                <td>{item.qty_in_stocks}</td>
                <td>
                {item.ProductImages?.length > 0 ? (
                  <div className="images-container">
                    {item.ProductImages.map((image) => (
                      <img
                        key={image.image_id}
                        src={image.image_url}
                        alt={`Product Variant ${item.product_item_id}`}
                        className="variant-image-thumbnail"
                      />
                    ))}
                  </div>
                ) : (
                  <span>No Images</span>
                )}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="submit-product-button" onClick={() => navigate('/products')}>To Product Page</button>
    </div>
    </div>
  );
};

export default ProductDetails;
