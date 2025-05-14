import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import './AccessControl.css';

const AccessControl = ({ categoryId, onUpdateAccess }) => {  
  const [accessControl, setAccessControl] = useState({  
    isPrivate: false,  
    excludedCustomers: [],  
  });  

  const [customers, setCustomers] = useState([]);
   // Fetch access control settings
   const fetchAccessControlSettings = useCallback(async () => {  
    try {  
      const response = await api.get(`/product-categories/${categoryId}/access-control`);
      setAccessControl({
        isPrivate: response.data.isPrivate,
        excludedCustomers: response.data.excludedCustomers || [],
      });
    } catch (error) {  
      console.error('Error fetching access control settings:', error);  
      toast.error("Failed to load access control settings.");
    }  
  }, [categoryId]);

  useEffect(() => {  
    fetchAccessControlSettings();  
  }, [fetchAccessControlSettings]);  

  // Fetch available customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error("Failed to load customers.");
      }
    };

    fetchCustomers();
  }, []);

  // Handle making the category private/public
  const handlePrivateChange = (e) => {  
    setAccessControl({ ...accessControl, isPrivate: e.target.checked });  
  };  

  // Handle excluding/including a customer
  const handleCustomerExclusion = (customerId) => {  
    const updatedExcludedCustomers = accessControl.excludedCustomers.includes(customerId)  
      ? accessControl.excludedCustomers.filter((id) => id !== customerId)  
      : [...accessControl.excludedCustomers, customerId];  

    setAccessControl({ ...accessControl, excludedCustomers: updatedExcludedCustomers });  
  };  

  // Save updated access control settings
  const handleSaveAccessControl = async () => {  
    try {  
      await api.put(`/product-categories/${categoryId}/access-control`, accessControl);
      toast.success("Access control settings updated successfully!");
      onUpdateAccess(); // Notify parent component of update
    } catch (error) {  
      console.error('Error updating access control settings:', error);  
      toast.error("Failed to update access control settings.");
    }  
  };  
  

  return (  
    <div className="access-control-container">  
      <h2>Access Control</h2>  
      <div className="form-group">  
        <label htmlFor="isPrivate">  
          <input  
            type="checkbox"  
            id="isPrivate"  
            checked={accessControl.isPrivate}  
            onChange={handlePrivateChange}  
          />  
          Make this category private (visible only to selected customers)  
        </label>  
      </div>  
      {accessControl.isPrivate && (  
        <div className="form-group">  
          <label>Excluded Customers:</label>  
          <ul>  
          {customers.map((customer) => (  
              <li key={customer.id}>  
                <label>  
                  <input  
                    type="checkbox"  
                    checked={accessControl.excludedCustomers.includes(customer.id)}  
                    onChange={() => handleCustomerExclusion(customer.id)}  
                  />  
                  {customer.name}  
                </label>  
              </li>  
            ))}  

          </ul>  
        </div>  
      )}  
      <div className="form-actions">  
        <button type="button" onClick={handleSaveAccessControl}>  
          Save  
        </button>  
      </div>  
    </div>  
  );  
}; 

AccessControl.propTypes = {  
    categoryId: PropTypes.string.isRequired, // UUID as string  
    onUpdateAccess: PropTypes.func.isRequired,  
  };  

export default AccessControl;  