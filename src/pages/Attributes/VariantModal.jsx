import { useEffect, useState } from "react";
import "./VariantModal.css";

const VariantModal = ({ isOpen, onClose, onSave, variant, categories, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '#000000',
    categoryId: ''
  });

  useEffect(() => {
    if (variant) {
      setFormData({
        name: variant.name || '',
        code: variant.code || (variant.type === 'color' ? '#000000' : ''),
        categoryId: variant.categoryId || (variant.type === 'size' ? '' : null)
      });
    }
  }, [variant]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...variant,
      ...formData
    });
  };

  return (
    <div className="variant-modal-overlay">
      <div className="variant-modal-content">
        <h2>{mode === 'add' ? 'Add' : 'Edit'} {variant.type === 'color' ? 'Color' : 'Size'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              {variant.type === 'color' ? 'Color Name' : 'Size Name'}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {variant.type === 'color' && (
            <div className="form-group">
              <label>
                Color Code
                <div className="color-input-group">
                  <input
                    type="color"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  />
                </div>
              </label>
            </div>
          )}

          {variant.type === 'size' && (
            <div className="form-group">
              <label>
                Category
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.product_category_id} value={category.product_category_id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              {mode === 'add' ? 'Add' : 'Save'} {variant.type === 'color' ? 'Color' : 'Size'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VariantModal;