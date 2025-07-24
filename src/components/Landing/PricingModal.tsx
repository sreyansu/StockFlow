import React from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      features: ['1 Admin User', '5 Staff Users', 'Basic Inventory Tracking', 'Community Support'],
      cta: 'Get Started',
    },
    {
      name: 'Business',
      price: '$49',
      period: '/ month',
      features: [
        '5 Admin Users',
        '20 Staff Users',
        'Advanced Reporting',
        'Email & Phone Support',
        'API Access',
      ],
      cta: 'Choose Plan',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited Users',
        'Dedicated Account Manager',
        'On-premise Deployment Options',
        '24/7 Priority Support',
        'Custom Integrations',
      ],
      cta: 'Contact Us',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative transform transition-all duration-300 ease-in-out scale-95 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 md:p-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">Choose Your Plan</h2>
          <p className="text-center text-gray-500 mb-10">Start your free trial today. No credit card required.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${plan.popular ? 'border-blue-500 border-2 relative' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">{plan.name}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;