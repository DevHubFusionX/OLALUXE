import React from 'react';
import { FaBoxes, FaSearch, FaFilter } from 'react-icons/fa';
import ComboCard from './ComboCard';

const ComboList = ({
  combos,
  searchTerm,
  setSearchTerm,
  filterPopular,
  setFilterPopular,
  onEdit,
  onDelete,
  onPreview,
  editingId,
  deletingId,
  onAddNew
}) => {
  const filteredCombos = combos.filter(combo => {
    const matchesSearch = combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterPopular || combo.popular;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-peach-100 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-peach-50 bg-gradient-to-r from-white/40 to-transparent">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Curated Sets</h2>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">Manage bundled boutique collections</p>
          </div>
          <button
            onClick={onAddNew}
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md group"
          >
            <FaBoxes className="text-xs" />
            <span className="tracking-wide">Add New Set</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Search and Filter Controls */}
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm group-focus-within:text-gold-600 transition-colors" />
            <input
              type="text"
              placeholder="Search curated sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-white/50 border border-peach-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-peach-200 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/50 border border-peach-50 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl">
            <div className="flex items-center space-x-2 sm:border-r border-peach-50 sm:pr-4 sm:mr-2">
              <FaFilter className="text-gold-600 text-[10px] sm:text-xs" />
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter</span>
            </div>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filterPopular}
                  onChange={(e) => setFilterPopular(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 rounded-md transition-all ${filterPopular ? 'bg-gray-900 border-gray-900' : 'bg-white border-peach-100 group-hover:border-peach-200'}`}>
                  {filterPopular && <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-peach-200 rounded-full"></div></div>}
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">Featured Highlights</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredCombos.map((combo) => (
            <ComboCard
              key={combo._id}
              combo={combo}
              onEdit={onEdit}
              onDelete={onDelete}
              onPreview={onPreview}
              isEditing={editingId === combo._id}
              isDeleting={deletingId === combo._id}
            />
          ))}
        </div>

        {/* No Results Message */}
        {filteredCombos.length === 0 && combos.length > 0 && (
          <div className="text-center py-20 bg-beige-50/50 rounded-[2rem] border border-dashed border-peach-100 mt-8">
            <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <FaSearch className="text-peach-200 text-xl" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No matches discovered</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6">
              Refine your search or filters to find the perfect curated set for your catalog.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterPopular(false);
              }}
              className="text-gold-600 text-xs font-bold uppercase tracking-widest hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Reset Discovery
            </button>
          </div>
        )}

        {/* Combo Statistics */}
        {combos.length > 0 && (
          <div className="mt-10 p-6 bg-gray-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-peach-200/10 to-transparent rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center md:text-left">
                <p className="text-2xl font-serif font-bold text-peach-200">{combos.length}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Curations</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-serif font-bold text-white">{combos.filter(c => c.popular).length}</p>
                <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Highlights</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {combos.reduce((acc, combo) => acc + (combo.products?.length || 0), 0)}
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Pieces</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {Math.round(combos.reduce((acc, combo) => acc + (combo.products?.length || 0), 0) / combos.length) || 0}
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pieces Per Set</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboList;