import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Product, Category, InventoryMovement, StockStats } from '../../types';
import StatsCard from './StatsCard';
import RecentMovements from './RecentMovements';
import LowStockAlert from './LowStockAlert';
import QuickActions from './QuickActions';
import {
  CubeIcon,
  ExclamationTriangleIcon,

  CurrencyDollarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { userProfile, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentMovements, setRecentMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StockStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalValue: 0,
    categoriesCount: 0
  });

  useEffect(() => {
    if (!userProfile) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const productsQuery = userProfile.role === 'admin'
      ? query(collection(db, 'products'))
      : (userProfile.assignedCategories && userProfile.assignedCategories.length > 0)
        ? query(collection(db, 'products'), where('categoryId', 'in', userProfile.assignedCategories))
        : null;

    const unsubscribeProducts = productsQuery ? onSnapshot(productsQuery, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);

      const lowStock = productsData.filter(p => p.currentStock < p.minThreshold);
      const outOfStock = productsData.filter(p => p.currentStock === 0);
      const totalValue = productsData.reduce((sum, p) => sum + (p.currentStock * p.unitPrice), 0);

      setStats(prevStats => ({
        ...prevStats,
        totalProducts: productsData.length,
        lowStockProducts: lowStock.length,
        outOfStockProducts: outOfStock.length,
        totalValue,
      }));
    }) : () => {};

    const categoriesQuery = userProfile.role === 'admin'
      ? query(collection(db, 'categories'))
      : query(collection(db, 'categories'), where('managerId', '==', userProfile.uid));

    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(categoriesData);
      setStats(prevStats => ({
        ...prevStats,
        categoriesCount: categoriesData.length,
      }));
    });

    const movementsQuery = query(collection(db, 'inventoryMovements'));

    const unsubscribeMovements = onSnapshot(movementsQuery, (snapshot) => {
      const movementsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryMovement));
      setRecentMovements(movementsData.slice(0, 10));
    });

    // Combined loading state management
    const allListenersReady = Promise.all([
      new Promise(resolve => onSnapshot(productsQuery || collection(db, 'products'), () => resolve(true), () => resolve(true))),
      new Promise(resolve => onSnapshot(categoriesQuery, () => resolve(true), () => resolve(true))),
      new Promise(resolve => onSnapshot(movementsQuery, () => resolve(true), () => resolve(true))),
    ]);

    allListenersReady.then(() => setLoading(false));

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeMovements();
    };
  }, [userProfile]);

  const lowStockProducts = products.filter(p => p.currentStock < p.minThreshold && p.currentStock > 0);
  const outOfStockProducts = products.filter(p => p.currentStock === 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your inventory.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<CubeIcon />}
          color="blue"
        />
        <StatsCard
          title="Categories"
          value={stats.categoriesCount}
          icon={<TagIcon />}
          color="purple"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockProducts}
          icon={<ExclamationTriangleIcon />}
          color="yellow"
        />
        <StatsCard
          title="Out of Stock"
          value={stats.outOfStockProducts}
          icon={<ExclamationTriangleIcon />}
          color="red"
        />
        <StatsCard
          title="Total Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          icon={<CurrencyDollarIcon />}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Movements */}
        <div className="lg:col-span-2">
          <RecentMovements movements={recentMovements} />
        </div>
      </div>

      {/* Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lowStockProducts.length > 0 && (
            <LowStockAlert products={lowStockProducts} type="low" />
          )}
          {outOfStockProducts.length > 0 && (
            <LowStockAlert products={outOfStockProducts} type="out" />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;