// import React, { useEffect } from "react";
// import "./AttributeModal.css";

// const AttributeModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   attribute,
//   setAttribute,
// }) => {
//   if (!isOpen) return null;

//   useEffect(() => {
//     if (!attribute.values || attribute.values.length === 0) {
//       setAttribute((prev) => ({ ...prev, values: [""] }));
//     }
//   }, [attribute.values, setAttribute]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAttribute((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleValueChange = (index, value) => {
//     const newValues = [...attribute.values];
//     newValues[index] = value;
//     setAttribute((prev) => ({ ...prev, values: newValues }));
//   };

//   const handleAddValue = () => {
//     setAttribute((prev) => ({
//       ...prev,
//       values: [...(prev.values || []), ""],
//     }));
//   };

//   const handleRemoveValue = (index) => {
//     const newValues = [...attribute.values];
//     newValues.splice(index, 1);
//     setAttribute((prev) => ({ ...prev, values: newValues }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(attribute);
//     onClose();
//   };

//   return (
//     <div className="attribute-modal__overlay">
//       <div className="attribute-modal__content">
//         <h2 className="attribute-modal__title">
//           {attribute?.id ? "Edit Attribute" : "Add Attribute"}
//         </h2>
//         <form onSubmit={handleSubmit} className="attribute-modal__form">
//           <label className="attribute-modal__label">
//             Attribute Name:
//             <input
//               type="text"
//               name="name"
//               value={attribute?.name || ""}
//               onChange={handleChange}
//               required
//               className="attribute-modal__input"
//             />
//           </label>

//           <label className="attribute-modal__label">
//             Description:
//             <input
//               type="text"
//               name="description"
//               value={attribute?.description || ""}
//               onChange={handleChange}
//               required
//               className="attribute-modal__input"
//             />
//           </label>

//           <label className="attribute-modal__label">
//             Category:
//             <input
//               type="text"
//               name="category"
//               value={attribute?.category || ""}
//               onChange={handleChange}
//               required
//               className="attribute-modal__input"
//             />
//           </label>

//           <label className="attribute-modal__label">
//             Attribute Values:
//             {attribute?.values?.map((val, index) => (
//               <div key={index} className="attribute-modal__value-group">
//                 <input
//                   type="text"
//                   value={val}
//                   onChange={(e) => handleValueChange(index, e.target.value)}
//                   required
//                   className="attribute-modal__input"
//                 />
//                 {attribute.values.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveValue(index)}
//                     className="attribute-modal__remove-btn"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddValue}
//               className="attribute-modal__add-btn"
//             >
//               Add Value
//             </button>
//           </label>

//           <div className="attribute-modal__buttons">
//             <button type="submit" className="attribute-modal__save-btn">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="attribute-modal__cancel-btn"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AttributeModal;
