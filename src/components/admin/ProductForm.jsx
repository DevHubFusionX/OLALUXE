import React, { useState } from 'react';
import { FaSave, FaTimes, FaPlus, FaTrash, FaBoxes, FaChevronRight, FaChevronLeft, FaCheckCircle } from 'react-icons/fa';
import Button from '../ui/Button';
import { FaImage } from 'react-icons/fa';

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    category: product?.category || '',
    description: product?.description || '',
    material: product?.material || product?.fabricType || '',
    style: product?.style || product?.texture || '',
    quality: product?.quality || '',
    care: product?.care || '',
    colors: product?.colors || [],
    images: []
  });
  const [previews, setPreviews] = useState([]);
  const [keptImages, setKeptImages] = useState(product?.images || (product?.image ? [product.image] : []));
  const [currentStep, setCurrentStep] = useState(1);
  const [newColor, setNewColor] = useState('');
  const [activeColorIdx, setActiveColorIdx] = useState(null);

  React.useEffect(() => {
    if (!formData.images || formData.images.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = formData.images.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [formData.images]);

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        description: product.description || '',
        material: product.material || product.fabricType || '',
        style: product.style || product.texture || '',
        quality: product.quality || '',
        care: product.care || '',
        colors: product.colors || [],
        images: []
      });
      setKeptImages(product.images || (product.image ? [product.image] : []));
    }
  }, [product]);

  const addColor = () => {
    if (newColor.trim()) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { name: newColor.trim(), images: [] }]
      });
      setNewColor('');
    }
  };

  const removeColor = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: updatedColors });
  };

  const toggleImageForColor = (colorIdx, imageUrl) => {
    const updatedColors = [...formData.colors];
    const color = updatedColors[colorIdx];
    if (color.images.includes(imageUrl)) {
      color.images = color.images.filter(img => img !== imageUrl);
    } else {
      color.images = [...color.images, imageUrl];
    }
    setFormData({ ...formData, colors: updatedColors });
  };

  const allAvailableImages = [...keptImages, ...previews];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        if (formData.images && formData.images.length > 0) {
          formData.images.forEach(image => submitData.append('images', image));
        }
      } else if (key === 'colors') {
        submitData.append('colors', JSON.stringify(formData.colors));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    if (product) {
      submitData.append('keptImages', JSON.stringify(keptImages));
    }

    onSubmit(submitData);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const inputClasses = "w-full px-4 py-3 bg-white/50 border border-peach-100 rounded-2xl focus:ring-2 focus:ring-peach-200 focus:border-peach-300 outline-none transition-all text-sm font-medium placeholder:text-gray-400";
  const labelClasses = "block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";

  const steps = [
    { id: 1, title: 'Identity', icon: <FaPlus className="text-xs" /> },
    { id: 2, title: 'Gallery', icon: <FaPlus className="text-xs" /> },
    { id: 3, title: 'Specs', icon: <FaBoxes className="text-xs" /> },
    { id: 4, title: 'Review', icon: <FaCheckCircle className="text-xs" /> }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-peach-100/50 overflow-hidden mb-10 animate-fade-in relative">
      {/* Dynamic Header */}
      <div className="bg-gray-900 p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-peach-200/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center space-x-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ${loading ? 'bg-gold-500 animate-pulse' : 'bg-white/10 backdrop-blur-md'}`}>
              <span className="text-peach-200 text-xl">{steps[currentStep - 1].icon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                {product ? 'Refine' : 'Add'} {formData.name || 'New Piece'}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-[10px] font-bold text-peach-200 uppercase tracking-[0.2em]">Step {currentStep} of 4</span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{steps[currentStep - 1].title}</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-2xl backdrop-blur-sm">
            {steps.map((s) => (
              <div
                key={s.id}
                title={s.title}
                className={`w-10 h-2 rounded-full transition-all duration-500 ${currentStep >= s.id ? 'bg-peach-200 shadow-lg shadow-peach-200/30' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Identity & Basics */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-2">
                <label className={labelClasses}>Piece Identity</label>
                <input
                  type="text"
                  placeholder="e.g., Signature Gold Cuff"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Boutique Valuation</label>
                  <input
                    type="text"
                    placeholder="₦0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={inputClasses}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Catalog Class</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select Category...</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Chains">Chains</option>
                    <option value="Watches">Watches</option>
                    <option value="Bags">Bags</option>
                    <option value="Hair Accessories">Hair Accessories</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Rings">Rings</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Visual Gallery */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-slide-up">
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full px-6 py-12 border-2 border-dashed border-peach-100 rounded-[2rem] flex flex-col items-center justify-center transition-all bg-beige-50/50 group-hover:bg-peach-50 group-hover:border-peach-200 relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <FaPlus className="text-gold-600 text-xl" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-gray-900 mb-1">Upload Exhibition Imagery</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center max-w-[200px]">
                    Drag and drop or click to add visual assets to your collection
                  </p>
                </div>
              </div>

              {/* Combined Preview Grid */}
              {(previews.length > 0 || keptImages.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Kept Existing Images */}
                  {keptImages.map((img, i) => (
                    <div key={`kept-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden border border-peach-100 bg-white shadow-sm transition-all hover:shadow-md animate-scale-in">
                      <img src={img} alt="Current" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                        <span className="text-[8px] text-white font-bold uppercase tracking-widest px-2 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10">Kept</span>
                        <button
                          type="button"
                          onClick={() => setKeptImages(keptImages.filter((_, idx) => idx !== i))}
                          className="w-10 h-10 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 active:scale-90"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* New Previews */}
                  {previews.map((url, i) => (
                    <div key={`new-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gold-500/50 bg-white shadow-lg animate-scale-in">
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                        <span className="text-[8px] text-white font-bold uppercase tracking-widest px-2 py-1 bg-gold-600 rounded-full shadow-sm">New</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...formData.images];
                          newImages.splice(i, 1);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Specifications & Variation */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-2">
                <label className={labelClasses}>Boutique Narrative</label>
                <textarea
                  placeholder="Captivate your audience with a description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className={`${inputClasses} resize-none min-h-[120px]`}
                />
              </div>

              {/* Color Variation Section */}
              <div className="bg-beige-50/50 p-6 rounded-[2rem] border border-peach-100/50 space-y-4">
                <label className={labelClasses}>Color Variations</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add color (e.g., Gold, Emerald)"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                    className={`${inputClasses} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="bg-gray-900 text-white px-6 rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="bg-white border border-peach-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm animate-scale-in">
                        <span className="text-sm font-medium text-gray-700">{color.name}</span>
                        <button
                          type="button"
                          onClick={() => setActiveColorIdx(activeColorIdx === idx ? null : idx)}
                          className={`p-1 rounded-full transition-colors ${color.images.length > 0 ? 'text-gold-600 bg-gold-50' : 'text-gray-400 hover:bg-gray-100'}`}
                          title="Manage Images for this Color"
                        >
                          <FaImage size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeColor(idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>

                      {activeColorIdx === idx && (
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-peach-100 shadow-inner mt-1 animate-slide-up">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Map Images to {color.name}</p>
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {allAvailableImages.map((img, imgIdx) => (
                              <button
                                key={imgIdx}
                                type="button"
                                onClick={() => toggleImageForColor(idx, img)}
                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${color.images.includes(img) ? 'border-gold-500 ring-2 ring-gold-100' : 'border-transparent hover:border-peach-200'}`}
                              >
                                <img src={img} className="w-full h-full object-cover" alt="Select" />
                                {color.images.includes(img) && (
                                  <div className="absolute inset-0 bg-gold-500/20 flex items-center justify-center">
                                    <FaCheckCircle className="text-white drop-shadow-md" size={16} />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                          {allAvailableImages.length === 0 && (
                            <p className="text-[10px] text-gray-400 italic">Upload images in Step 2 first.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {formData.colors.length === 0 && (
                    <p className="text-[10px] text-gray-400 italic">No color variations added yet.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Material</label>
                  <input
                    type="text"
                    placeholder="e.g., 24K Gold, Sterling Silver, Stainless Steel"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Style</label>
                  <input
                    type="text"
                    placeholder="e.g., Minimalist, Vintage, Boho, Luxury"
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Grade & Quality</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium, Standard, Luxury"
                    value={formData.quality}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Preservation</label>
                  <input
                    type="text"
                    placeholder="e.g., Avoid water, clean with soft cloth"
                    value={formData.care}
                    onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Review */}
          {currentStep === 4 && (
            <div className="animate-slide-up space-y-6 sm:space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                {/* Visual Inventory */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Exhibition Assets ({keptImages.length + previews.length})</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
                    {[...keptImages, ...previews].map((img, i) => (
                      <div key={i} className="aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-peach-50 shadow-sm">
                        <img src={img} className="w-full h-full object-cover" alt="Review" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Overview */}
                <div className="bg-beige-50/50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-peach-100/50 space-y-4 sm:space-y-6">
                  <h4 className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Archival Summary</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Identity</p>
                      <p className="text-lg sm:text-xl font-serif font-bold text-gray-900">{formData.name}</p>
                    </div>
                    <div className="flex gap-6 sm:gap-10">
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Valuation</p>
                        <p className="text-base sm:text-lg font-serif font-bold text-gray-900">{formData.price}</p>
                      </div>
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-bold text-gold-600 uppercase tracking-widest mb-1">Class</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-700">{formData.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gold-50 border border-gold-100 rounded-2xl sm:rounded-3xl flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                  <FaSave size={12} className="sm:size-[14px]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gold-800 uppercase tracking-widest">Ready for Catalog Entry</p>
                  <p className="text-[9px] sm:text-[10px] font-medium text-gold-600 leading-tight">Ensure all details meet Olaluxe.ng standards before committing to the archival database.</p>
                </div>
              </div>
            </div>
          )}

          {/* Progressive Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-10 py-5 border-2 border-peach-100 hover:bg-beige-50 text-gray-500 rounded-2xl font-bold transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>Back</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && (!formData.name || !formData.price || !formData.category)) {
                    alert('Please complete all identification fields.');
                    return;
                  }
                  setCurrentStep(prev => prev + 1);
                }}
                className="flex-1 bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-peach-200/50 flex items-center justify-center space-x-4 uppercase tracking-[0.2em] text-xs group"
              >
                <span>Continue</span>
                <FaChevronRight className="text-peach-200 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl hover:shadow-peach-200/50 flex items-center justify-center space-x-4 uppercase tracking-[0.2em] text-xs group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaSave className="text-peach-200 group-hover:scale-110 transition-transform" />
                    <span>Archive Piece</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="px-8 py-5 text-gray-400 hover:text-red-500 font-bold transition-all text-xs uppercase tracking-[0.2em]"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;