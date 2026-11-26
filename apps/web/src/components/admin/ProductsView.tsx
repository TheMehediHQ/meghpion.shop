import React, { useState } from 'react';
import type { AdminProduct } from './mockData';
import { PRODUCT_CATEGORIES } from '@meghpiyon/shared';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon, CloseIcon } from './icons';

interface ProductsViewProps {
  products: AdminProduct[];
  onSaveProduct: (product: AdminProduct) => void;
  onDeleteProduct: (productId: string) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  canDelete?: boolean;
}

export function ProductsView({
  products,
  onSaveProduct,
  onDeleteProduct,
  isAddModalOpen,
  setIsAddModalOpen,
  canDelete = true,
}: ProductsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<AdminProduct>>({
    name: '',
    nameBn: '',
    slug: '',
    price: 1000,
    discountPrice: undefined,
    stock: 10,
    category: 'custom-gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    tags: ['Curated', 'New'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    description: '',
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameBn: '',
      slug: '',
      price: 1000,
      discountPrice: undefined,
      stock: 15,
      category: 'custom-gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      tags: ['Curated'],
      isFeatured: false,
      isAvailable: true,
      giftWrapAvailable: true,
      description: 'A special handcrafted gift from Meghpeon.',
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      name,
      slug: editingProduct ? prev.slug || autoSlug : autoSlug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const productToSave: AdminProduct = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.name || 'Untitled Gift',
      nameBn: formData.nameBn || '',
      slug: formData.slug || `gift-${Date.now()}`,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock ?? 0),
      category: formData.category || 'custom-gifts',
      image: formData.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      tags: Array.isArray(formData.tags)
        ? formData.tags
        : String(formData.tags || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
      isFeatured: Boolean(formData.isFeatured),
      isAvailable: Boolean(formData.isAvailable),
      giftWrapAvailable: Boolean(formData.giftWrapAvailable),
      rating: editingProduct ? editingProduct.rating : 5,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      description: formData.description || '',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0],
    };

    onSaveProduct(productToSave);
    closeModal();
  };

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      (prod.nameBn && prod.nameBn.includes(search)) ||
      prod.slug.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;

    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = prod.stock > 0 && prod.stock <= 5;
    if (stockFilter === 'out') matchesStock = prod.stock === 0;
    if (stockFilter === 'in') matchesStock = prod.stock > 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-espresso">Product Management</h2>
          <p className="text-xs text-clay mt-0.5">
            Create, update stock, and curate gift items for the Meghpeon shop
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] text-xs font-semibold shadow-sm transition-colors"
        >
          <PlusIcon /> Add New Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-clay">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, Bengali name, or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso placeholder:text-clay-light focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-2 px-3 text-xs bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameEn} ({cat.nameBn})
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="py-2 px-3 text-xs bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
          >
            <option value="all">All Stock Status</option>
            <option value="in">In Stock</option>
            <option value="low">Low Stock (≤ 5)</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-parchment-light border border-parchment-line rounded-[4px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-line/70">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-clay">
                    No products found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-parchment-deep/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-[3px] object-cover border border-parchment-line flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-espresso text-sm">{prod.name}</p>
                          <p className="text-xs text-clay font-bengali">{prod.nameBn}</p>
                          <span className="text-[10px] text-clay-light font-mono">slug: {prod.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-espresso">
                      <span className="px-2 py-0.5 rounded-[2px] bg-parchment-deep text-burgundy border border-parchment-border font-medium">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-espresso">৳ {prod.price}</div>
                      {prod.discountPrice && (
                        <div className="text-[10px] text-emerald-700 font-medium">
                          Disc: ৳ {prod.discountPrice}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.stock === 0
                            ? 'bg-crimson-100 text-crimson-700'
                            : prod.stock <= 5
                            ? 'bg-gold-100 text-gold-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          onSaveProduct({ ...prod, isFeatured: !prod.isFeatured })
                        }
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium border ${
                          prod.isFeatured
                            ? 'bg-gold-100 text-gold-800 border-gold-400/50'
                            : 'bg-parchment-50 text-clay border-parchment-border'
                        }`}
                      >
                        {prod.isFeatured ? '★ Featured' : 'Standard'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          onSaveProduct({ ...prod, isAvailable: !prod.isAvailable })
                        }
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-medium border ${
                          prod.isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-parchment-deep text-clay border-parchment-border'
                        }`}
                      >
                        {prod.isAvailable ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(prod)}
                          title="Edit Product"
                          className="p-1.5 rounded-[3px] hover:bg-parchment-deep text-clay hover:text-burgundy transition-colors"
                        >
                          <EditIcon />
                        </button>
                        {canDelete && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                                onDeleteProduct(prod.id);
                              }
                            }}
                            title="Delete Product"
                            className="p-1.5 rounded-[3px] hover:bg-crimson-50 text-clay hover:text-crimson-700 transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-parchment-light rounded-[4px] shadow-2xl border border-parchment-line w-full max-w-2xl my-8 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-parchment-line pb-3">
              <h3 className="font-display text-lg font-semibold text-espresso">
                {editingProduct ? 'Edit Gift Item' : 'Add New Gift Product'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-[3px] text-clay hover:text-espresso hover:bg-parchment-deep"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">
                    Product Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={handleNameChange}
                    placeholder="e.g. Royal Silk Scarf & Candle Box"
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">
                    Product Title (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={formData.nameBn || ''}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    placeholder="যেমন: রয়্যাল সিল্ক স্কার্ফ ও ক্যান্ডেল বক্স"
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Price (BDT ৳) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Discount Price (BDT)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.discountPrice || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Inventory Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock ?? 10}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-espresso">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-[3px] border border-parchment-line flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Description</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                  placeholder="Short description of this gift item..."
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded text-burgundy focus:ring-gold-500"
                  />
                  <span className="text-espresso font-medium">Available for purchase</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-burgundy focus:ring-gold-500"
                  />
                  <span className="text-espresso font-medium">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.giftWrapAvailable}
                    onChange={(e) =>
                      setFormData({ ...formData, giftWrapAvailable: e.target.checked })
                    }
                    className="rounded text-burgundy focus:ring-gold-500"
                  />
                  <span className="text-espresso font-medium">Gift Wrap Available</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-parchment-line">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-clay hover:text-espresso hover:bg-parchment-deep rounded-[3px] font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] font-semibold shadow-sm transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
