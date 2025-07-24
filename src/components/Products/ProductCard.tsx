import React from 'react';
import { Product, Category } from '../../types';
import { PencilIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
  category?: Category;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category, onEdit }) => {
  const getStockStatus = () => {
    if (product.currentStock === 0) {
      return { status: 'out', color: 'text-red-600 bg-red-100', icon: ExclamationTriangleIcon };
    } else if (product.currentStock < product.minThreshold) {
      return { status: 'low', color: 'text-yellow-600 bg-yellow-100', icon: ExclamationTriangleIcon };
    } else {
      return { status: 'good', color: 'text-green-600 bg-green-100', icon: CheckCircleIcon };
    }
  };

  const stockStatus = getStockStatus();
  const stockPercentage = Math.min((product.currentStock / product.maxThreshold) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-xs text-gray-500">SKU: {product.sku}</p>
        </div>
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Stock</span>
          <div className="flex items-center space-x-2">
            <stockStatus.icon className={`h-4 w-4 ${stockStatus.color.split(' ')[0]}`} />
            <span className={`font-medium ${stockStatus.color.split(' ')[0]}`}>
              {product.currentStock}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              stockStatus.status === 'out' ? 'bg-red-500' :
              stockStatus.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${stockPercentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Min: {product.minThreshold}</span>
          <span>Max: {product.maxThreshold}</span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Category</span>
            <span className="font-medium text-gray-900">{category?.name || 'Unknown'}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Unit Price</span>
            <span className="font-medium text-gray-900">${product.unitPrice}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Total Value</span>
            <span className="font-bold text-green-600">
              ${(product.currentStock * product.unitPrice).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;