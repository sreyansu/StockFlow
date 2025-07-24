import React from 'react';
import { Category } from '../../types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{category.name}</h3>
        <p className="text-sm text-gray-500 mt-1 min-h-[40px]">{category.description}</p>
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-end items-center">
        <button
          onClick={() => onEdit(category)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
