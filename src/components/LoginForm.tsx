import React, { useState } from 'react';
import Button from './Button';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
      
      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="social"
          social="google"
          fullWidth
          size="lg"
        >
          Continue with Google
        </Button>
        
        <Button
          variant="social"
          social="facebook"
          fullWidth
          size="lg"
        >
          Continue with Facebook
        </Button>
        
        <Button
          variant="social"
          social="apple"
          fullWidth
          size="lg"
        >
          Continue with Apple
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#bc9b54] focus:border-[#bc9b54]"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#bc9b54] focus:border-[#bc9b54]"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#bc9b54] focus:ring-[#bc9b54] border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <Button
            variant="link"
            size="sm"
            type="button"
          >
            Forgot password?
          </Button>
        </div>

        <Button
          variant="gold"
          size="lg"
          fullWidth
          loading={isLoading}
          type="submit"
        >
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Don't have an account?</span>
        <Button
          variant="ghost"
          size="sm"
          className="ml-2"
        >
          Sign up
        </Button>
      </div>

      {/* Example of other button variants */}
      <div className="mt-8 space-y-4">
        <Button variant="primary" size="md">Primary Button</Button>
        <Button variant="secondary" size="md">Secondary Button</Button>
        <Button variant="warning" size="md">Warning Button</Button>
        <Button variant="success" size="md" badge="New">Success Button</Button>
        <Button variant="danger" size="md">Danger Button</Button>
        <Button variant="outline" size="md">Outline Button</Button>
        <Button 
          variant="primary" 
          size="md"
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          Button with Icon
        </Button>
      </div>
    </div>
  );
};

export default LoginForm; 