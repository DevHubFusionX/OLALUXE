import React, { useState, useEffect } from 'react';
import { FaHome, FaBoxes } from 'react-icons/fa';
import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import ProductForm from './admin/ProductForm';
import ProductList from './admin/ProductList';
import ComboForm from './admin/ComboForm';
import ComboList from './admin/ComboList';
import ComboPreviewModal from './admin/ComboPreviewModal';
import PasswordForm from './admin/PasswordForm';
import EmailForm from './admin/EmailForm';
import EmptyState from './admin/EmptyState';
import { cache } from '../utils/cache';
import { API_ENDPOINTS } from '../utils/api';

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [combos, setCombos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', fabricType: '', texture: '', quality: '', care: '', images: [] });
  const [comboFormData, setComboFormData] = useState({ name: '', description: '', products: [], originalPrice: '', comboPrice: '', savings: '', images: [], existingImages: [], popular: false });
  const [editingComboId, setEditingComboId] = useState(null);
  const [deletingComboId, setDeletingComboId] = useState(null);
  const [showComboPreview, setShowComboPreview] = useState(false);
  const [previewCombo, setPreviewCombo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPopular, setFilterPopular] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({ currentPassword: '', newEmail: '' });
  const [emailLoading, setEmailLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCombos();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.products);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCombos = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.combos);
      const data = await response.json();
      setCombos(data);
    } catch (error) {
      console.error('Error fetching combos:', error);
    }
  };

  const handleSubmit = async (formDataToSend) => {
    setLoading(true);

    try {
      const url = editingId
        ? `${API_ENDPOINTS.admin.products}/${editingId}`
        : API_ENDPOINTS.admin.products;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: formDataToSend
      });

      if (response.status === 401) {
        onLogout();
        return;
      }

      // Clear cache to ensure frontend updates immediately
      cache.clear('products');
      fetchProducts();
      setFormData({ name: '', price: '', category: '', description: '', fabricType: '', texture: '', quality: '', care: '', images: [] });
      setEditingId(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      fabricType: product.fabricType || '',
      texture: product.texture || '',
      quality: product.quality || '',
      care: product.care || '',
      images: []
    });
    setEditingId(product._id);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      setDeletingId(id);
      try {
        const response = await fetch(`${API_ENDPOINTS.admin.products}/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (response.status === 401) {
          onLogout();
          return;
        }

        // Clear cache to ensure frontend updates immediately
        cache.clear('products');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEditCombo = (combo) => {
    setComboFormData({
      name: combo.name,
      description: combo.description,
      products: combo.products.map(p => p._id || p),
      originalPrice: combo.originalPrice,
      comboPrice: combo.comboPrice,
      savings: combo.savings,
      images: [],
      existingImages: combo.images || (combo.image ? [combo.image] : []),
      popular: combo.popular
    });
    setEditingComboId(combo._id);
    setShowAddForm(true);
  };

  const handleDeleteCombo = async (id) => {
    if (confirm('Delete this combo?')) {
      setDeletingComboId(id);
      try {
        const response = await fetch(`${API_ENDPOINTS.admin.combos}/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (response.status === 401) {
          onLogout();
          return;
        }

        cache.clear('combos');
        fetchCombos();
      } catch (error) {
        console.error('Error deleting combo:', error);
      } finally {
        setDeletingComboId(null);
      }
    }
  };

  const handleSubmitCombo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', comboFormData.name);
      formDataToSend.append('description', comboFormData.description);
      formDataToSend.append('products', JSON.stringify(comboFormData.products));
      formDataToSend.append('originalPrice', comboFormData.originalPrice);
      formDataToSend.append('comboPrice', comboFormData.comboPrice);
      formDataToSend.append('savings', comboFormData.savings);
      formDataToSend.append('popular', comboFormData.popular);
      if (comboFormData.images && comboFormData.images.length > 0) {
        comboFormData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      }

      if (editingComboId && comboFormData.existingImages) {
        formDataToSend.append('keptImages', JSON.stringify(comboFormData.existingImages));
      }

      const url = editingComboId
        ? `${API_ENDPOINTS.admin.combos}/${editingComboId}`
        : API_ENDPOINTS.admin.combos;
      const method = editingComboId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: formDataToSend
      });

      if (response.status === 401) {
        onLogout();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(`Error: ${errorData.message || 'Failed to save combo'}`);
        return;
      }

      cache.clear('combos');
      fetchCombos();
      setComboFormData({ name: '', description: '', products: [], originalPrice: '', comboPrice: '', savings: '', images: [], existingImages: [], popular: false });
      setEditingComboId(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving combo:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetComboForm = () => {
    setShowAddForm(false);
    setEditingComboId(null);
    setComboFormData({ name: '', description: '', products: [], originalPrice: '', comboPrice: '', savings: '', images: [], existingImages: [], popular: false });
  };

  const handlePreviewCombo = (combo) => {
    setPreviewCombo(combo);
    setShowComboPreview(true);
  };

  const getSelectedProducts = () => {
    return products.filter(product => comboFormData.products.includes(product._id));
  };

  const calculateTotalOriginalPrice = () => {
    const selectedProducts = getSelectedProducts();
    return selectedProducts.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, '')) || 0;
      return total + price;
    }, 0);
  };

  const filteredCombos = combos.filter(combo => {
    const matchesSearch = combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterPopular || combo.popular;
    return matchesSearch && matchesFilter;
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-beige-50 font-sans selection:bg-peach-100 selection:text-gray-900">
      <AdminHeader
        activeTab={activeTab}
        itemCount={activeTab === 'products' ? products.length : combos.length}
        onAddNew={() => setShowAddForm(true)}
        onChangePassword={() => setShowPasswordForm(true)}
        onChangeEmail={() => setShowEmailForm(true)}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-8 lg:p-12">
        {/* Navigation Tabs */}
        {!showAddForm && !showPasswordForm && !showEmailForm && (
          <div className="mb-12 flex justify-center sm:justify-start">
            <div className="bg-white/40 backdrop-blur-md border border-peach-100 rounded-[2rem] p-2 inline-flex shadow-sm">
              <button
                onClick={() => setActiveTab('products')}
                className={`relative flex items-center space-x-3 px-8 py-3 rounded-[1.5rem] text-xs font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden group ${activeTab === 'products'
                  ? 'bg-gray-900 text-white shadow-xl scale-105'
                  : 'text-gray-400 hover:text-gray-900'
                  }`}
              >
                <FaHome className={`text-sm transition-transform duration-500 ${activeTab === 'products' ? 'text-peach-200' : 'group-hover:scale-110'}`} />
                <span>Full Collection</span>
                <span className={`ml-2 text-[10px] px-2.5 py-0.5 rounded-full transition-colors ${activeTab === 'products' ? 'bg-white/10 text-peach-200' : 'bg-gray-200 text-gray-400'
                  }`}>
                  {products.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('combos')}
                className={`relative flex items-center space-x-3 px-8 py-3 rounded-[1.5rem] text-xs font-bold uppercase tracking-widest transition-all duration-500 overflow-hidden group ${activeTab === 'combos'
                  ? 'bg-gray-900 text-white shadow-xl scale-105'
                  : 'text-gray-400 hover:text-gray-900'
                  }`}
              >
                <FaBoxes className={`text-sm transition-transform duration-500 ${activeTab === 'combos' ? 'text-peach-200' : 'group-hover:scale-110'}`} />
                <span>Curated Ensembles</span>
                <span className={`ml-2 text-[10px] px-2.5 py-0.5 rounded-full transition-colors ${activeTab === 'combos' ? 'bg-white/10 text-peach-200' : 'bg-gray-200 text-gray-400'
                  }`}>
                  {combos.length}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-10 animate-fade-in">
          {/* Main List Views */}
          {!showAddForm && !showPasswordForm && !showEmailForm && (
            <>
              {activeTab === 'products' ? (
                products.length > 0 ? (
                  <ProductList
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    deletingId={deletingId}
                    onAddNew={() => setShowAddForm(true)}
                  />
                ) : (
                  <EmptyState activeTab="products" onAddNew={() => setShowAddForm(true)} />
                )
              ) : (
                combos.length > 0 ? (
                  <ComboList
                    combos={combos}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterPopular={filterPopular}
                    setFilterPopular={setFilterPopular}
                    onEdit={handleEditCombo}
                    onDelete={handleDeleteCombo}
                    onPreview={handlePreviewCombo}
                    editingId={editingComboId}
                    deletingId={deletingComboId}
                    onAddNew={() => setShowAddForm(true)}
                  />
                ) : (
                  <EmptyState activeTab="combos" onAddNew={() => setShowAddForm(true)} />
                )
              )}
            </>
          )}

          {/* Form Overlay Views */}
          {showAddForm && activeTab === 'products' && (
            <ProductForm
              product={editingId ? products.find(p => p._id === editingId) : null}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({ name: '', price: '', category: '', description: '', fabricType: '', texture: '', quality: '', care: '', images: [] });
              }}
              loading={loading}
            />
          )}

          {showAddForm && activeTab === 'combos' && (
            <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-peach-100/50 overflow-hidden animate-scale-in">
              <ComboForm
                formData={comboFormData}
                setFormData={setComboFormData}
                products={products}
                onSubmit={handleSubmitCombo}
                onCancel={resetComboForm}
                loading={loading}
                isEditing={!!editingComboId}
                onPreview={handlePreviewCombo}
                calculatePrice={calculateTotalOriginalPrice}
              />
            </div>
          )}

          {showPasswordForm && (
            <PasswordForm
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              onSubmit={async (e) => {
                e.preventDefault();
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                  alert('New passwords do not match');
                  return;
                }
                setPasswordLoading(true);
                try {
                  const response = await fetch(API_ENDPOINTS.admin.changePassword, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                    body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
                  });
                  if (response.ok) {
                    alert('Password changed successfully');
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  } else {
                    const data = await response.json();
                    alert(data.error);
                  }
                } catch (error) {
                  alert('Failed to change password');
                } finally {
                  setPasswordLoading(false);
                }
              }}
              onCancel={() => { setShowPasswordForm(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
              loading={passwordLoading}
            />
          )}

          {showEmailForm && (
            <EmailForm
              emailData={emailData}
              setEmailData={setEmailData}
              onSubmit={async (e) => {
                e.preventDefault();
                setEmailLoading(true);
                try {
                  const response = await fetch(API_ENDPOINTS.admin.changeEmail, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                    body: JSON.stringify({ currentPassword: emailData.currentPassword, newEmail: emailData.newEmail })
                  });
                  if (response.ok) {
                    alert('Email changed successfully');
                    setShowEmailForm(false);
                    setEmailData({ currentPassword: '', newEmail: '' });
                  } else {
                    const data = await response.json();
                    alert(data.error);
                  }
                } catch (error) {
                  alert('Failed to change email');
                } finally {
                  setEmailLoading(false);
                }
              }}
              onCancel={() => { setShowEmailForm(false); setEmailData({ currentPassword: '', newEmail: '' }); }}
              loading={emailLoading}
            />
          )}
        </div>
      </div>

      {/* Combo Preview Modal */}
      <ComboPreviewModal
        combo={previewCombo}
        isOpen={showComboPreview}
        onClose={() => setShowComboPreview(false)}
        onEdit={handleEditCombo}
      />

      <AdminSidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onClose={() => setSidebarOpen(false)}
        onAddNew={() => setShowAddForm(true)}
        onChangePassword={() => setShowPasswordForm(true)}
        onChangeEmail={() => setShowEmailForm(true)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default AdminPanel;