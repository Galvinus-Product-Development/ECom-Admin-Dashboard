import React from "react";
import { X } from "lucide-react";
import "./ProductModel.css";

function ProductModel({
  showProductModal,
  setShowProductModal,
  selectedProduct,
  setSelectedProduct,
  newProduct,
  setNewProduct,
  handleAddProduct,
  handleUpdateProduct,
}) {
  const closeModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "Electronics",
      tags: [],
      images: [],
      variants: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      handleUpdateProduct(selectedProduct); // <-- Call update function
    } else {
      console.log(newProduct);
      handleAddProduct(newProduct);
    }
    closeModal();
  };

  return (
    <>
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={closeModal} className="close-button">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={
                      selectedProduct ? selectedProduct.name : newProduct.name
                    }
                    onChange={(e) =>
                      selectedProduct
                        ? setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={
                      selectedProduct
                        ? selectedProduct.category
                        : newProduct.category
                    }
                    onChange={(e) =>
                      selectedProduct
                        ? setSelectedProduct({
                            ...selectedProduct,
                            category: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                    }
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Photography">Photography</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="form-group form-full">
                  <label>Description</label>
                  <textarea
                    value={
                      selectedProduct
                        ? selectedProduct.description
                        : newProduct.description
                    }
                    onChange={(e) =>
                      selectedProduct
                        ? setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                    }
                    rows={3}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      selectedProduct ? selectedProduct.price : newProduct.price
                    }
                    onChange={(e) =>
                      selectedProduct
                        ? setSelectedProduct({
                            ...selectedProduct,
                            price: parseFloat(e.target.value),
                          })
                        : setNewProduct({
                            ...newProduct,
                            price: parseFloat(e.target.value),
                          })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={
                      selectedProduct ? selectedProduct.stock : newProduct.stock
                    }
                    onChange={(e) =>
                      selectedProduct
                        ? setSelectedProduct({
                            ...selectedProduct,
                            stock: parseInt(e.target.value),
                          })
                        : setNewProduct({
                            ...newProduct,
                            stock: parseInt(e.target.value),
                          })
                    }
                    required
                  />
                </div>
                <div className="form-group form-full">
                  <label>Tags</label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    value={
                      selectedProduct
                        ? selectedProduct.tags.join(", ")
                        : newProduct.tags.join(", ")
                    }
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean);
                      selectedProduct
                        ? setSelectedProduct({ ...selectedProduct, tags })
                        : setNewProduct({ ...newProduct, tags });
                    }}
                  />
                </div>
                <div className="form-group form-full">
                  <label>Image URL</label>
                  <input
                    type="url"
                    placeholder="Enter image URL"
                    value={
                      selectedProduct
                        ? selectedProduct.images[0] || ""
                        : newProduct.images[0] || ""
                    }
                    onChange={(e) => {
                      const images = [e.target.value];
                      selectedProduct
                        ? setSelectedProduct({ ...selectedProduct, images })
                        : setNewProduct({ ...newProduct, images });
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {selectedProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductModel;
