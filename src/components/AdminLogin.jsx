import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_ENDPOINTS } from '../utils/api';

import Logo from './ui/Logo';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClasses = "w-full pl-12 pr-4 py-4 bg-white/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-peach-300 outline-none transition-all text-sm font-medium placeholder:text-gray-400";
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1";

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_ENDPOINTS.admin.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin-dashboard');
      } else {
        setError(data.error || 'Identity verification failed');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-peach-100/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 w-full max-w-md border border-peach-100 relative z-10 animate-scale-in">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Admin Boutique</h1>
          <p className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.3em] mt-2">Professional Access</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-8 flex items-center space-x-3 text-sm animate-shake">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className={labelClasses}>Credential Identifier</label>
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-peach-200 group-focus-within:text-gold-500 transition-colors" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
                placeholder="admin@olaluxe.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>Boutique Key</label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-peach-200 group-focus-within:text-gold-500 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={inputClasses}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white py-5 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-peach-200/50 flex items-center justify-center space-x-3 group relative overflow-hidden"
          >
            <span className="relative z-10">{loading ? 'Verifying Identity...' : 'Access Boutique'}</span>
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-peach-50 text-center">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
            Crafted for <span className="text-gray-900 font-bold italic">Olaluxe Excellence</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;