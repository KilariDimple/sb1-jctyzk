import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="text-indigo-600 w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">EduManage Pro</h1>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {isLoggedIn ? (
          <Dashboard userType={userType} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;