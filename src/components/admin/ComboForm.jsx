import React from 'react';
import { FaBoxes, FaSave, FaTimes } from 'react-icons/fa';

const ComboForm = ({
  formData,
  setFormData,
  products,
  onSubmit,
  onCancel,
  loading,
  isEditing,
  onPreview,
  calculatePrice
}) => {
  const [previews, setPreviews] = React.useState([]);

  React.useEffect(() => {
    if (!formData.images || formData.images.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = formData.images.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [formData.images]);

  const getSelectedProducts = () => {
    return products.filter(product => formData.products.includes(product._id));
  };

  const inputClasses = "w-full px-4 py-3 bg-white/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-peach-300 outline-none transition-all text-sm font-medium placeholder:text-gray-400";
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="p-6 sm:p-10 bg-beige-50/50 backdrop-blur-xl rounded-[2.5rem] animate-slide-up mobile-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-peach-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <FaBoxes className="text-peach-200 text-sm" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              {isEditing ? 'Refine Selection' : 'Forge New Set'}
            </h2>
            <p className="text-[10px] font-bold text-gold-600 uppercase tracking-widest mt-1">Curated Ensemble</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-full transition-all"
        >
          <FaTimes size={18} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        {/* Core Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-serif font-bold text-gray-800 border-b border-peach-50 pb-2">Ensemble Story</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={labelClasses}>Set Identity</label>
                <input
                  type="text"
                  placeholder="e.g., Silk & Suede Pairing"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Boutique Context</label>
                <textarea
                  placeholder="Explain why these pieces belong together..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-serif font-bold text-gray-800 border-b border-peach-50 pb-2">Selected Pieces</h3>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar border border-peach-50 rounded-2xl p-4 bg-white/50">
              {products.map(product => (
                <div key={product._id} className={`flex items-center p-3 rounded-xl border transition-all cursor-pointer ${formData.products.includes(product._id)
                  ? 'bg-gray-900 border-gray-900 shadow-md'
                  : 'bg-white border-peach-50 hover:border-peach-200'
                  }`} onClick={() => {
                    if (formData.products.includes(product._id)) {
                      setFormData({ ...formData, products: formData.products.filter(id => id !== product._id) });
                    } else {
                      setFormData({ ...formData, products: [...formData.products, product._id] });
                    }
                  }}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${formData.products.includes(product._id) ? 'bg-peach-200 border-peach-200' : 'bg-white border-peach-200'
                    }`}>
                    {formData.products.includes(product._id) && <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>}
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${formData.products.includes(product._id) ? 'text-white' : 'text-gray-600'
                    }`}>
                    {product.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Selected: <span className="text-gold-600">{formData.products.length} Items</span>
              </p>
              {formData.products.length > 0 && (
                <button
                  type="button"
                  onClick={() => onPreview({ ...formData, products: getSelectedProducts(), _id: 'preview' })}
                  className="text-[10px] font-bold text-gold-600 uppercase tracking-widest hover:text-gray-900 transition-colors underline underline-offset-4"
                >
                  Inspect Preview
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Boutique Pricing & Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/80 p-8 rounded-3xl border border-peach-100/50 space-y-8 shadow-sm">
            <h3 className="text-sm font-serif font-bold text-gray-800 border-b border-peach-50 pb-2">Set Valuations</h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className={labelClasses}>Original Boutique Total</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="₦0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className={inputClasses}
                    required
                  />
                  {formData.products.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, originalPrice: `₦${calculatePrice().toLocaleString()}` })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-black transition-colors font-bold uppercase tracking-widest"
                    >
                      Sync
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Curated Price</label>
                  <input
                    type="text"
                    placeholder="₦0"
                    value={formData.comboPrice}
                    onChange={(e) => setFormData({ ...formData, comboPrice: e.target.value })}
                    className={inputClasses}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Preferred Savings</label>
                  <input
                    type="text"
                    placeholder="₦0"
                    value={formData.savings}
                    onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-serif font-bold text-gray-800 border-b border-peach-50 pb-2">Visual Gallery</h3>
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-6 py-10 border-2 border-dashed border-peach-100 rounded-3xl flex flex-col items-center justify-center transition-all bg-white/50 group-hover:bg-peach-50 group-hover:border-peach-200">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaBoxes className="text-gold-600 text-sm" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
                    Imagery for Exhibit<br />
                    <span className="text-gold-600 mt-1 block">Selected: {formData.images?.length || 0} Artifacts</span>
                  </p>
                </div>
              </div>

              {/* Image Preview Grid */}
              {(previews.length > 0 || (isEditing && (formData.images?.length > 0 || formData.image))) && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {/* Existing Images (if editing and images are strings/urls) */}
                  {isEditing && (Array.isArray(formData.existingImages) ? formData.existingImages : (formData.image ? [formData.image] : [])).map((img, i) => typeof img === 'string' && (
                    <div key={`existing-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden border border-peach-100 bg-white shadow-sm transition-all hover:shadow-md">
                      <img src={img} alt="Existing" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                        <span className="text-[8px] text-white font-bold uppercase tracking-widest px-2 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10">Kept</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newKept = formData.existingImages.filter((_, idx) => idx !== i);
                            setFormData({ ...formData, existingImages: newKept });
                          }}
                          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* New Previews */}
                  {previews.map((url, i) => (
                    <div key={`new-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden border border-peach-200 bg-white shadow-md animate-scale-in">
                      <img src={url} alt="New Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = [...formData.images];
                          newFiles.splice(i, 1);
                          setFormData({ ...formData, images: newFiles });
                        }}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-3 p-4 bg-white/40 border border-peach-50 rounded-2xl">
                <div className="bg-peach-200 border-peach-300">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 rounded border border-peach-200 text-gray-900 focus:ring-peach-200"
                  />
                </div>
                <label htmlFor="popular" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest cursor-pointer">Mark as Boutique Highlight</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-peach-100">
          <button
            type="submit"
            disabled={loading || formData.products.length === 0}
            className="flex-[2] bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white px-10 py-5 rounded-3xl font-bold transition-all shadow-xl hover:shadow-peach-200/50 flex items-center justify-center space-x-4 uppercase tracking-[0.2em] text-xs group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <FaSave className="text-peach-200 group-hover:scale-110 transition-transform" />
                <span>Archive Curated Set</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-10 py-5 border border-peach-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-400 rounded-3xl font-bold transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComboForm;