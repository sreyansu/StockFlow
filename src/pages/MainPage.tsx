import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/react';
import Dashboard from '../components/Dashboard';
import LoginForm from '../components/LoginForm';

function MainPage() {
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading StockFlow-Pro...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <Dashboard user={user} />;
}

export default MainPage;
