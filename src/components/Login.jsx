import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    onLogin(userType);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
            alt="Login"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Welcome to EduManage Pro
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                I am a:
              </label>
              <div className="flex items-center flex-wrap">
                <label className="inline-flex items-center mr-6 mb-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => setUserType('student')}
                  />
                  <span className="ml-2">Student</span>
                </label>
                <label className="inline-flex items-center mr-6 mb-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="mentor"
                    checked={userType === 'mentor'}
                    onChange={() => setUserType('mentor')}
                  />
                  <span className="ml-2">Mentor</span>
                </label>
                <label className="inline-flex items-center mr-6 mb-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="faculty"
                    checked={userType === 'faculty'}
                    onChange={() => setUserType('faculty')}
                  />
                  <span className="ml-2">Faculty</span>
                </label>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="parent"
                    checked={userType === 'parent'}
                    onChange={() => setUserType('parent')}
                  />
                  <span className="ml-2">Parent</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;