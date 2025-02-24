import React from "react";
import "./UserModal.css"; // Import the CSS file
import { X } from "lucide-react";

const UserModal = ({
  showUserModal,
  setShowUserModal,
  selectedUser,
  setSelectedUser,
  newUser,
  setNewUser,
  handleAddUser,
}) => {
  return (
    showUserModal && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">
              {selectedUser ? "Edit User" : "Add New User"}
            </h2>
            <button
              onClick={() => {
                setShowUserModal(false);
                setSelectedUser(null);
                setNewUser({
                  name: "",
                  email: "",
                  role: "customer",
                  status: "active",
                });
              }}
              className="modal-close-btn"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleAddUser}>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Name</label>
                <input
                  type="text"
                  value={selectedUser ? selectedUser?.name : newUser?.name}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({
                          ...selectedUser,
                          name: e.target.value,
                        })
                      : setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Email</label>
                <input
                  type="email"
                  value={selectedUser ? selectedUser?.email : newUser?.email}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      : setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Role</label>
                <select
                  value={selectedUser ? selectedUser?.role : newUser?.role}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        })
                      : setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="modal-select"
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-field">
                <label className="modal-label">Status</label>
                <select
                  value={selectedUser ? selectedUser?.status : newUser?.status}
                  onChange={(e) =>
                    selectedUser
                      ? setSelectedUser({
                          ...selectedUser,
                          status: e.target.value,
                        })
                      : setNewUser({ ...newUser, status: e.target.value })
                  }
                  className="modal-select"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                  setNewUser({
                    name: "",
                    email: "",
                    role: "customer",
                    status: "active",
                  });
                }}
                className="modal-cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="modal-submit-btn">
                {selectedUser ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UserModal;
