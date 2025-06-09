// RolesManagement.jsx
import { CheckCircle, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AddEditRoleModal from "./AddEditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import FiltersAndActions from "./FiltersAndActions";
import RolesGrid from "./RolesGrid";
import "./RolesManagement.css";
import RoleView from "./RoleView";
import SummaryCards from "./SummaryCards";

// const mockPermissions = [
//   {
//     id: "perm-1",
//     name: "Manage Users",
//     description: "Full access to user management",
//     module: "Users",
//     actions: ["create", "read", "update", "delete"],
//   },
//   {
//     id: "perm-2",
//     name: "View Products",
//     description: "Read-only access to products",
//     module: "Products",
//     actions: ["read"],
//   },
//   {
//     id: "perm-3",
//     name: "Manage Orders",
//     description: "Process and manage orders",
//     module: "Orders",
//     actions: ["read", "update"],
//   },
//   {
//     id: "perm-4",
//     name: "Manage Inventory",
//     description: "Full access to inventory management",
//     module: "Inventory",
//     actions: ["create", "read", "update", "delete"],
//   },
//   {
//     id: "perm-5",
//     name: "View Analytics",
//     description: "Access to analytics dashboard",
//     module: "Analytics",
//     actions: ["read"],
//   },
// ];
const mockPermissions = [
  { id: 'products-create', module: 'Products', action: 'Create' },
  { id: 'products-read', module: 'Products', action: 'Read' },
  { id: 'products-update', module: 'Products', action: 'Update' },
  { id: 'products-delete', module: 'Products', action: 'Delete' },
  { id: 'orders-create', module: 'Orders', action: 'Create' },
  { id: 'orders-read', module: 'Orders', action: 'Read' },
  { id: 'orders-update', module: 'Orders', action: 'Update' },
  { id: 'orders-delete', module: 'Orders', action: 'Delete' },
  { id: 'inventory-create', module: 'Inventory', action: 'Create' },
  { id: 'inventory-read', module: 'Inventory', action: 'Read' },
  { id: 'inventory-update', module: 'Inventory', action: 'Update' },
  { id: 'inventory-delete', module: 'Inventory', action: 'Delete' },
  { id: 'analytics-read', module: 'Analytics', action: 'Read' },
  { id: 'user-create', module: 'User', action: 'Create' },
  { id: 'user-read', module: 'User', action: 'Read' },
  { id: 'user-update', module: 'User', action: 'Update' },
  { id: 'user-delete', module: 'User', action: 'Delete' },
];
const mockRoles = [
  {
    id: "role-1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: mockPermissions,
    users: 3,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "role-2",
    name: "Store Manager",
    description: "Manage products, inventory, and orders",
    permissions: mockPermissions.filter((p) =>
      ["Products", "Inventory", "Orders"].includes(p.module)
    ),
    users: 8,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "role-3",
    name: "Customer Service",
    description: "Handle customer orders and support",
    permissions: mockPermissions.filter((p) => ["Orders"].includes(p.module)),
    users: 15,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-05"),
  },
];


const RolesManagement = () => {
  const [roles,setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [showRoleView, setShowRoleView] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // New Role Form State
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
    users: 0,
  });
  const modules = ['Products', 'Orders', 'Inventory', 'Analytics', 'User'];


  const handleAddRole = (e) => {
    e.preventDefault();

    if (selectedRole) {
      // Update existing role
      const updatedRoles = roles.map((role) =>
        role.id === selectedRole.id
          ? {
              ...selectedRole,
              updatedAt: new Date(),
            }
          : role
      );
      setRoles(updatedRoles);
    } else {
      // Add new role
      const newRoleId = `role-${roles.length + 1}`;
      const roleToAdd = {
        id: newRoleId,
        ...newRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setRoles([...roles, roleToAdd]);
    }

    setShowRoleModal(false);
    setSelectedRole(null);
    setNewRole({
      name: "",
      description: "",
      permissions: [],
      users: 0,
    });
  };

  // const modules = Array.from(new Set(mockPermissions.map((p) => p.module)));

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase());
    const matchesModule =
      selectedModule === "all" ||
      role.permissions.some((p) => p.module === selectedModule);
    return matchesSearch && matchesModule;
  });

  const getPermissionIcon = (action) => {
    switch (action) {
      case "create":
        return <Plus size={14} className="icon-create" />;
      case "read":
        return <CheckCircle size={14} className="icon-read" />;
      case "update":
        return <Edit size={14} className="icon-update" />;
      case "delete":
        return <Trash2 size={14} className="icon-delete" />;
      default:
        return null;
    }
  };
  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
    setRoles(updatedRoles);
    setShowDeleteModal(false);
    setSelectedRole(null);
  };
  return (
    <div className="roles-management-container">
      <div className="header-container">
        <h1 className="header-title">Roles & Access Management</h1>
        {/* <p className="header-description">Manage user roles and permissions</p> */}
      </div>

      <FiltersAndActions
        modules={modules}
        search={search}
        setSearch={setSearch}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        setSelectedRole={setSelectedRole}
        setShowRoleModal={setShowRoleModal}
      />

      <SummaryCards roles={roles} mockPermissions={mockPermissions} />

    

      <RolesGrid
        filteredRoles={filteredRoles}
        setSelectedRole={setSelectedRole}
        setShowRoleModal={setShowRoleModal}
        setShowDeleteModal={setShowDeleteModal}
        setShowRoleView={setShowRoleView}
        getPermissionIcon={getPermissionIcon}
        mockPermissions={mockPermissions}
      />

      <AddEditRoleModal
        showRoleModal={showRoleModal}
        setShowRoleModal={setShowRoleModal}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        newRole={newRole}
        setNewRole={setNewRole}
        modules={modules}
        mockPermissions={mockPermissions}
        handleAddRole={handleAddRole}
        getPermissionIcon={getPermissionIcon}
      />
      <DeleteRoleModal
        showDeleteModal={showDeleteModal}
        selectedRole={selectedRole}
        setShowDeleteModal={setShowDeleteModal}
        setSelectedRole={setSelectedRole}
        handleDeleteRole={handleDeleteRole}
      />
      {showRoleView && selectedRole && (
        <RoleView selectedRole={selectedRole}
        setShowRoleView={setShowRoleView}/>
)}

    </div>
  );
};

export default RolesManagement;
