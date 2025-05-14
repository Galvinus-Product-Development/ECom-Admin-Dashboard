// src/pages/brands/BrandTable.jsx
import PropTypes from "prop-types";
import "./BrandTable.css";

const BrandTable = ({ brands, onEdit, onDelete, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="brand-table-container">
      <table>
        <thead>
          <tr>
          <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.brand_id}>
                <td>
                {brand.brand_image_url ? (
                    <img src={brand.brand_image_url} alt={brand.brand_name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                ) : "No Image"}
                </td>
              <td>{brand.brand_name}</td>
              <td>{brand.brand_description || "N/A"}</td>
              <td>
                <button onClick={() => onEdit(brand)}>Edit</button>
                <button onClick={() => onDelete(brand.brand_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

BrandTable.propTypes = {
  brands: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BrandTable;
