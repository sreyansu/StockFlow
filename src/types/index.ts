export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'staff';
  assignedCategories?: string[];
  createdAt: Date;
  lastLogin: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  categoryId: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  unitPrice: number;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
  lastRestocked: Date;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  categoryId: string;
  type: 'add' | 'remove' | 'transfer' | 'adjustment';
  quantity: number;
  previousStock: number;
  newStock: number;
  performedBy: string;
  reason: string;
  timestamp: Date;
}

export interface Alert {
  id: string;
  productId: string;
  type: 'low_stock' | 'out_of_stock' | 'reorder_triggered';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface StockStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  categoriesCount: number;
}