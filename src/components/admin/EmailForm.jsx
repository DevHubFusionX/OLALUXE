import React from 'react';
import { FaSave, FaEnvelope, FaLock } from 'react-icons/fa';

const EmailForm = ({
  emailData,
  setEmailData,
  onSubmit,
  onCancel,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* New Email */}
        <div className="space-y-2 group">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-peach-200">
              <FaEnvelope size={14} />
            </div>
            <input
              type="email"
              value={emailData.newEmail}
              onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-beige-50/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm transition-all placeholder:text-gray-300"
              placeholder="admin@olaluxe.com"
              required
            />
          </div>
        </div>

        {/* Current Password for Verification */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Identity (Password)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-peach-200">
              <FaLock size={14} />
            </div>
            <input
              type="password"
              value={emailData.currentPassword}
              onChange={(e) => setEmailData({ ...emailData, currentPassword: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 bg-beige-50/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm transition-all placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="order-2 sm:order-1 flex-1 px-6 py-3 sm:py-3.5 bg-white border border-peach-100 text-gray-600 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-beige-50 transition-all active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="order-1 sm:order-2 flex-[2] bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl flex items-center justify-center space-x-3 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FaSave />
          )}
          <span>{loading ? 'Updating...' : 'Update Email'}</span>
        </button>
      </div>
    </form>
  );
};

export default EmailForm;
