import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { signUp, signIn, UserProfile } from '../services/authService';

interface AuthProps {
  onAuthStateChange: (user: UserProfile | null) => void;
}

export function Auth({ onAuthStateChange }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let user: UserProfile;
      if (isLogin) {
        user = await signIn(email, password);
      } else {
        user = await signUp(email, password, displayName);
      }
      onAuthStateChange(user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-blue">
      <div className="bg-deep-purple/30 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-art-nouveau text-amber-300 mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
                required
              />
            </div>
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="displayName" className="block text-gray-300 mb-2">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
                  required
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-midnight-blue border border-amber-500/30 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-100"
                required
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 text-midnight-blue rounded-lg hover:bg-amber-400 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-amber-500 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
