// ColorList.jsx - Displays all colors, allows deletion and editing
import PropTypes from "prop-types";
import React from "react";
import "./ColourList.css";


const ColourList = ({ colours, onEdit, onDelete }) => {
  return (
    <div className="colour-list">
      <h3 className="colour-list-heading">Colour List</h3>
      {colours.length === 0 ? (
        <p className="no-colours-msg">No colours available.</p>
      ) : (
        <table className="colour-table" >
          <thead>
            <tr>
              <th>#</th>
              <th>Colour Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {colours.map((colour, index) => (
              <tr key={colour.colour_id}>
                <td>{index + 1}</td>
                <td>{colour.colour_name}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(colour)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(colour.colour_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

ColourList.propTypes = {
  colours: PropTypes.arrayOf(
    PropTypes.shape({
      colour_id: PropTypes.string.isRequired,
      colour_name: PropTypes.string.isRequired,
      //colour_code: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ColourList;
/*
//import { useEffect, useState } from "react";
import PropTypes from "prop-types";
//import { deleteColor, fetchColors } from "../api";

const ColourList = ({ colors, onEdit, onAddNew, onDelete }) => {
    return (
        <div>
            <button onClick={onAddNew}>Add Colour</button>
            <ul>
                {colors.map((color) => (
                    <li key={color.colour_id}>
                        {color.colour_name} ({color.colour_code})
                        <button onClick={() => onEdit(color)}>Edit</button>
                        <button onClick={() => onDelete(color.colour_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
   

// **PropTypes validation**
ColourList.propTypes = {
    colors: PropTypes.arrayOf(
        PropTypes.shape({
            colour_id: PropTypes.string.isRequired,
            colour_name: PropTypes.string.isRequired,
            colour_code: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onAddNew: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ColourList;

/*
 const [colors, setColors] = useState([]);

    useEffect(() => {
        loadColors();
    }, []);

    const loadColors = async () => {
        try {
            const response = await fetchColors();
            setColors(response.data);
        } catch (error) {
            console.error("Error fetching colors", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this color?")) {
            await deleteColor(id);
            loadColors();
        }
    };

    return (
        <div>
            <h2>Colour List</h2>
            <button onClick={onAddNew}>Add New Colour</button>
            <ul>
                {colors.map((color) => (
                    <li key={color.colour_id}>
                        <span>{color.colour_name} ({color.colour_code})</span>
                        <button onClick={() => onEdit(color)}>Edit</button>
                        <button onClick={() => handleDelete(color.colour_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
*/