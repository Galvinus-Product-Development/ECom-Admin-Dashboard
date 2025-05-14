// src/pages/brands/NewBrand.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./NewBrand.css";

const NewBrand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const openedFrom = location.state?.openedFrom || "Direct";

  const [brand, setBrand] = useState({
    brand_name: "",
    brand_description: "",
    brand_image_url: null,
  });

  //const [brandImageFile, setBrandImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
     setBrand((prev) => ({
      ...prev,
      brand_image_url: file, // Store file directly
    }));
  };

  const handleSaveBrand = async () => {
    if (!brand.brand_image_url) {
      toast.error("Please upload a brand image");
      return;
    }

    const formData = new FormData();
    formData.append("brand_name", brand.brand_name);
    formData.append("brand_description", brand.brand_description);
    formData.append("brand_image_url", brand.brand_image_url); 
    try {
      const response = await api.post("/brands", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Brand added successfully");
      console.log("Brand added successfully", response.data);
      // Optionally navigate back to brand management page
      navigate('/brands');
    } catch (error) {
      console.error("Error adding brand:", error.response?.data);
      toast.error("Failed to add brand");
    }
  };

  return (
    <div className="new-brand-container">
      <h2>Add New Brand</h2>
      <p className="opened-from-text">Opened from: {openedFrom}</p>
      <form>
        <div className="form-group">
          <label htmlFor="brand_name">Brand Name:</label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            value={brand.brand_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand_description">Description:</label>
          <textarea
            id="brand_description"
            name="brand_description"
            value={brand.brand_description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="form-group">
            <label htmlFor="brand_image_url">Upload Brand Image: </label>
            <input
               type="file"
               id="brand_image_url"
               accept="image/*"
               onChange={handleFileChange}
            />
            </div>
        <div className="form-actions">
          <button type="button" onClick={handleSaveBrand}>Save Brand</button>
          <button type="button" onClick={() => navigate('/brands')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewBrand;
