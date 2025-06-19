import { Edit, Plus, Search, Trash2, X } from "lucide-react";
import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useState } from "react";
import {
  createColour,
  createSize,
  deleteColour,
  deleteSize,
  fetchCategories,
  fetchColours,
  fetchSizes,
  updateColour,
  updateSize
} from '../../services/api';
import "./Attributes.css";

// Separate Modal Components to prevent re-creation
const ColorModal = memo(({ 
  isOpen, 
  editingColorId, 
  colorForm, 
  onClose, 
  onSave, 
  onNameChange, 
  onCodeChange,
  isLoading 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">
            {editingColorId ? "Edit Color" : "Add Color"}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="modal-close-button"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Color Name</label>
            <input
              type="text"
              value={colorForm.colour_name}
              onChange={onNameChange}
              className="form-input"
              placeholder="Enter color name"
              autoFocus
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Color Code</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorForm.colour_code}
                onChange={onCodeChange}
                className="h-10 w-10 cursor-pointer rounded-md border border-gray-300"
                disabled={isLoading}
              />
              <input
                type="text"
                value={colorForm.colour_code}
                onChange={onCodeChange}
                className="form-input flex-1"
                placeholder="#FFFFFF"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!colorForm.colour_name || isLoading}
            className="save-button"
          >
            {isLoading ? 'Saving...' : (editingColorId ? "Update" : "Add")} Color
          </button>
        </div>
      </div>
    </div>
  );
});

ColorModal.displayName = 'ColorModal';

ColorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  editingColorId: PropTypes.string,
  colorForm: PropTypes.shape({
    colour_name: PropTypes.string.isRequired,
    colour_code: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

const SizeModal = memo(({ 
  isOpen, 
  editingSizeId, 
  sizeForm, 
  productCategories,
  onClose, 
  onSave, 
  onNameChange, 
  onCategoryChange,
  onSortOrderChange,
  isLoading 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">
            {editingSizeId ? "Edit Size" : "Add Size"}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="modal-close-button"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Size Name</label>
            <input
              type="text"
              value={sizeForm.size_name}
              onChange={onNameChange}
              className="form-input"
              placeholder="Enter size name"
              autoFocus
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Product Category</label>
            <select
              value={sizeForm.product_category_id}
              onChange={onCategoryChange}
              className="form-select"
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              {productCategories.map(category => (
                <option key={category.product_category_id} value={category.product_category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Sort Order</label>
            <input
              type="number"
              value={sizeForm.sort_order}
              onChange={onSortOrderChange}
              className="form-input"
              min="1"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!sizeForm.size_name || !sizeForm.product_category_id || isLoading}
            className="save-button"
          >
            {isLoading ? 'Saving...' : (editingSizeId ? "Update" : "Add")} Size
          </button>
        </div>
      </div>
    </div>
  );
});

SizeModal.displayName = 'SizeModal';

SizeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  editingSizeId: PropTypes.string,
  sizeForm: PropTypes.shape({
    size_name: PropTypes.string.isRequired,
    product_category_id: PropTypes.string.isRequired,
    sort_order: PropTypes.number.isRequired
  }).isRequired,
  productCategories: PropTypes.arrayOf(
    PropTypes.shape({
      product_category_id: PropTypes.string.isRequired,
      category_name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortOrderChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

const AttributesPage = () => {
  // State management
  const [productCategories, setProductCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showColorModal, setShowColorModal] = useState(false);
  const [editingColorId, setEditingColorId] = useState(null);
  const [colorForm, setColorForm] = useState({
    colour_name: "",
    colour_code: "#000000"
  });
  const [colorLoading, setColorLoading] = useState(false);

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [editingSizeId, setEditingSizeId] = useState(null);
  const [sizeForm, setSizeForm] = useState({
    size_name: "",
    product_category_id: "",
    sort_order: 1
  });
  const [sizeLoading, setSizeLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("sizes");

  // Search states
  const [colorSearch, setColorSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");

  const validateDataStructure = (data, type) => {
    if (!Array.isArray(data)) {
      console.error(`Expected array for ${type}, got:`, data);
      return [];
    }
    
    // Add specific validation for each type
    if (type === 'colors') {
      return data.filter(item => 
        item.colour_id && item.colour_name && item.colour_code
      );
    }
    
    if (type === 'sizes') {
      return data.filter(item => 
        item.size_id &&
        item.size_name &&
        item.product_category_id 
      );
    }
    
    if (type === 'categories') {
      return data.filter(item => 
        item.product_category_id && item.category_name
      );
    }
    
    return data;
  };

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data sequentially with error handling for each
    let categoriesData = [];
    let colorsData = [];
    let sizesData = [];
    try {
      categoriesData = await fetchCategories();
    } catch (err) {
      console.error('Error loading categories:', err);
      setError(prev => [...prev, 'Failed to load categories.']);
    }
    
    try {
      colorsData = await fetchColours();
    } catch (err) {
      console.error('Error loading colors:', err);
      setError(prev => [...prev, 'Failed to load colors.']);
    }
    
    try {
      sizesData = await fetchSizes();
    } catch (err) {
      console.error('Error loading sizes:', err);
      setError(prev => [...prev, 'Failed to load sizes.']);
    }
    setProductCategories(validateDataStructure(categoriesData, 'categories'));
    setColors(validateDataStructure(colorsData, 'colors'));
    setSizeOptions(validateDataStructure(sizesData.map(size => ({
        ...size,
        product_category_id: size.product_category_id,
        category_name: size.category?.category_name || 
                     productCategories.find(c => c.product_category_id === size.product_category_id)?.category_name || 
                     'Uncategorized'
      })), 'sizes'));
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('Product Categories:', productCategories);
    console.log('Colors:', colors);
    console.log('Sizes:', sizeOptions);
  }, [productCategories, colors, sizeOptions]);

  // Color form handlers
  const handleColorNameChange = useCallback((e) => {
    setColorForm(prev => ({ ...prev, colour_name: e.target.value }));
  }, []);

  const handleColorCodeChange = useCallback((e) => {
    setColorForm(prev => ({ ...prev, colour_code: e.target.value }));
  }, []);

  // Size form handlers
  const handleSizeNameChange = useCallback((e) => {
    setSizeForm(prev => ({ ...prev, size_name: e.target.value }));
  }, []);

  const handleSizeCategoryChange = useCallback((e) => {
    setSizeForm(prev => ({ ...prev, product_category_id: e.target.value }));
  }, []);

  const handleSizeSortOrderChange = useCallback((e) => {
    setSizeForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 1 }));
  }, []);

  // Color modal handlers
  const handleAddColor = useCallback(() => {
    setColorForm({ colour_name: "", colour_code: "#000000" });
    setEditingColorId(null);
    setShowColorModal(true);
  }, []);

  const handleEditColor = useCallback((color) => {
    setColorForm({ 
      colour_name: color.colour_name, 
      colour_code: color.colour_code 
    });
    setEditingColorId(color.colour_id);
    setShowColorModal(true);
  }, []);

  const handleSaveColor = useCallback(async () => {
    try {
      setColorLoading(true);
      
      if (editingColorId) {
        const updatedColor = await updateColour(editingColorId, colorForm);
        setColors(prev => prev.map(color => 
          color.colour_id === editingColorId ? updatedColor : color
        ));
      } else {
        const newColor = await createColour(colorForm);
        setColors(prev => [...prev, newColor]);
      }
      
      setShowColorModal(false);
      setColorForm({ colour_name: "", colour_code: "#000000" });
      setEditingColorId(null);
    } catch (err) {
      console.error('Error saving color:', err);
      setError(err.response?.data?.message || 'Failed to save color');
    } finally {
      setColorLoading(false);
    }
  }, [editingColorId, colorForm]);

  const handleDeleteColor = useCallback(async (colorId) => {
    if (!window.confirm('Are you sure you want to delete this color?')) {
      return;
    }
    
    try {
      await deleteColour(colorId);
      setColors(prev => prev.filter(color => color.colour_id !== colorId));
    } catch (err) {
      console.error('Error deleting color:', err);
      setError(err.response?.data?.message || 'Failed to delete color');
    }
  }, []);

  const handleCloseColorModal = useCallback(() => {
    setShowColorModal(false);
    setColorForm({ colour_name: "", colour_code: "#000000" });
    setEditingColorId(null);
  }, []);

  // Size modal handlers
  const handleAddSize = useCallback(() => {
    setSizeForm({ size_name: "", product_category_id: "", sort_order: 1 });
    setEditingSizeId(null);
    setShowSizeModal(true);
  }, []);

  const handleEditSize = useCallback((size) => {
    setSizeForm({
      size_name: size.size_name,
      product_category_id: size.product_category_id,
      sort_order: size.sort_order
    });
    setEditingSizeId(size.size_id);
    setShowSizeModal(true);
  }, []);

  const handleSaveSize = useCallback(async () => {
    try {
      setSizeLoading(true);
      
      if (editingSizeId) {
        const updatedSize = await updateSize(editingSizeId, sizeForm);
        setSizeOptions(prev => prev.map(size => 
          size.size_id === editingSizeId ? {
            ...updatedSize,
            // Preserve category name if not in response
            category_name: updatedSize.category_name || 
                          size.category_name || 
                          productCategories.find(c => c.product_category_id === updatedSize.product_category_id)?.category_name ||
                          'Uncategorized'
          } : size
        ));
      } else {
        const newSize = await createSize(sizeForm);
        setSizeOptions(prev => [...prev, {
          ...newSize,
          category_name: productCategories.find(c => c.product_category_id === newSize.product_category_id)?.category_name ||
                        'Uncategorized'
        }]);
      }
      
      setShowSizeModal(false);
      setSizeForm({ size_name: "", product_category_id: "", sort_order: 1 });
      setEditingSizeId(null);
    } catch (err) {
      console.error('Error saving size:', err);
      setError(err.response?.data?.message || 'Failed to save size');
    } finally {
      setSizeLoading(false);
    }
  }, [editingSizeId, sizeForm, productCategories]);

  const handleDeleteSize = useCallback(async (sizeId) => {
    if (!window.confirm('Are you sure you want to delete this size?')) {
      return;
    }
    
    try {
      await deleteSize(sizeId);
      setSizeOptions(prev => prev.filter(size => size.size_id !== sizeId));
    } catch (err) {
      console.error('Error deleting size:', err);
      setError(err.response?.data?.message || 'Failed to delete size');
    }
  }, []);

  const handleCloseSizeModal = useCallback(() => {
    setShowSizeModal(false);
    setSizeForm({ size_name: "", product_category_id: "", sort_order: 1 });
    setEditingSizeId(null);
  }, []);

  // Filter functions
  const filteredColors = colors.filter(color =>
    color.colour_name.toLowerCase().includes(colorSearch.toLowerCase())
  );

  const filteredSizes = sizeOptions.filter(size =>
    size.size_name.toLowerCase().includes(sizeSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="attributes-container">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading attributes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="attributes-container">
      <div className="attributes-header">
        <h1 className="attributes-title">Product Attributes</h1>
        <p className="attributes-subtitle">Manage color and size variants for your products</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="attributes-tabs">
        <nav className="tab-nav">
          <button
            type="button"
            onClick={() => setActiveTab("sizes")}
            className={`tab-button ${activeTab === "sizes" ? "active" : ""}`}
          >
            Size Options
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("colors")}
            className={`tab-button ${activeTab === "colors" ? "active" : ""}`}
          >
            Color Options
          </button>
        </nav>
      </div>

      {/* Size Options Tab */}
      {activeTab === "sizes" && (
        <div>
          <div className="table-actions">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search sizes..."
                className="search-input"
                value={sizeSearch}
                onChange={(e) => setSizeSearch(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleAddSize}
              className="add-button"
            >
              <Plus size={16} />
              <span>Add Size</span>
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead className="table-attributes-header">
                <tr>
                  <th className="table-header-cell-attributes">Size Name</th>
                  <th className="table-header-cell-attributes">Category</th>
                  <th className="table-header-cell-attributes">Sort Order</th>
                  <th className="table-header-cell-attributes">Actions</th>
                </tr>
              </thead>
              <tbody className="custom-divide">
                {filteredSizes.map((size) => (
                  <tr key={size.size_id} className="table-attributes-row">
                    <td className="table-cell table-cell-text">
                      {size.size_name}
                    </td>
                    <td className="table-cell table-cell-muted">
                    {size.category_name || 'Uncategorized'}
                    </td>
                    <td className="table-cell table-cell-muted">
                      {size.sort_order}
                    </td>
                    <td className="table-cell">
                      <div className="action-buttons">
                        <button
                          type="button"
                          onClick={() => handleEditSize(size)}
                          className="action-button edit-button"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSize(size.size_id)}
                          className="action-button delete-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Color Options Tab */}
      {activeTab === "colors" && (
        <div>
          <div className="table-actions">
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search colors..."
                className="search-input"
                value={colorSearch}
                onChange={(e) => setColorSearch(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleAddColor}
              className="add-button"
            >
              <Plus size={16} />
              <span>Add Color</span>
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead className="table-attributes-header">
                <tr>
                  <th className="table-header-cell-attributes">Color Preview</th>
                  <th className="table-header-cell-attributes">Color Name</th>
                  <th className="table-header-cell-attributes">Color Code</th>
                  <th className="table-header-cell-attributes">Actions</th>
                </tr>
              </thead>
              <tbody className="custom-divide">
                {filteredColors.map((color) => (
                  <tr key={color.colour_id} className="table-attributes-row">
                    <td className="table-cell">
                      <div
                        className="color-preview"
                        style={{ backgroundColor: color.colour_code }}
                      />
                    </td>
                    <td className="table-cell table-cell-text">
                      {color.colour_name}
                    </td>
                    <td className="table-cell table-cell-muted">
                      {color.colour_code}
                    </td>
                    <td className="table-cell">
                      <div className="action-buttons">
                        <button
                          type="button"
                          onClick={() => handleEditColor(color)}
                          className="action-button edit-button"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteColor(color.colour_id)}
                          className="action-button delete-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <ColorModal
        isOpen={showColorModal}
        editingColorId={editingColorId}
        colorForm={colorForm}
        onClose={handleCloseColorModal}
        onSave={handleSaveColor}
        onNameChange={handleColorNameChange}
        onCodeChange={handleColorCodeChange}
        isLoading={colorLoading}
      />
      
      <SizeModal
        isOpen={showSizeModal}
        editingSizeId={editingSizeId}
        sizeForm={sizeForm}
        productCategories={productCategories}
        onClose={handleCloseSizeModal}
        onSave={handleSaveSize}
        onNameChange={handleSizeNameChange}
        onCategoryChange={handleSizeCategoryChange}
        onSortOrderChange={handleSizeSortOrderChange}
        isLoading={sizeLoading}
      />
    </div>
  );
};

export default AttributesPage;
// import { Edit, Plus, Search, Trash2, X } from "lucide-react";
// import PropTypes from 'prop-types';
// import { memo, useCallback, useState } from "react";
// import "./Attributes.css";

// // Separate Modal Components to prevent re-creation
// const ColorModal = memo(({ 
//   isOpen, 
//   editingColorId, 
//   colorForm, 
//   onClose, 
//   onSave, 
//   onNameChange, 
//   onCodeChange 
// }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h3 className="modal-title">
//             {editingColorId ? "Edit Color" : "Add Color"}
//           </h3>
//           <button 
//             type="button"
//             onClick={onClose}
//             className="modal-close-button"
//           >
//             <X size={20} />
//           </button>
//         </div>
        
//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">Color Name</label>
//             <input
//               type="text"
//               value={colorForm.name}
//               onChange={onNameChange}
//               className="form-input"
//               placeholder="Enter color name"
//               autoFocus
//             />
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Color Code</label>
//             <div className="flex items-center gap-3">
//               <input
//                 type="color"
//                 value={colorForm.code}
//                 onChange={onCodeChange}
//                 className="h-10 w-10 cursor-pointer rounded-md border border-gray-300"
//               />
//               <input
//                 type="text"
//                 value={colorForm.code}
//                 onChange={onCodeChange}
//                 className="form-input flex-1"
//                 placeholder="#FFFFFF"
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button
//             type="button"
//             onClick={onClose}
//             className="cancel-button"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onSave}
//             disabled={!colorForm.name}
//             className="save-button"
//           >
//             {editingColorId ? "Update" : "Add"} Color
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// ColorModal.displayName = 'ColorModal';

// ColorModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   editingColorId: PropTypes.string,
//   colorForm: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     code: PropTypes.string.isRequired
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onNameChange: PropTypes.func.isRequired,
//   onCodeChange: PropTypes.func.isRequired
// };

// const SizeModal = memo(({ 
//   isOpen, 
//   editingSizeId, 
//   sizeForm, 
//   productCategories,
//   onClose, 
//   onSave, 
//   onNameChange, 
//   onCategoryChange,
//   onSortOrderChange 
// }) => {
//   if (!isOpen) return null;
  
//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h3 className="modal-title">
//             {editingSizeId ? "Edit Size" : "Add Size"}
//           </h3>
//           <button 
//             type="button"
//             onClick={onClose}
//             className="modal-close-button"
//           >
//             <X size={20} />
//           </button>
//         </div>
        
//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">Size Name</label>
//             <input
//               type="text"
//               value={sizeForm.name}
//               onChange={onNameChange}
//               className="form-input"
//               placeholder="Enter size name"
//               autoFocus
//             />
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Product Category</label>
//             <select
//               value={sizeForm.categoryId}
//               onChange={onCategoryChange}
//               className="form-select"
//             >
//               <option value="">Select Category</option>
//               {productCategories.map(category => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label className="form-label">Sort Order</label>
//             <input
//               type="number"
//               value={sizeForm.sortOrder}
//               onChange={onSortOrderChange}
//               className="form-input"
//               min="1"
//             />
//           </div>
//         </div>
        
//         <div className="modal-footer">
//           <button
//             type="button"
//             onClick={onClose}
//             className="cancel-button"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onSave}
//             disabled={!sizeForm.name || !sizeForm.categoryId}
//             className="save-button"
//           >
//             {editingSizeId ? "Update" : "Add"} Size
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });
// SizeModal.displayName = 'SizeModal';

// SizeModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   editingSizeId: PropTypes.string,
//   sizeForm: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     categoryId: PropTypes.string.isRequired,
//     sortOrder: PropTypes.number.isRequired
//   }).isRequired,
//   productCategories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string
//     })
//   ).isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   onNameChange: PropTypes.func.isRequired,
//   onCategoryChange: PropTypes.func.isRequired,
//   onSortOrderChange: PropTypes.func.isRequired
// };

// const AttributesPage = () => {
//   // Mock data for product categories
//   const [productCategories] = useState([
//     { id: "1", name: "Clothing", description: "All clothing items" },
//     { id: "2", name: "Footwear", description: "Shoes and sandals" },
//     { id: "3", name: "Accessories", description: "Bags, belts, etc." }
//   ]);

//   // Colors state and modal
//   const [colors, setColors] = useState([
//     { id: "1", name: "Red", code: "#FF0000" },
//     { id: "2", name: "Blue", code: "#0000FF" },
//     { id: "3", name: "Green", code: "#008000" },
//     { id: "4", name: "Black", code: "#000000" },
//     { id: "5", name: "White", code: "#FFFFFF" }
//   ]);

//   const [showColorModal, setShowColorModal] = useState(false);
//   const [editingColorId, setEditingColorId] = useState(null);
//   const [colorForm, setColorForm] = useState({
//     name: "",
//     code: "#000000"
//   });

//   // Size options with category associations
//   const [sizeOptions, setSizeOptions] = useState([
//     { id: "1", name: "XS", sortOrder: 1, categoryId: "1", categoryName: "Clothing" },
//     { id: "2", name: "S", sortOrder: 2, categoryId: "1", categoryName: "Clothing" },
//     { id: "3", name: "M", sortOrder: 3, categoryId: "1", categoryName: "Clothing" },
//     { id: "4", name: "L", sortOrder: 4, categoryId: "1", categoryName: "Clothing" },
//     { id: "5", name: "XL", sortOrder: 5, categoryId: "1", categoryName: "Clothing" },
//     { id: "6", name: "6", sortOrder: 1, categoryId: "2", categoryName: "Footwear" },
//     { id: "7", name: "7", sortOrder: 2, categoryId: "2", categoryName: "Footwear" },
//     { id: "8", name: "8", sortOrder: 3, categoryId: "2", categoryName: "Footwear" }
//   ]);

//   const [activeTab, setActiveTab] = useState("sizes");
//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [editingSizeId, setEditingSizeId] = useState(null);
//   const [sizeForm, setSizeForm] = useState({
//     name: "",
//     categoryId: "",
//     sortOrder: 1
//   });

//   // Color form handlers
//   const handleColorNameChange = useCallback((e) => {
//     setColorForm(prev => ({ ...prev, name: e.target.value }));
//   }, []);

//   const handleColorCodeChange = useCallback((e) => {
//     setColorForm(prev => ({ ...prev, code: e.target.value }));
//   }, []);

//   // Size form handlers
//   const handleSizeNameChange = useCallback((e) => {
//     setSizeForm(prev => ({ ...prev, name: e.target.value }));
//   }, []);

//   const handleSizeCategoryChange = useCallback((e) => {
//     setSizeForm(prev => ({ ...prev, categoryId: e.target.value }));
//   }, []);

//   const handleSizeSortOrderChange = useCallback((e) => {
//     setSizeForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 1 }));
//   }, []);

//   // Color modal handlers
//   const handleAddColor = useCallback(() => {
//     setColorForm({ name: "", code: "#000000" });
//     setEditingColorId(null);
//     setShowColorModal(true);
//   }, []);

//   const handleEditColor = useCallback((color) => {
//     setColorForm({ name: color.name, code: color.code });
//     setEditingColorId(color.id);
//     setShowColorModal(true);
//   }, []);

//   const handleSaveColor = useCallback(() => {
//     if (editingColorId) {
//       setColors(prev => prev.map(color => 
//         color.id === editingColorId ? { ...color, ...colorForm } : color
//       ));
//     } else {
//       const newColor = {
//         id: Date.now().toString(),
//         ...colorForm
//       };
//       setColors(prev => [...prev, newColor]);
//     }
//     setShowColorModal(false);
//     setColorForm({ name: "", code: "#000000" });
//     setEditingColorId(null);
//   }, [editingColorId, colorForm]);

//   const handleDeleteColor = useCallback((colorId) => {
//     setColors(prev => prev.filter(color => color.id !== colorId));
//   }, []);

//   const handleCloseColorModal = useCallback(() => {
//     setShowColorModal(false);
//     setColorForm({ name: "", code: "#000000" });
//     setEditingColorId(null);
//   }, []);

//   // Size modal handlers
//   const handleAddSize = useCallback(() => {
//     setSizeForm({ name: "", categoryId: "", sortOrder: 1 });
//     setEditingSizeId(null);
//     setShowSizeModal(true);
//   }, []);

//   const handleEditSize = useCallback((size) => {
//     setSizeForm({
//       name: size.name,
//       categoryId: size.categoryId,
//       sortOrder: size.sortOrder
//     });
//     setEditingSizeId(size.id);
//     setShowSizeModal(true);
//   }, []);

//   const handleSaveSize = useCallback(() => {
//     const categoryName = productCategories.find(cat => cat.id === sizeForm.categoryId)?.name || "";
    
//     if (editingSizeId) {
//       setSizeOptions(prev => prev.map(size => 
//         size.id === editingSizeId 
//           ? { ...size, ...sizeForm, categoryName }
//           : size
//       ));
//     } else {
//       const newSize = {
//         id: Date.now().toString(),
//         ...sizeForm,
//         categoryName
//       };
//       setSizeOptions(prev => [...prev, newSize]);
//     }
    
//     setShowSizeModal(false);
//     setSizeForm({ name: "", categoryId: "", sortOrder: 1 });
//     setEditingSizeId(null);
//   }, [editingSizeId, sizeForm, productCategories]);

//   const handleDeleteSize = useCallback((sizeId) => {
//     setSizeOptions(prev => prev.filter(size => size.id !== sizeId));
//   }, []);

//   const handleCloseSizeModal = useCallback(() => {
//     setShowSizeModal(false);
//     setSizeForm({ name: "", categoryId: "", sortOrder: 1 });
//     setEditingSizeId(null);
//   }, []);

//   return (
//     <div className="attributes-container">
//       <div className="attributes-header">
//         <h1 className="attributes-title">Product Attributes</h1>
//         <p className="attributes-subtitle">Manage color and size variants for your products</p>
//       </div>

//       {/* Tab Navigation */}
//       <div className="attributes-tabs">
//         <nav className="tab-nav">
//           <button
//             type="button"
//             onClick={() => setActiveTab("sizes")}
//             className={`tab-button ${activeTab === "sizes" ? "active" : ""}`}
//           >
//             Size Options
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveTab("colors")}
//             className={`tab-button ${activeTab === "colors" ? "active" : ""}`}
//           >
//             Color Options
//           </button>
//         </nav>
//       </div>

//       {/* Size Options Tab */}
//       {activeTab === "sizes" && (
//         <div>
//           <div className="table-actions">
//             <div className="search-container">
//               <Search className="search-icon" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search sizes..."
//                 className="search-input"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleAddSize}
//               className="add-button"
//             >
//               <Plus size={16} />
//               <span>Add Size</span>
//             </button>
//           </div>

//           <div className="table-container">
//             <table className="data-table">
//               <thead className="table-attributes-header">
//                 <tr>
//                   <th className="table-header-cell-attributes">Size Name</th>
//                   <th className="table-header-cell-attributes">Category</th>
//                   <th className="table-header-cell-attributes">Sort Order</th>
//                   <th className="table-header-cell-attributes">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="custom-divide">
//                 {sizeOptions.map((size) => (
//                   <tr key={size.id} className="table-attributes-row">
//                     <td className="table-cell table-cell-text">
//                       {size.name}
//                     </td>
//                     <td className="table-cell table-cell-muted">
//                       {size.categoryName}
//                     </td>
//                     <td className="table-cell table-cell-muted">
//                       {size.sortOrder}
//                     </td>
//                     <td className="table-cell">
//                       <div className="action-buttons">
//                         <button
//                           type="button"
//                           onClick={() => handleEditSize(size)}
//                           className="action-button edit-button"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteSize(size.id)}
//                           className="action-button delete-button"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Color Options Tab */}
//       {activeTab === "colors" && (
//         <div>
//           <div className="table-actions">
//             <div className="search-container">
//               <Search className="search-icon" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search colors..."
//                 className="search-input"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleAddColor}
//               className="add-button"
//             >
//               <Plus size={16} />
//               <span>Add Color</span>
//             </button>
//           </div>

//           <div className="table-container">
//             <table className="data-table">
//               <thead className="table-attributes-header">
//                 <tr>
//                   <th className="table-header-cell-attributes">Color Preview</th>
//                   <th className="table-header-cell-attributes">Color Name</th>
//                   <th className="table-header-cell-attributes">Color Code</th>
//                   <th className="table-header-cell-attributes">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="custom-divide">
//                 {colors.map((color) => (
//                   <tr key={color.id} className="table-attributes-row">
//                     <td className="table-cell">
//                       <div
//                         className="color-preview"
//                         style={{ backgroundColor: color.code }}
//                       />
//                     </td>
//                     <td className="table-cell table-cell-text">
//                       {color.name}
//                     </td>
//                     <td className="table-cell table-cell-muted">
//                       {color.code}
//                     </td>
//                     <td className="table-cell">
//                       <div className="action-buttons">
//                         <button
//                           type="button"
//                           onClick={() => handleEditColor(color)}
//                           className="action-button edit-button"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteColor(color.id)}
//                           className="action-button delete-button"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <ColorModal
//         isOpen={showColorModal}
//         editingColorId={editingColorId}
//         colorForm={colorForm}
//         onClose={handleCloseColorModal}
//         onSave={handleSaveColor}
//         onNameChange={handleColorNameChange}
//         onCodeChange={handleColorCodeChange}
//       />
      
//       <SizeModal
//         isOpen={showSizeModal}
//         editingSizeId={editingSizeId}
//         sizeForm={sizeForm}
//         productCategories={productCategories}
//         onClose={handleCloseSizeModal}
//         onSave={handleSaveSize}
//         onNameChange={handleSizeNameChange}
//         onCategoryChange={handleSizeCategoryChange}
//         onSortOrderChange={handleSizeSortOrderChange}
//       />
//     </div>
//   );
// };

// export default AttributesPage;

// import { Edit, Plus, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import "./Attributes.css";
// import VariantModal from "./VariantModal";

// const AttributesPage = () => {
//   const [variantTypes, setVariantTypes] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentVariant, setCurrentVariant] = useState(null);
//   const [mode, setMode] = useState('add'); // 'add' or 'edit'

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // In a real app, these would be API calls
//         const mockCategories = [
//           { product_category_id: '1', category_name: 'T-Shirts' },
//           { product_category_id: '2', category_name: 'Pants' }
//         ];
        
//         const mockColors = [
//           { colour_id: '1', colour_name: 'Red', colour_code: '#FF0000' },
//           { colour_id: '2', colour_name: 'Blue', colour_code: '#0000FF' }
//         ];
        
//         const mockSizes = [
//           { size_id: '1', size_name: 'S', product_category_id: '1' },
//           { size_id: '2', size_name: 'M', product_category_id: '1' }
//         ];
        
//         setCategories(mockCategories);
//         setColors(mockColors);
//         setSizes(mockSizes);
//         setVariantTypes([
//           { variant_type_id: '1', type_name: 'color', display_name: 'Color' },
//           { variant_type_id: '2', type_name: 'size', display_name: 'Size' }
//         ]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   const handleAdd = (type) => {
//     setCurrentVariant({
//       type: type,
//       name: '',
//       code: type === 'color' ? '#000000' : '',
//       categoryId: type === 'size' ? '' : null
//     });
//     setMode('add');
//     setModalOpen(true);
//   };

//   const handleEdit = (variant, type) => {
//     setCurrentVariant({
//       ...variant,
//       type: type
//     });
//     setMode('edit');
//     setModalOpen(true);
//   };

//   const handleSave = (variant) => {
//     if (mode === 'add') {
//       // Add new variant
//       if (variant.type === 'color') {
//         setColors([...colors, {
//           colour_id: Date.now().toString(),
//           colour_name: variant.name,
//           colour_code: variant.code
//         }]);
//       } else {
//         setSizes([...sizes, {
//           size_id: Date.now().toString(),
//           size_name: variant.name,
//           product_category_id: variant.categoryId
//         }]);
//       }
//     } else {
//       // Update existing variant
//       if (variant.type === 'color') {
//         setColors(colors.map(c => 
//           c.colour_id === variant.colour_id ? 
//           { ...c, colour_name: variant.name, colour_code: variant.code } : c
//         ));
//       } else {
//         setSizes(sizes.map(s => 
//           s.size_id === variant.size_id ? 
//           { ...s, size_name: variant.name, product_category_id: variant.categoryId } : s
//         ));
//       }
//     }
//     setModalOpen(false);
//   };

//   const handleDelete = (id, type) => {
//     if (type === 'color') {
//       setColors(colors.filter(c => c.colour_id !== id));
//     } else {
//       setSizes(sizes.filter(s => s.size_id !== id));
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="attributes-container">
//       <div className="attributes-wrapper">
//         <h1 className="main-header">Product Variants</h1>

//         {/* Color Variants Section */}
//         <div className="variant-section">
//           <div className="section-header">
//             <h2>Color Variants</h2>
//             <button 
//               onClick={() => handleAdd('color')} 
//               className="add-variant-button"
//             >
//               <Plus size={16} /> Add Color
//             </button>
//           </div>
          
//           <table className="variants-table">
//             <thead>
//               <tr>
//                 <th>Color Name</th>
//                 <th>Color Code</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {colors.map(color => (
//                 <tr key={color.colour_id}>
//                   <td>{color.colour_name}</td>
//                   <td>
//                     <div className="color-preview" style={{ backgroundColor: color.colour_code }} />
//                     {color.colour_code}
//                   </td>
//                   <td>
//                     <button onClick={() => handleEdit(color, 'color')} className="icon-button">
//                       <Edit size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(color.colour_id, 'color')} className="icon-button">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Size Variants Section */}
//         <div className="variant-section">
//           <div className="section-header">
//             <h2>Size Variants</h2>
//             <button 
//               onClick={() => handleAdd('size')} 
//               className="add-variant-button"
//             >
//               <Plus size={16} /> Add Size
//             </button>
//           </div>
          
//           <table className="variants-table">
//             <thead>
//               <tr>
//                 <th>Size Name</th>
//                 <th>Category</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sizes.map(size => (
//                 <tr key={size.size_id}>
//                   <td>{size.size_name}</td>
//                   <td>
//                     {categories.find(c => c.product_category_id === size.product_category_id)?.category_name || 'N/A'}
//                   </td>
//                   <td>
//                     <button onClick={() => handleEdit(size, 'size')} className="icon-button">
//                       <Edit size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(size.size_id, 'size')} className="icon-button">
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Variant Modal */}
//         {modalOpen && (
//           <VariantModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             onSave={handleSave}
//             variant={currentVariant}
//             categories={categories}
//             mode={mode}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttributesPage;