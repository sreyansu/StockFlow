import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingModal from './PricingModal';

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = (planName: string) => {
    console.log(`Plan selected: ${planName}`);
    setIsModalOpen(false);
    // Navigate to the signup/setup flow, passing the plan name
    navigate(`/signup?plan=${planName}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <div className="text-2xl font-bold text-gray-800">InventoryPro</div>
        <div>
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-blue-600 font-semibold mr-4"
          >
            Log In
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center">
        <div className="p-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
            The Future of Inventory Management
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Streamline your stock, manage products with ease, and unlock insights to grow your business. All in one powerful, intuitive platform.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Get Started for Free
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} InventoryPro. All rights reserved.</p>
      </footer>

      <PricingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectPlan={handleSelectPlan} 
      />
    </div>
  );
};

export default LandingPage;