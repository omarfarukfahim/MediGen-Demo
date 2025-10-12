
import React from 'react';

interface LoginPageProps {
  handleLogin: () => void;
}

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.7 0 265.8 0 133.4 105.1 23.3 244 23.3c60.3 0 112.5 22.8 152.1 60.1l-63.8 61.9c-23.3-22-54.1-33.8-92.4-33.8-72.3 0-131.3 58.8-131.3 131.3s59 131.3 131.3 131.3c76.3 0 119.5-51.5 124.5-80.6H244V261.8h244z"></path>
    </svg>
);


export const LoginPage: React.FC<LoginPageProps> = ({ handleLogin }) => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-15rem)]">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue to MediGen.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-baseline">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <a href="#" className="text-sm text-teal-700 hover:text-teal-800">Forgot?</a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="button"
              onClick={handleLogin}
              className="w-full px-4 py-2.5 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition-colors"
            >
              Sign In
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <button
              type="button"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Not a member? <button className="text-teal-700 hover:text-teal-800 font-medium">Sign up now</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
