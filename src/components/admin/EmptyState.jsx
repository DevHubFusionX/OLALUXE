import React from 'react';
import { FaHome, FaBoxes, FaPlus } from 'react-icons/fa';

const EmptyState = ({ activeTab, onAddNew }) => {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-peach-100 overflow-hidden py-24 animate-scale-in">
      <div className="text-center max-w-sm mx-auto">
        <div className="w-20 h-20 mx-auto bg-beige-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-peach-100/20 to-transparent rounded-3xl group-hover:opacity-0 transition-opacity"></div>
          {activeTab === 'products' ? (
            <FaHome className="text-peach-200 text-3xl group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <FaBoxes className="text-peach-200 text-3xl group-hover:scale-110 transition-transform duration-500" />
          )}
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Quiet Collection</h3>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 italic">
          Your boutique catalog is currently awaiting its first masterpiece. Begin by adding a new {activeTab.slice(0, -1)}.
        </p>
        <button
          onClick={onAddNew}
          className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-peach-200/50 flex items-center justify-center mx-auto space-x-3 group"
        >
          <FaPlus size={10} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Curate First {activeTab.slice(0, -1)}</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;