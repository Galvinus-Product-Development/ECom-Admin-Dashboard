import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import './EditCategory.css';

const EditCategory = ({ categoryId, onUpdateCategory, onClose }) => {  
  const [category, setCategory] = useState({  
    category_name: "",  
    parent_category_id: "",  
    status: "active",   
    // Add any other relevant fields  
  });  
  const [parentCategories, setParentCategories] = useState([]);


  useEffect(() => {  
    if (categoryId) {
    fetchCategoryData(); 
    fetchParentCategories();
    } 
    
  }, [categoryId]);  

  const fetchCategoryData = async () => {  
    try {
      const response = await api.get(`/product-categories/${categoryId}`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Failed to load category data");
    }
  };

  const fetchParentCategories = async () => {
    try {
      const response = await api.get("/product-categories"); // Fetch all categories
      setParentCategories(response.data);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleInputChange = (e) => {  
    setCategory({ ...category, [e.target.name]: e.target.value });  
  };  

  const handleSaveChanges = async () => {  
    try {
      const updatedCategory = { 
        ...category,
        parent_category_id: category.parent_category_id || null,
        status: category.status === "active" ? "active" : "inactive",
      };
      await api.put(`/product-categories/${categoryId}`, updatedCategory);
      onUpdateCategory(updatedCategory); // Update the category list in parent component
      toast.success("Category updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };  

  const handleCancel = () => {  
    fetchCategoryData(); // Reset to original values
  };  
 

  return ( 
    <div className="edit-category-modal-overlay">
    <div className="edit-category-modal-container">  
      <h2>Edit Category</h2>  
      <form>  
        <div className="form-group">  
          <label htmlFor="category_name">Name:</label>  
          <input  
            type="text"  
            id="category_name"  
            name="category_name"  
            value={category.category_name}  
            onChange={handleInputChange}  
            required  
          />  
        </div>  
        <div className="form-group">  
          <label htmlFor="parent_category_id">Parent Category:</label>  
          <select  
            id="parent_category_id"  
            name="parent_category_id"  
            value={category.parent_category_id || ""}  
            onChange={handleInputChange}  
            required  
          >  
            <option value="">No Parent (Top-Level Category)</option>  
            {parentCategories.map((pc) => (
              <option key={pc.product_category_id} value={pc.product_category_id}>
    {pc.category_name || "Unnamed Category"}</option>
              ))} 
          </select>  
        </div>  
        <div className="form-group">  
          <label htmlFor="status">Status:</label>  
          <select 
            
            id="status"  
            name="status"  
            value={category.status}
            onChange={handleInputChange}
          >  
           <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>  
        
        {/* Add more form fields as needed */}  
        <div className="form-actions">  
          <button type="button" onClick={handleSaveChanges}>  
            Save  
          </button>  
          <button type="button" onClick={handleCancel}>Reset</button> 
          <button type="button" onClick={onClose}>  
            Cancel  
          </button>  
        </div>  
      </form>  
    </div>  
    </div> 
  );  
};  

EditCategory.propTypes = {
    categoryId: PropTypes.string.isRequired, 
    onUpdateCategory: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default EditCategory;  