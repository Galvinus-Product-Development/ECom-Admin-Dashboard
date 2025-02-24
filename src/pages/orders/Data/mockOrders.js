export const mockOrders = [
    {
      id: "ORD-001",
      userId: "USR-001",
      products: [
        { productId: "1", quantity: 2, price: 199.99 },
        { productId: "2", quantity: 1, price: 299.99 },
      ],
      status: "pending",
      totalAmount: 699.97,
      createdAt: new Date("2024-03-15T08:30:00"),
    },
    {
      id: "ORD-002",
      userId: "USR-002",
      products: [{ productId: "3", quantity: 1, price: 899.99 }],
      status: "shipped",
      totalAmount: 899.99,
      createdAt: new Date("2024-03-14T15:45:00"),
    },
    {
      id: "ORD-003",
      userId: "USR-003",
      products: [{ productId: "1", quantity: 1, price: 199.99 }],
      status: "delivered",
      totalAmount: 199.99,
      createdAt: new Date("2024-03-13T11:20:00"),
    },
  ];
  