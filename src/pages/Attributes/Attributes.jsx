import { Search, Edit, Trash2 } from "lucide-react";
import "./Attributes.css";
import { useState } from "react";
import AttributeModal from "../Attributes/AttributeModal";
import EditAttributeModal from "../Attributes/EditAttributeModal";

const AttributesPage = () => {
  const [attributes, setAttributes] = useState([
    {
      id: 1,
      name: "Color",
      description: "Available product colors",
      values: "Red, Blue, Green, Black, White, Yellow, Pink, Gray",
    },
    {
      id: 2,
      name: "Size",
      description: "Standard clothing sizes",
      values: "XS, S, M, L, XL",
    },
    {
      id: 3,
      name: "Material",
      description: "Fabric or product material",
      values: "Cotton, Polyester, Leather",
    },
  ]);

  // Separate booleans for add vs. edit
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState({});

  // Handle clicking the “Edit” button
  const handleEdit = (attribute) => {
    setCurrentAttribute(attribute);
    setEditModalOpen(true);
  };

  // Handle clicking the “Add” button
  const handleAdd = () => {
    setCurrentAttribute({
      name: "",
      description: "",
      values: [""],
      category: "",
    });
    setAddModalOpen(true);
  };

  // Shared save logic (used by both Add & Edit)
  const handleSave = (attrToSave) => {
    if (attrToSave.id) {
      // Edit existing attribute
      setAttributes((prev) =>
        prev.map((a) => (a.id === attrToSave.id ? attrToSave : a))
      );
    } else {
      // Add new attribute
      const newAttribute = {
        ...attrToSave,
        id: Date.now(),
      };
      setAttributes((prev) => [...prev, newAttribute]);
    }
  };

  return (
    <div className="attributes-container">
      <div className="attributes-wrapper">
        <h1 className="main-header">Attributes</h1>

        {/* Search + Add Section */}
        <div className="search-button-section">
          <input
            type="text"
            placeholder="Search Attributes..."
            className="attribute-search-input"
          />
          <button onClick={handleAdd} className="add-attribute-button">
            Add Attribute
          </button>
        </div>

        {/* Attributes Table */}
        <div className="table-wrapper">
          <table className="attributes-table">
            <thead>
              <tr>
                <th className="table-header-cell">Attribute Name</th>
                <th className="table-header-cell">Description</th>
                <th className="table-header-cell">Attribute Values</th>
                <th className="table-header-cell">Categories</th>
                <th className="table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute) => (
                <tr key={attribute.id} className="attribute-table-row">
                  <td className="table-cell">{attribute.name}</td>
                  <td className="table-cell">{attribute.description}</td>
                  <td className="table-cell">{attribute.values}</td>
                  <td className="table-cell">{attribute.category}</td>
                  <td className="table-cell">
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(attribute)}
                        className="icon-button edit-button"
                      >
                        <Edit className="action-icon" />
                      </button>
                      <button className="icon-button delete-button">
                        <Trash2 className="action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Attribute Modal */}
        <AttributeModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleSave}
          attribute={currentAttribute}
          setAttribute={setCurrentAttribute}
        />

        {/* Edit Attribute Modal */}
        <EditAttributeModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
          attribute={currentAttribute}
          setAttribute={setCurrentAttribute}
        />
      </div>
    </div>
  );
};

export default AttributesPage;
