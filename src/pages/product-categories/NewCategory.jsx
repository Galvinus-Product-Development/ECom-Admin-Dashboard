//import axios from 'axios';
//import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import './NewCategory.css';

const NewCategory = () => { 

  const navigate = useNavigate();
  const location = useLocation();
    const openedFrom = location.state?.openedFrom; 

    console.log(`NewCategory opened from: ${openedFrom}`);

  const [newCategory, setNewCategory] = useState({  
    category_name: "",  
    parent_category_id: "",  
    status: "active" 
    // Add any other relevant fields here  
  });  
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/product-categories"); // Fetch all categories
      setAllCategories(response.data);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
        ...prev,
        [name]: value
    }));
}; 

  const handleSaveCategory = async () => {  
    try {
      const categoryData = { 
        category_name: newCategory.category_name, // Match backend field
        parent_category_id: newCategory.parent_category_id || null, 
        status: newCategory.status
      };
      console.log("Sending category data:", categoryData);
      const response = await api.post("/product-categories", categoryData);
      console.log("Response from backend:", response.data);

      //onAddCategory(response.data); // Update categories in parent component
      toast.success("Category added successfully");
 
      setNewCategory({ category_name: "", parent_category_id: "", status: "active" }); // Reset form
      navigate('/product-categories'); // Redirect to categories page
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };  

  /*const handleCancel = () => {  
    setNewCategory({ category_name: "", parent_category_id: "", status: "active" });  
  }; 
  //console.log(categories);*/


  return (  
    <div className="new-category-container">  
      <h2>Add New Category</h2>  
      <form>  
        <div className="form-group">  
          <label htmlFor="category_name">Category Name:</label>  
          <input  
            type="text"  
            id="category_name"  
            name="category_name"  
            value={newCategory.category_name}  
            onChange={handleChange}  
            required  
          />  
        </div>  
        <div className="form-group">  
          <label htmlFor="parent_category_id">Parent Category:</label>  
          <select  
            id="parent_category_id"  
            name="parent_category_id"  
            value={newCategory.parent_category_id}  
            onChange={handleChange}  
             
          >  
            <option value="">None</option>  
            {/* Populate the options with available parent categories */}  
            {allCategories.map(category => (
              <option key={category.product_category_id} value={category.product_category_id}>
                {category.category_name}</option>
            ))}  
          </select>  
        </div>  
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select  
              id="status" 
              name="status"  
              value={newCategory.status}
              onChange={handleChange}>
          <option value="active">Active</option>  
            <option value="inactive">Inactive</option>  
          </select> 

        </div>
        {/* Add more form fields as needed */}  
        <div className="form-actions">  
          <button type="button" onClick={handleSaveCategory}>  
            Save Category
          </button>  
          <button type="button" onClick={() => navigate('/product-categories')}>  
            Cancel  
          </button>  
        </div>  
      </form>  
    </div>  
  );  
}; 
/*
NewCategory.propTypes = {
    onAddCategory: PropTypes.func.isRequired,
    //categories: PropTypes.array.isRequired,
  };
*/
export default NewCategory;  