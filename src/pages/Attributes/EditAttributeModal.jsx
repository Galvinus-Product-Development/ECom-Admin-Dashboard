import React, { useEffect } from "react";
import "./editAttributeModal.css"; // Still the same file

const EditAttributeModal = ({
  isOpen,
  onClose,
  onSave,
  attribute,
  setAttribute,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (typeof attribute.values === "string") {
      const valuesArray = attribute.values.split(",").map((val) => val.trim());
      setAttribute((prev) => ({ ...prev, values: valuesArray }));
    } else if (!attribute.values || attribute.values.length === 0) {
      setAttribute((prev) => ({ ...prev, values: [""] }));
    }
  }, [attribute.values, setAttribute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttribute((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (index, value) => {
    const newValues = [...attribute.values];
    newValues[index] = value;
    setAttribute((prev) => ({ ...prev, values: newValues }));
  };

  const handleAddValue = () => {
    setAttribute((prev) => ({
      ...prev,
      values: [...(prev.values || []), ""],
    }));
  };

  const handleRemoveValue = (index) => {
    const newValues = [...attribute.values];
    newValues.splice(index, 1);
    setAttribute((prev) => ({ ...prev, values: newValues }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(attribute);
    onClose();
  };

  return (
    <div className="edit-attr-modal-overlay">
      <div className="edit-attr-modal-content">
        <h2>Edit Attribute</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit-attr-modal-body">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={attribute?.name || ""}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Description:
              <input
                type="text"
                name="description"
                value={attribute?.description || ""}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Category:
              <input
                type="text"
                name="category"
                value={attribute?.category || ""}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Values:
              <div className="edit-attr-values-container">
                {(Array.isArray(attribute?.values) ? attribute.values : []).map(
                  (val, index) => (
                    <div key={index} className="edit-attr-value-group">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        required
                      />
                      {attribute.values.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveValue(index)}
                          className="edit-attr-remove-btn"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={handleAddValue}
                className="edit-attr-add-btn"
              >
                Add Value
              </button>
            </label>
          </div>

          <div className="edit-attr-modal-buttons">
            <button type="submit" className="edit-attr-save-btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="edit-attr-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAttributeModal;
