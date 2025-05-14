// src/pages/brands/EditBrand.jsx
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./EditBrand.css";

const EditBrand = ({ brandId, onUpdateBrand, onClose }) => {
  const [brand, setBrand] = useState({
    brand_name: "",
    brand_description: "",
    brand_image_url: null,
  });

  useEffect(() => {
    if (brandId) {
      fetchBrandData();
    }
  }, [brandId]);

  const fetchBrandData = async () => {
    try {
      const response = await api.get(`/brands/${brandId}`);
      setBrand({
        brand_name: response.data.brand_name,
        brand_description: response.data.brand_description,
        brand_image_url: response.data.brand_image_url, // Keep existing image URL
      });
    } catch (error) {
      console.error("Error fetching brand:", error);
      toast.error("Failed to load brand data");
    }
  };

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
      brand_image_url: file, // Store file
    }));
  };


  const handleSaveChanges = async () => {

    const formData = new FormData();
    formData.append("brand_name", brand.brand_name);
    formData.append("brand_description", brand.brand_description);

    // Append file only if a new image is selected
    if (brand.brand_image_url instanceof File) {
      formData.append("brand_image_url", brand.brand_image_url);
    }

    try {
      const response = await api.put(`/brands/${brandId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpdateBrand(response.data);
      toast.success("Brand updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand");
    }
  };

  const handleCancel = () => {
    fetchBrandData(); // Reset form values
  };

  return (
    <div className="edit-brand-modal-overlay">
      <div className="edit-brand-modal-container">
        <h2>Edit Brand</h2>
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
            <label htmlFor="brand_image_url">Upload Brand Image:</label>
            <input
               type="file"
               id="brand_image_url"
               accept="image/*"
               onChange={handleFileChange}
            />
            </div>
          <div className="form-actions">
            <button type="button" onClick={handleSaveChanges}>Save</button>
            <button type="button" onClick={handleCancel}>Reset</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditBrand.propTypes = {
  brandId: PropTypes.string.isRequired,
  onUpdateBrand: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditBrand;
