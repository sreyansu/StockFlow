import React from 'react';
import { Product } from '../../types';
import { ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface LowStockAlertProps {
  products: Product[];
  type: 'low' | 'out';
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ products, type }) => {
  const title = type === 'low' ? 'Low Stock Alert' : 'Out of Stock Alert';
  const icon = type === 'low' ? ExclamationTriangleIcon : XCircleIcon;
  const bgColor = type === 'low' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
  const iconColor = type === 'low' ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className={`rounded-xl border ${bgColor} p-6`}>
      <div className="flex items-center mb-4">
        {React.createElement(icon, { className: `h-6 w-6 ${iconColor} mr-3` })}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="ml-auto bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
          {products.length}
        </span>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${type === 'low' ? 'text-yellow-600' : 'text-red-600'}`}>
                {product.currentStock} units
              </p>
              <p className="text-xs text-gray-500">
                Min: {product.minThreshold}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;