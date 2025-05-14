// ColorManagement.jsx - Main container for managing colors
import React, { useEffect, useState } from "react";
import {
  createColour,
  deleteColour,
  fetchColours,
  restoreColour,
  updateColour,
} from "../../services/api";
import ColourForm from "./ColourForm";
import ColourList from "./ColourList";
import "./ColourManagement.css";


const ColourManagement = () => {
  const [colours, setColours] = useState([]);
  const [editingColour, setEditingColour] = useState(null);

  // Fetch Colours
  useEffect(() => {
    fetchColours()
    .then((response) => setColours(response.data))
      .catch((error) => console.error("Error fetching colours:", error));
  }, []);

 /* const fetchColours = async () => {
    try {
      const response = await axios.get("/api/colours");
      setColours(response.data);
    } catch (error) {
      console.error("Error fetching colours:", error);
    }
  };*/

  // Add Colour
  const handleAddColour = async (colourData) => {
    try {
      const response = await createColour(colourData);
      setColours([...colours, response.data]);
    } catch (error) {
      console.error("Error adding colour:", error);
    }
  };

  // Edit Colour
  const handleEditColour = async (colourData) => {
    try {
      const response = await updateColour(editingColour.colour_id, colourData);
      setColours(colours.map((c) => 
        c.colour_id === editingColour.colour_id ? response.data : c
    )
  );
      setEditingColour(null);
    } catch (error) {
      console.error("Error updating colour:", error);
    }
  };

  // Delete Colour
  const handleDeleteColour = async (colour_id) => {
    try {
      await deleteColour(colour_id);
      setColours(colours.filter((colour) => colour.colour_id !== colour_id));
    } catch (error) {
      console.error("Error deleting colour:", error);
    }
  };
  
  // Restore Colour
  const handleRestoreColour = async (colour_id) => {
    try {
      await restoreColour(colour_id);
      fetchColours().then((response) => setColours(response.data));
    } catch (error) {
      console.error("Error restoring colour:", error);
    }
  };

  return (
    <div className="colour-management-container">
      <h2 className="page-heading">Colour Management</h2>
      <ColourForm
        onSubmit={editingColour ? handleEditColour : handleAddColour}
        editingColour={editingColour}
        onCancel={() => setEditingColour(null)}
      />
      <ColourList
        colours={colours}
        onEdit={setEditingColour}
        onDelete={handleDeleteColour}
      />
      <h3 className="deleted-heading">Deleted Colours</h3>
      {colours.filter((c) => c.is_deleted).length === 0 ? (
        <p className="no-deleted-msg">No deleted colours.</p>
      ) : (
        <ul className="deleted-colours-list">
          {colours
            .filter((c) => c.is_deleted)
            .map((c) => (
              <li key={c.colour_id} className="deleted-colour-item">
                {c.colour_name}{" "}
                <button className="restore-btn" onClick={() => handleRestoreColour(c.colour_id)}>
                  Restore
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ColourManagement;
/*
import { useState } from "react";
import ColourForm from "./ColourForm";
import ColourList from "./ColourList";


const ColourManagement = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleEdit = (color) => {
        setSelectedColor(color);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setSelectedColor(null);
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <div>
            {!isFormVisible ? (
                <ColourList onEdit={handleEdit} onAddNew={handleAddNew} />
            ) : (
                <ColourForm color={selectedColor} onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default ColourManagement;

/*import { Button, Input, Modal, Table } from "@/components/ui";
import { Pencil, Trash, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { createColour, deleteColour, fetchColours, restoreColour, updateColour } from "../api";

export default function ColourManagement() {
  const [colours, setColours] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingColour, setEditingColour] = useState(null);
  const [formData, setFormData] = useState({ colour_name: "", colour_code: "" });

  useEffect(() => {
    loadColours();
  }, []);

  const loadColours = async () => {
    try {
      const response = await fetchColours();
      setColours(response.data);
    } catch (error) {
      console.error("Error fetching colours:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingColour) {
        await updateColour(editingColour.colour_id, formData);
      } else {
        await createColour(formData);
      }
      setModalOpen(false);
      setEditingColour(null);
      setFormData({ colour_name: "", colour_code: "" });
      loadColours();
    } catch (error) {
      console.error("Error saving colour:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteColour(id);
      loadColours();
    } catch (error) {
      console.error("Error deleting colour:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreColour(id);
      loadColours();
    } catch (error) {
      console.error("Error restoring colour:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Colours</h1>
      <Button onClick={() => setModalOpen(true)}>Add Colour</Button>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colours.map((colour) => (
            <tr key={colour.colour_id}>
              <td>{colour.colour_name}</td>
              <td>
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: colour.colour_code }}
                ></div>
              </td>
              <td>
                <Button onClick={() => { setEditingColour(colour); setModalOpen(true); }}><Pencil /></Button>
                <Button onClick={() => handleDelete(colour.colour_id)}><Trash /></Button>
                {colour.deleted && <Button onClick={() => handleRestore(colour.colour_id)}><Undo /></Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl mb-2">{editingColour ? "Edit Colour" : "Add Colour"}</h2>
            <Input
              type="text"
              placeholder="Colour Name"
              value={formData.colour_name}
              onChange={(e) => setFormData({ ...formData, colour_name: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Colour Code"
              value={formData.colour_code}
              onChange={(e) => setFormData({ ...formData, colour_code: e.target.value })}
              required
            />
            <Button type="submit">Save</Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
*/