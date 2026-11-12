// frontend/app/admin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include', // <-- Kinahanglan ni para ma-save ang cookie
      });

      if (res.ok) {
        router.push('/admin/dashboard'); // Adto sa dashboard kung sakto
      } else {
        setError('Wrong password. Try again.');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 w-full max-w-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-rose-500/10 rounded-full text-rose-500">
            <Lock size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
        <p className="text-neutral-500 text-center text-sm mb-8">Enter your password to manage portfolio content.</p>
        
        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-3 rounded-lg">{error}</p>}
        
        <input
          type="password"
          placeholder="Enter admin password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white mb-6 focus:outline-none focus:border-rose-500 transition-colors"
          required
        />
        
        <button type="submit" className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-600/20">
          Login to Dashboard
        </button>
      </form>
    </div>
  );
}