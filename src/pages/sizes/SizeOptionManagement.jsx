// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { addSizeOption, deleteSizeOption, fetchSizeOptions, updateSizeOption } from "../../services/api";
// import "./SizeOptionManagement.css";

// const SizeOptionManagement = ({ selectedCategoryId }) => {
//   const [sizes, setSizes] = useState([]);
//   const [sizeName, setSizeName] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [editingSize, setEditingSize] = useState(null);

//   const loadSizes = async () => {
//     if (!selectedCategoryId) {
//       setSizes([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetchSizeOptions(selectedCategoryId);
//       setSizes(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching size options:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadSizes();
//   }, [selectedCategoryId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!sizeName.trim() || !sortOrder) return;

//     try{

//     if (editingSize) {
//       await updateSizeOption(editingSize.size_id, { size_name: sizeName, sort_order: parseInt(sortOrder), size_category_id: selectedCategoryId });
//       //setSizes(sizes.map(s => s.size_id === editingSize.size_id ? { ...s, size_name: sizeName, sort_order: parseInt(sortOrder) } : s));
//      // setEditingSize(null);
//     } else {
//       await addSizeOption({ size_name: sizeName, sort_order: parseInt(sortOrder), size_category_id: selectedCategoryId });
//       //setSizes([...sizes, response.data]);
//     }

//     setSizeName("");
//     setSortOrder("");
//     setEditingSize(null);
//     loadSizes(); 
//   } catch (error) {
//     console.error("Error saving size option:", error);
//   }
//   };

//   // Handle edit click
//   const handleEdit = (size) => {
//     setEditingSize(size);
//     setSizeName(size.size_name);  
//     setSortOrder(size.sort_order.toString());
//   };

//   const handleDelete = async (size_id) => {
//     try {
//     await deleteSizeOption(size_id);
//     loadSizes(); 
//   }
//   catch (error) {
//     console.error("Error deleting size option:", error);
//   }
// };

//   return (
//     <div className="size-option-management">
//       <h2>Size Options</h2>
//       {selectedCategoryId ? (
//         <>
//       <form className="size-option-form" onSubmit={handleSubmit}>
//         <input type="text" value={sizeName} onChange={(e) => setSizeName(e.target.value)} placeholder="Enter Size Name" required />
//         <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} placeholder="Sort Order" required />
//         <button type="submit">{editingSize ? "Update" : "Add"}</button>
//       </form>

//       {loading ? (
//             <p>Loading size options...</p>
//           ) : (
//       <ul className="size-option-list">
//         {sizes.length > 0 ? (
//         sizes.map((size) => (
//           <li key={size.size_id}>
//              <span className="size-name">{size.size_name} (Order: {size.sort_order})</span>
//              <div className="button-group">
//             <button className="edit-btn" onClick={() => handleEdit(size)}>Edit</button>
//             <button className="delete-btn" onClick={() => handleDelete(size.size_id)}>Delete</button>
//           </div>
//           </li>
//        ))
//       ) : (
//         <p>No size options found.</p>
//       )}
//       </ul>
//       )}
//       </>
//     ) : (
//       <p>Select a category to manage size options.</p>
//     )}
//     </div>
//   );
// };

// SizeOptionManagement.propTypes = {
//   selectedCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
// };

// export default SizeOptionManagement;
