import React from 'react';
import ProductList from './ProductList';
import ComboList from './ComboList';
import EmptyState from './EmptyState';
import ProductForm from './ProductForm';
import ComboForm from './ComboForm';
import OrderList from './OrderList';

const AdminContent = ({
    activeTab,
    showAddForm,
    products,
    combos,
    editingId,
    deletingId,
    editingComboId,
    deletingComboId,
    searchTerm,
    setSearchTerm,
    filterPopular,
    setFilterPopular,
    handleEdit,
    handleDelete,
    handleEditCombo,
    handleDeleteCombo,
    handlePreviewCombo,
    handlePreviewOrder,
    handleSubmit,
    handleSubmitCombo,
    resetComboForm,
    setShowAddForm,
    setEditingId,
    setFormData,
    comboFormData,
    setComboFormData,
    calculateTotalOriginalPrice,
    loading,
    orders
}) => {
    return (
        <div className="space-y-10 animate-fade-in">
            {/* Main List Views */}
            {!showAddForm && (
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
                    ) : activeTab === 'combos' ? (
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
                    ) : (
                        <OrderList
                            orders={orders}
                            onPreview={handlePreviewOrder}
                            loading={loading}
                        />
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
                        setFormData({ name: '', price: '', category: '', description: '', material: '', style: '', quality: '', care: '', images: [] });
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
        </div>
    );
};

export default AdminContent;
