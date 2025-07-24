import React from 'react';
import { InventoryMovement } from '../../types';
import { format } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface RecentMovementsProps {
  movements: InventoryMovement[];
}

const RecentMovements: React.FC<RecentMovementsProps> = ({ movements }) => {
  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'add':
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
      case 'remove':
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
      case 'transfer':
        return <ArrowRightIcon className="h-4 w-4 text-blue-600" />;
      default:
        return <ArrowUpIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'add':
        return 'text-green-600 bg-green-50';
      case 'remove':
        return 'text-red-600 bg-red-50';
      case 'transfer':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Movements</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {movements.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No recent movements found
          </div>
        ) : (
          movements.map((movement) => (
            <div key={movement.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getMovementColor(movement.type)}`}>
                    {getMovementIcon(movement.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)} Stock
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {movement.quantity} | {movement.reason}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {movement.previousStock} → {movement.newStock}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(movement.timestamp), 'HH:mm dd/MM')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentMovements;