import React from 'react';
import { PlusIcon, ArrowPathIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      name: 'Add Product',
      description: 'Add a new product to inventory',
      icon: PlusIcon,
      action: () => navigate('/products'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Stock Update',
      description: 'Update stock levels',
      icon: ArrowPathIcon,
      action: () => navigate('/products'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Generate Report',
      description: 'Generate inventory report',
      icon: DocumentChartBarIcon,
      action: () => navigate('/analytics'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6 space-y-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.action}
            className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150 group"
          >
            <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div className="ml-4 text-left">
              <p className="font-medium text-gray-900">{action.name}</p>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;