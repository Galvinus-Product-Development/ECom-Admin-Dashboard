import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { addSizeCategory, deleteSizeCategory, fetchSizeCategories, updateSizeCategory } from "../../services/api";
import "./SizeCategoryManagement.css";

const SizeCategoryManagement = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadCategories = async () => {
    try {
      const response = await fetchSizeCategories();
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching size categories:", error);
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
     loadCategories();
  }, []);

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
try{
    if (editingCategory) {
      await updateSizeCategory(editingCategory.category_id, { category_name: categoryName });
      //setCategories(categories.map(cat => cat.category_id === editingCategory.category_id ? { ...cat, category_name: categoryName } : cat));
      //setEditingCategory(null);
    } else {
      await addSizeCategory({ category_name: categoryName });
      //setCategories([...categories, response.data]);
    }

    setCategoryName("");
    setEditingCategory(null);
    setShowEditModal(false);
    loadCategories();
  }
  catch (error) {
    console.error("Error saving size category:", error);
  }

  };

  const handleDelete = async (category_id) => {
    try{
    await deleteSizeCategory(category_id);
    loadCategories();
    //setCategories(categories.filter(cat => cat.category_id !== category_id));
    } catch (error) {
      console.error("Error deleting size category:", error);
    }

  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category_name); // Pre-fill category name
    setShowEditModal(true);
  };

  return (
    <div className="size-category-management">
      <h2>Size Categories</h2>
      <form className="size-category-form" onSubmit={handleAddOrUpdateCategory}>
        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter Category Name" required />
        <button type="submit">{editingCategory ? "Update" : "Add"}</button>
      </form>

      {loading ? (
        <p>Loading categories...</p>
      ) : (

      <ul className="size-category-list">
        {categories.length > 0 ? (
        categories.map((category) => (
          <li key={category.category_id}>
            <span onClick={() => onCategorySelect(category.category_id)}>
            {category.category_name}</span>
            <button className="edit-btn" onClick={() => openEditModal(category)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(category.category_id)}>Delete</button>
            <button className="add-options-btn" onClick={() => onCategorySelect(category.category_id)}>Add Size Options</button>
          </li>
         ))
        ) : (
          <p>No categories found.</p>
        )}
      </ul>
       )}

       {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Size Category</h3>
            <form onSubmit={handleAddOrUpdateCategory}>
              <input 
                type="text" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                required 
              />
              <div className="modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

SizeCategoryManagement.propTypes = {
  onCategorySelect: PropTypes.func.isRequired, 
};

export default SizeCategoryManagement;
