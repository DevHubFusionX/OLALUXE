import React from 'react';
import { FaSave, FaLock } from 'react-icons/fa';

const PasswordForm = ({
  passwordData,
  setPasswordData,
  onSubmit,
  onCancel,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-peach-200">
              <FaLock size={14} />
            </div>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-beige-50/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm transition-all placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-peach-200">
              <FaLock size={14} />
            </div>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-beige-50/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm transition-all placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-peach-200">
              <FaLock size={14} />
            </div>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-beige-50/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm transition-all placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3.5 bg-white border border-peach-100 text-gray-600 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-beige-50 transition-all active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white px-6 py-3.5 rounded-2xl flex items-center justify-center space-x-3 text-sm font-bold uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FaSave />
          )}
          <span>{loading ? 'Processing...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
