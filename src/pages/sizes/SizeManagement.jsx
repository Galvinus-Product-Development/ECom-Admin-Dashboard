// import { useState } from "react";
// import SizeCategoryManagement from "./SizeCategoryManagement";
// import "./SizeManagement.css";
// import SizeOptionManagement from "./SizeOptionManagement";


// const SizeManagement = () => {
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCategorySelect = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     setIsModalOpen(true); // Open modal when category is selected
//   };

//   return (
//     <div className="size-management-container">
//     <div className="size-management-header">Size Management</div>
//     <div className="size-management-content">
//       <SizeCategoryManagement onCategorySelect={handleCategorySelect} />
//     </div>  
//       {/* Modal for Size Options */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
//             <SizeOptionManagement selectedCategoryId={selectedCategoryId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SizeManagement;
