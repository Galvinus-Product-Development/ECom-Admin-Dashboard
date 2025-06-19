// import { Edit, Plus, Trash2, Upload, X } from 'lucide-react';
// import { useState } from 'react';
// import './ProductVariants.css';

// export default function ProductVariants({ isOpen, onClose, productData }) {
//   const [attributes, setAttributes] = useState([
//     { name: 'Size', values: ['S', 'M'] },
//     { name: 'Color', values: ['Red', 'Black'] }
//   ]);
  
//   const [variants, setVariants] = useState([
//     { id: 1, image: null, variantValue: 'S, Red', salePrice: 999, stock: 10, isPublished: false },
//     { id: 2, image: null, variantValue: 'S, Black', salePrice: 999, stock: 10, isPublished: false },
//     { id: 3, image: null, variantValue: 'M, Red', salePrice: 999, stock: 10, isPublished: false },
//     { id: 4, image: null, variantValue: 'M, Black', salePrice: 999, stock: 10, isPublished: false }
//   ]);

//   const [newAttribute, setNewAttribute] = useState({ name: '', values: '' });
//   const [editingAttribute, setEditingAttribute] = useState(null);

//   if (!isOpen) return null;

//   const addAttribute = () => {
//     if (newAttribute.name && newAttribute.values) {
//       const values = newAttribute.values.split(',').map(v => v.trim());
//       setAttributes([...attributes, { name: newAttribute.name, values }]);
//       setNewAttribute({ name: '', values: '' });
//       generateVariants([...attributes, { name: newAttribute.name, values }]);
//     }
//   };

//   const updateAttribute = (index, updatedAttribute) => {
//     const updated = [...attributes];
//     updated[index] = updatedAttribute;
//     setAttributes(updated);
//     generateVariants(updated);
//     setEditingAttribute(null);
//   };

//   const deleteAttribute = (index) => {
//     const updated = attributes.filter((_, i) => i !== index);
//     setAttributes(updated);
//     generateVariants(updated);
//   };

//   const generateVariants = (attrs) => {
//     if (attrs.length === 0) {
//       setVariants([]);
//       return;
//     }

//     const combinations = attrs.reduce((acc, attr) => {
//       if (acc.length === 0) {
//         return attr.values.map(value => [value]);
//       }
//       return acc.flatMap(combo => 
//         attr.values.map(value => [...combo, value])
//       );
//     }, []);

//     const newVariants = combinations.map((combo, index) => ({
//       id: index + 1,
//       image: null,
//       variantValue: combo.join(', '),
//       salePrice: productData.salePrice || 0,
//       stock: 10,
//       isPublished: false
//     }));

//     setVariants(newVariants);
//   };

//   const updateVariant = (id, field, value) => {
//     setVariants(variants.map(variant => 
//       variant.id === id ? { ...variant, [field]: value } : variant
//     ));
//   };

//   const handleImageUpload = (id, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         updateVariant(id, 'image', e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h2 className="modal-title">Product Variants - {productData.productName}</h2>
//           <button onClick={onClose} className="modal-close">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="modal-body">
        

//           <div className="variants-section">
//             <div className="variants-header">
//               <h3 className="section-title">Variants</h3>
//               <button onClick={addAttribute} className="add-variant-btn">
//                 <Plus size={16} />
//                 Add Variants
//               </button>
//             </div>

//             <div className="new-attribute-wrapper">
//               <div className="attribute-grid">
//                 <div>
//                   <label className="input-block">Attribute Name</label>
//                   <input
//                     type="text"
//                     value={newAttribute.name}
//                     onChange={(e) => setNewAttribute({...newAttribute, name: e.target.value})}
//                     placeholder="e.g., Size, Color"
//                     className="input-field"
//                   />
//                 </div>
//                 <div>
//                   <label className="input-block">Values (comma separated)</label>
//                   <input
//                     type="text"
//                     value={newAttribute.values}
//                     onChange={(e) => setNewAttribute({...newAttribute, values: e.target.value})}
//                     placeholder="e.g., S, M, L or Red, Blue, Green"
//                     className="input-field"
//                   />
//                 </div>
//                 <div className="flex items-end">
//                   <button onClick={addAttribute} className="add-attribute-btn">
//                     Add Attribute
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {attributes.length > 0 && (
//               <div className="table-container">
//                 <table className="table">
//                   <thead className="table-header">
//                     <tr>
//                       <th className="table-cell">Attribute Name</th>
//                       <th className="table-cell">Values</th>
//                       <th className="table-cell-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {attributes.map((attr, index) => (
//                       <tr key={index}>
//                         <td className="table-cell">
//                           {editingAttribute === index ? (
//                             <input
//                               type="text"
//                               value={attr.name}
//                               onChange={(e) => {
//                                 const updated = [...attributes];
//                                 updated[index] = {...attr, name: e.target.value};
//                                 setAttributes(updated);
//                               }}
//                               className="inline-input"
//                             />
//                           ) : attr.name}
//                         </td>
//                         <td className="table-cell">
//                           {editingAttribute === index ? (
//                             <input
//                               type="text"
//                               value={attr.values.join(', ')}
//                               onChange={(e) => {
//                                 const updated = [...attributes];
//                                 updated[index] = {...attr, values: e.target.value.split(',').map(v => v.trim())};
//                                 setAttributes(updated);
//                               }}
//                               className="inline-input"
//                             />
//                           ) : attr.values.join(', ')}
//                         </td>
//                         <td className="table-cell-center">
//                           <div className="action-buttons">
//                             {editingAttribute === index ? (
//                               <button
//                                 onClick={() => {
//                                   generateVariants(attributes);
//                                   setEditingAttribute(null);
//                                 }}
//                                 className="text-green-600 hover:text-green-800"
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() => setEditingAttribute(index)}
//                                 className="text-blue-600 hover:text-blue-800"
//                               >
//                                 <Edit size={16} />
//                               </button>
//                             )}
//                             <button
//                               onClick={() => deleteAttribute(index)}
//                               className="text-red-600 hover:text-red-800"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {variants.length > 0 && (
//               <div>
//                 <h4 className="font-semibold mb-3">Generated Variants</h4>
//                 <div className="overflow-x-auto">
//                   <table className="table">
//                     <thead className="table-header">
//                       <tr>
//                         <th className="table-cell">Product Image</th>
//                         <th className="table-cell">Variant Value</th>
//                         <th className="table-cell">Sale Price</th>
//                         <th className="table-cell">Stock</th>
//                         <th className="table-cell">Is Published</th>
//                         <th className="table-cell">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {variants.map((variant) => (
//                         <tr key={variant.id}>
//                           <td className="table-cell">
//                             <div className="variant-preview">
//                               {variant.image ? (
//                                 <img src={variant.image} alt="Variant" className="variant-img" />
//                               ) : (
//                                 <Upload size={20} className="upload-icon" />
//                               )}
//                               <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={(e) => handleImageUpload(variant.id, e)}
//                                 className="file-input"
//                               />
//                             </div>
//                           </td>
//                           <td className="table-cell">{variant.variantValue}</td>
//                           <td className="table-cell">
//                             <input
//                               type="number"
//                               value={variant.salePrice}
//                               onChange={(e) => updateVariant(variant.id, 'salePrice', e.target.value)}
//                               className="small-input"
//                             />
//                           </td>
//                           <td className="table-cell">
//                             <input
//                               type="number"
//                               value={variant.stock}
//                               onChange={(e) => updateVariant(variant.id, 'stock', e.target.value)}
//                               className="tiny-input"
//                             />
//                           </td>
//                           <td className="table-cell-center">
//                             <input
//                               type="checkbox"
//                               checked={variant.isPublished}
//                               onChange={(e) => updateVariant(variant.id, 'isPublished', e.target.checked)}
//                               className="checkbox"
//                             />
//                           </td>
//                           <td className="table-cell-center">
//                             <div className="action-buttons">
//                               <button className="text-blue-600 hover:text-blue-800">
//                                 <Edit size={16} />
//                               </button>
//                               <button className="text-red-600 hover:text-red-800">
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="footer-buttons">
//             <button onClick={onClose} className="cancel-btn">
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 console.log('Variants saved:', variants);
//                 alert('Variants saved successfully!');
//                 onClose();
//               }}
//               className="save-btn"
//             >
//               Save Variants
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
