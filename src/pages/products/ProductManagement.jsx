import React, { useState } from "react";
import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";
import ProductViewToggle from "./ProductViewToggle";
import ProductList from "./ProductList";
import ProductActions from "./ProductActions";
import Pagination from "./Pagination";
import ProductModel from "./ProductModel";
import "./ProductManagement.css";


const generateMockProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    name: `Product ${index + 1}`,
    description: `Description for Product ${index + 1}`,
    price: Math.round(Math.random() * 1000 + 50),
    stock: Math.round(Math.random() * 100),
    category: ["Electronics", "Wearables", "Photography", "Accessories"][
      Math.floor(Math.random() * 4)
    ],
    tags: ["premium", "new", "sale", "featured"].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
    variants:
      Math.random() > 0.5
        ? [
            {
              id: `${index + 1}a`,
              name: "Standard",
              price: Math.round(Math.random() * 1000 + 50),
              stock: Math.round(Math.random() * 50),
            },
            {
              id: `${index + 1}b`,
              name: "Premium",
              price: Math.round(Math.random() * 1000 + 150),
              stock: Math.round(Math.random() * 30),
            },
          ]
        : undefined,
  }));
};

const mockProducts = generateMockProducts(50);
const ITEMS_PER_PAGE = 6;

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  // const [view, setView] = (useState < "grid") | ("list" > "grid");
  const [view, setView] = useState("grid"); // Default state is "grid"

  const [currentPage, setCurrentPage] = useState(1);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "Electronics",
    tags: [],
    images: [],
    variants: [],
  });

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      filter === "all" ||
      product.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddProduct = (e) => {
    const newProductId = (
      Math.max(...products.map((p) => parseInt(p.id))) + 1
    ).toString();

    const productToAdd = {
      id: newProductId,
      ...newProduct,
      tags: newProduct.tags || [], // Ensure tags is an array
      images: newProduct.images.length
        ? newProduct.images
        : [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          ],
    };

    setProducts([...products, productToAdd]);
    setShowProductModal(false);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "Electronics",
      tags: [],
      images: [],
      variants: [],
    });
  };


  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setShowProductModal(false);
    setSelectedProduct(null);
  };
  

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const getStockStatus = (stock) => {
    if (stock <= 0)
      return { color: "bg-red-100 text-red-800", label: "Out of Stock" };
    if (stock < 10)
      return { color: "bg-yellow-100 text-yellow-800", label: "Low Stock" };
    return { color: "bg-green-100 text-green-800", label: "In Stock" };
  };


  return (
    <div className="product-management-container">
      <div className="product-management-header">
        <h1>Product Management</h1>
        <p>Manage your product catalog and inventory</p>
      </div>

      <div className="filters-actions-container">
        <div className="filters-inputs-container">
          <ProductSearch search={search} setSearch={setSearch} setCurrentPage={setCurrentPage}/>
          <ProductFilter filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage}/>
          <ProductViewToggle view={view} setView={setView} />
        </div>
        <ProductActions
          setSelectedProduct={setSelectedProduct}
          setShowProductModal={setShowProductModal}
        />
      </div>

      {view === "grid" ? (
        <ProductList
          filteredProducts={filteredProducts}
          paginatedProducts={paginatedProducts}
          setSelectedProduct={setSelectedProduct}
          setShowProductModal={setShowProductModal}
          handleDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <div> {/* List view component */} </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={ITEMS_PER_PAGE}
        filteredProducts={filteredProducts}
        handlePageChange={handlePageChange}
      />
      <ProductModel 
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default ProductManagement;






































