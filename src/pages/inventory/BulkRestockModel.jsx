import React, { useState } from "react";
import { X, Trash2, Plus } from "lucide-react";
import "./BulkRestockModel.css"; // Style this file accordingly

const BulkRestockModel = ({
  showRestockModal,
  setShowRestockModal,
  handleSaveBulkRestock,
  productOptions = [], // List of available products to choose from
}) => {
  const [restockItems, setRestockItems] = useState([
    { productId: "", quantity: 1 },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...restockItems];
    updated[index][field] = field === "quantity" ? parseInt(value) : value;
    setRestockItems(updated);
  };

  const handleAddRow = () => {
    setRestockItems([...restockItems, { productId: "", quantity: 1 }]);
  };

  const handleRemoveRow = (index) => {
    const updated = restockItems.filter((_, i) => i !== index);
    setRestockItems(updated);
  };

  const handleSave = () => {
    handleSaveBulkRestock(restockItems);
    setRestockItems([{ productId: "", quantity: 1 }]);
    setShowRestockModal(false);
  };

  const handleCancel = () => {
    setShowRestockModal(false);
    setRestockItems([{ productId: "", quantity: 1 }]);
  };

  if (!showRestockModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Bulk Restock</h2>
          <button onClick={handleCancel} className="close-button">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {restockItems.map((item, index) => (
            <div key={index} className="restock-row">
              <select
                value={item.productId}
                onChange={(e) =>
                  handleChange(index, "productId", e.target.value)
                }
                className="restock-select"
              >
                <option value="">Select product</option>
                {productOptions.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
                className="restock-input"
              />
              <button
                onClick={() => handleRemoveRow(index)}
                className="remove-button"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button onClick={handleAddRow} className="add-button">
            <Plus size={16} /> Add More
          </button>
        </div>
        <div className="modal-footer">
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="confirm-button"
            disabled={
              restockItems.length === 0 ||
              restockItems.some((item) => !item.productId || item.quantity <= 0)
            }
          >
            Save Restock
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkRestockModel;
