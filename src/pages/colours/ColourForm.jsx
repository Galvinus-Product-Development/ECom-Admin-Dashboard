// // ColorForm.jsx - Handles adding and editing colors
// import PropTypes from "prop-types";
// import React, { useEffect, useState } from "react";
// import "./ColourForm.css";


// const ColourForm = ({ onSubmit, editingColour, onCancel }) => {
//   const [colourName, setColourName] = useState("");

//   useEffect(() => {
//     if (editingColour) {
//       setColourName(editingColour.colour_name);
//     } else {
//       setColourName("");
//     }
//   }, [editingColour]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!colourName.trim()) return;

//     onSubmit({ colour_name: colourName });
//     setColourName("");
//   };

//   return (
//     <div className="colour-form-container">
//       <h3 className="form-heading">{editingColour ? "Edit Colour" : "Add Colour"}</h3>
//       <form className="colour-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter colour name"
//           value={colourName}
//           onChange={(e) => setColourName(e.target.value)}
//           required
//           className="colour-input"
//         />
//         <button type="submit" className="submit-btn">{editingColour ? "Update" : "Add"}</button>
//         {editingColour && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
//       </form>
//     </div>
//   );
// };

// ColourForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   editingColour: PropTypes.shape({
//     colour_id: PropTypes.string,
//     colour_name: PropTypes.string.isRequired,
//    // colour_code: PropTypes.string.isRequired,
//   }),
//   onCancel: PropTypes.func.isRequired,
// };


// export default ColourForm;

// /*    
// import { useEffect, useState } from "react";
// //import { createColor, updateColor } from "../api";

// const ColourForm = ({ color, onClose, onSave }) => {
//     const [formData, setFormData] = useState({
//         colour_name: color ? color.colour_name : "",
//         colour_code: color ? color.colour_code : ""
//     });

//     useEffect(() => {
//         if (color) {
//             setFormData({
//                 colour_name: color.colour_name || "",
//                 colour_code: color.colour_code || "",
//             });
//         }
//     }, [color]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(formData);
//     };

//     return (
//         <div>
//             <h2>{color ? "Edit Color" : "Add Color"}</h2>
//             <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="colour_name"
//                 value={formData.colour_name}
//                 onChange={handleChange}
//                 placeholder="Colour Name"
//                 required
//             />
//             <input
//                 type="text"
//                 name="colour_code"
//                 value={formData.colour_code}
//                 onChange={handleChange}
//                 placeholder="Colour Code"
//                 required
//             />
//             <button type="submit">Save</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//         </form>
//         </div>
//     );
// };

// // **PropTypes validation**
// ColourForm.propTypes = {
//     color: PropTypes.shape({
//         colour_id: PropTypes.string,
//         colour_name: PropTypes.string,
//         colour_code: PropTypes.string,
//     }),
//     onClose: PropTypes.func.isRequired,
//     onSave: PropTypes.func.isRequired,
// };


// export default ColourForm;
// */