import React, { useState } from "react";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import SummaryCards from "./SummaryCards";
import FiltersAndSearch from "./FiltersAndSearch";
import InventoryTable from "./InventoryTable";
import Pagination from "./Pagination";
import BulkRestockModel from "./BulkRestockModel";
import "./InventoryManagement.css";

const generateMockInventory = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `product-${Date.now()}-${index}`, // Unique ID using timestamp + index
    ...mockProducts[index % mockProducts.length],
    reorderPoint: Math.floor(Math.random() * 20) + 5,
    lastRestocked: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ),
    locationCode: `WH-${String.fromCharCode(
      65 + Math.floor(index / 20)
    )}-${String((index % 20) + 1).padStart(3, "0")}`,
    status:
      Math.random() > 0.7
        ? "low_stock"
        : Math.random() > 0.9
        ? "out_of_stock"
        : "in_stock",
  }));
};

const mockProducts = [
  {
    // id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    stock: 45,
    category: "Electronics",
    tags: ["wireless", "audio", "premium"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
    variants: [
      { id: "1a", name: "Black", price: 199.99, stock: 30 },
      { id: "1b", name: "White", price: 199.99, stock: 15 },
    ],
  },
  {
    // id: "2",
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with health tracking features",
    price: 299.99,
    stock: 28,
    category: "Wearables",
    tags: ["smart watch", "fitness", "tech"],
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"],
  },
  {
    // id: "3",
    name: "Ultra HD Camera",
    description: "4K professional camera with advanced features",
    price: 899.99,
    stock: 12,
    category: "Photography",
    tags: ["camera", "professional", "4k"],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    ],
  },
];

const mockInventory = generateMockInventory(50);
console.log(mockInventory);
const ITEMS_PER_PAGE = 5;

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [restockQuantity, setRestockQuantity] = useState(0);

  const getFilteredAndSortedInventory = () => {
    let filtered = inventory.filter((item) => {
      const matchesFilter = filter === "all" || item.status === filter;
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.locationCode.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const filteredInventory = getFilteredAndSortedInventory();
  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  console.log(paginatedInventory);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBulkRestock = () => {
    const updatedInventory = inventory.map((item) => {
      if (selectedItems.includes(item.id)) {
        return {
          ...item,
          stock: item.stock + restockQuantity,
          lastRestocked: new Date(),
          status: "in_stock",
        };
      }
      return item;
    });
    setInventory(updatedInventory);
    setSelectedItems([]);
    setShowRestockModal(false);
    setRestockQuantity(0);
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case "in_stock":
        return "stock-status stock-in-stock";
      case "low_stock":
        return "stock-status stock-low-stock";
      case "out_of_stock":
        return "stock-status stock-out-of-stock";
      default:
        return "stock-status stock-default";
    }
  };

  const getStockIndicator = (item) => {
    if (item.stock <= 0)
      return <TrendingDown className="text-red-500" size={16} />;
    if (item.stock <= item.reorderPoint)
      return <AlertTriangle className="text-yellow-500" size={16} />;
    return <TrendingUp className="text-green-500" size={16} />;
  };

  return (
    <div className="inventory-management">
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Management</h1>
        <p className="inventory-subtitle">
          Track and manage product inventory across warehouses
        </p>
      </div>

      {/* Inventory Summary Cards */}
      <SummaryCards inventory={inventory} />

      {/* Filters and Search */}
      <FiltersAndSearch
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        setShowRestockModal={setShowRestockModal}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setCurrentPage={setCurrentPage}
      />

      {/* Inventory Table */}
      <InventoryTable
        filteredInventory={filteredInventory}
        getStockIndicator={getStockIndicator}
        getStockStatusColor={getStockStatusColor}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setShowRestockModal={setShowRestockModal}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        paginatedInventory={paginatedInventory}
      />

      {/* Pagination */}
      <Pagination
        filteredInventory={filteredInventory}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <BulkRestockModel
        showRestockModal={showRestockModal}
        setShowRestockModal={setShowRestockModal}
        selectedItems={selectedItems}
        restockQuantity={restockQuantity}
        setRestockQuantity={setRestockQuantity}
        handleBulkRestock={handleBulkRestock}
      />
    </div>
  );
};

export default InventoryManagement;
