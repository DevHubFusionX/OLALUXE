import React, { useState, useEffect } from 'react';
import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import AdminTabs from './admin/AdminTabs';
import AdminContent from './admin/AdminContent';
import AdminSecurityModals from './admin/AdminSecurityModals';
import ComboPreviewModal from './admin/ComboPreviewModal';
import { cache } from '../utils/cache';
import { API_ENDPOINTS } from '../utils/api';

const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [combos, setCombos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '', material: '', style: '', quality: '', care: '', images: [] });
  const [comboFormData, setComboFormData] = useState({ name: '', description: '', products: [], originalPrice: '', comboPrice: '', savings: '', images: [], existingImages: [], popular: false });
  const [editingComboId, setEditingComboId] = useState(null);
  const [deletingComboId, setDeletingComboId] = useState(null);
  const [showComboPreview, setShowComboPreview] = useState(false);
  const [previewCombo, setPreviewCombo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPopular, setFilterPopular] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
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

      cache.clear('products');
      fetchProducts();
      setFormData({ name: '', price: '', category: '', description: '', material: '', style: '', quality: '', care: '', images: [] });
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
      material: product.material || product.fabricType || '',
      style: product.style || product.texture || '',
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
        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          productCount={products.length}
          comboCount={combos.length}
        />

        <AdminContent
          activeTab={activeTab}
          showAddForm={showAddForm}
          products={products}
          combos={combos}
          editingId={editingId}
          deletingId={deletingId}
          editingComboId={editingComboId}
          deletingComboId={deletingComboId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPopular={filterPopular}
          setFilterPopular={setFilterPopular}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleEditCombo={handleEditCombo}
          handleDeleteCombo={handleDeleteCombo}
          handlePreviewCombo={handlePreviewCombo}
          handleSubmit={handleSubmit}
          handleSubmitCombo={handleSubmitCombo}
          resetComboForm={resetComboForm}
          setShowAddForm={setShowAddForm}
          setEditingId={setEditingId}
          setFormData={setFormData}
          comboFormData={comboFormData}
          setComboFormData={setComboFormData}
          calculateTotalOriginalPrice={calculateTotalOriginalPrice}
          loading={loading}
        />
      </div>

      <ComboPreviewModal
        combo={previewCombo}
        isOpen={showComboPreview}
        onClose={() => setShowComboPreview(false)}
        onEdit={handleEditCombo}
      />

      <AdminSecurityModals
        showPasswordForm={showPasswordForm}
        setShowPasswordForm={setShowPasswordForm}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        getAuthHeaders={getAuthHeaders}
        onLogout={onLogout}
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