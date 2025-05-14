import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import './SubcategoriesInheritance.css';

const SubcategoriesInheritance = ({ categoryId, onUpdateInheritance }) => {  
  const [inheritAccessControl, setInheritAccessControl] = useState(true);  

  useEffect(() => {  
    // Fetch the subcategories inheritance setting for the given categoryId  
    fetchInheritanceSettings();  
  }, [categoryId]);  

  // Fetch subcategories inheritance setting
  const fetchInheritanceSettings = async () => {  
    try {  
      const response = await api.get(`/product-categories/${categoryId}/inheritance`);
      setInheritAccessControl(response.data.inheritAccessControl);
    } catch (error) {  
      console.error('Error fetching subcategories inheritance setting:', error);  
      toast.error("Failed to load inheritance settings.");
    }  
  };  

  const handleInheritanceChange = (e) => {  
    setInheritAccessControl(e.target.checked);  
  };  

  // Save updated inheritance setting
  const handleSaveInheritanceSettings = async () => {  
    try {  
      await api.put(`/product-categories/${categoryId}/inheritance`, { inheritAccessControl });
      toast.success("Inheritance settings updated successfully!");
      onUpdateInheritance(); // Notify parent component
    } catch (error) {  
      console.error('Error updating inheritance setting:', error);  
      toast.error("Failed to update inheritance settings.");
    }  
  };  

  return (  
    <div className="subcategories-inheritance-container">  
      <h2>Subcategories Inheritance</h2>  
      <div className="form-group">  
        <label htmlFor="inheritAccessControl">  
          <input  
            type="checkbox"  
            id="inheritAccessControl"  
            checked={inheritAccessControl}  
            onChange={handleInheritanceChange}  
          />  
          Inherit access control settings from parent category  
        </label>  
      </div>  
      <div className="form-actions">  
        <button type="button" onClick={handleSaveInheritanceSettings}>  
          Save  
        </button>  
      </div>  
    </div>  
  );  
};  

SubcategoriesInheritance.propTypes = {  
    categoryId: PropTypes.string.isRequired, // UUID as string  
    onUpdateInheritance: PropTypes.func.isRequired,  
  };  

export default SubcategoriesInheritance;  