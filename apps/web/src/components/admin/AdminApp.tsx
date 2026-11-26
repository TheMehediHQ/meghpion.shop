import React, { useState, useEffect } from 'react';
import type {
  AdminProduct,
  AdminOrder,
  AdminCustomer,
  StoreSettings,
} from './mockData';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_SETTINGS,
  getStoredData,
  setStoredData,
} from './mockData';
import {
  fetchProducts,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  fetchOrdersApi,
  updateOrderStatusApi,
  changePasswordApi,
} from '../../lib/api';
import { AdminAuth } from './AdminAuth';
import { DashboardView } from './DashboardView';
import { ProductsView } from './ProductsView';
import { OrdersView } from './OrdersView';
import { CustomersView } from './CustomersView';
import { EmployeesView } from './EmployeesView';
import { SettingsView } from './SettingsView';
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingBagIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  ArrowLeftIcon,
} from './icons';
import { BRAND } from '@meghpiyon/shared';

const mapApiToAdminProduct = (p: any): AdminProduct => ({
  id: p._id || p.id,
  name: p.name,
  nameBn: p.nameBn || '',
  slug: p.slug,
  price: Number(p.price) || 0,
  discountPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
  stock: Number(p.stock ?? 10),
  category: p.category || 'custom-gifts',
  image: (p.images && p.images[0]) || p.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
  tags: Array.isArray(p.tags) ? p.tags : ['Curated'],
  isFeatured: Boolean(p.isFeatured),
  isAvailable: p.isAvailable !== false,
  giftWrapAvailable: p.giftWrapAvailable !== false,
  rating: p.rating || 5,
  reviewCount: p.reviewCount || 0,
  description: p.description || '',
  createdAt: p.createdAt || new Date().toISOString(),
});

const mapApiToAdminOrder = (o: any): AdminOrder => ({
  id: o._id || o.id,
  orderNumber: o.orderNumber,
  customerName: o.shippingAddress?.fullName || 'Anonymous Customer',
  customerPhone: o.shippingAddress?.phone || '',
  customerEmail: o.shippingAddress?.email || '',
  division: o.shippingAddress?.division || 'Dhaka',
  district: o.shippingAddress?.district || '',
  addressLine: o.shippingAddress?.addressLine || '',
  items: (o.items || []).map((i: any) => ({
    productId: i.productId,
    name: i.name,
    price: Number(i.price) || 0,
    quantity: Number(i.quantity) || 1,
    giftWrap: Boolean(i.giftWrap),
    customText: i.giftMessage || i.customText,
  })),
  subtotal: Number(o.subtotal) || 0,
  deliveryFee: Number(o.deliveryFee) || 0,
  giftWrapFee: Number(o.giftWrapFee) || 0,
  discount: Number(o.discount) || 0,
  total: Number(o.total) || 0,
  paymentMethod: o.paymentMethod || 'cod',
  paymentStatus: o.paymentStatus || 'pending',
  orderStatus: o.orderStatus || 'pending',
  giftMessage: o.giftNote || o.giftMessage,
  createdAt: o.createdAt || new Date().toISOString(),
});

export function AdminApp() {
  const [user, setUser] = useState<{ id?: string; email: string; name: string; role: string } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'employees' | 'settings'>('dashboard');

  // Stored state
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  // Modals
  const [selectedOrderModal, setSelectedOrderModal] = useState<AdminOrder | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [pwdSaving, setPwdSaving] = useState(false);

  const loadLiveData = async () => {
    try {
      const [apiProds, apiOrders] = await Promise.all([
        fetchProducts('', true),
        fetchOrdersApi(),
      ]);

      if (apiProds && apiProds.length > 0) {
        const mapped = apiProds.map(mapApiToAdminProduct);
        setProducts(mapped);
        setStoredData('products', mapped);
      } else {
        setProducts(getStoredData<AdminProduct[]>('products', INITIAL_PRODUCTS));
      }

      if (apiOrders && apiOrders.length > 0) {
        const mapped = apiOrders.map(mapApiToAdminOrder);
        setOrders(mapped);
        setStoredData('orders', mapped);
      } else {
        setOrders(getStoredData<AdminOrder[]>('orders', INITIAL_ORDERS));
      }
    } catch (err) {
      console.warn('Admin loadLiveData fallback to cache:', err);
      setProducts(getStoredData<AdminProduct[]>('products', INITIAL_PRODUCTS));
      setOrders(getStoredData<AdminOrder[]>('orders', INITIAL_ORDERS));
    }
  };

  // Initialize from LocalStorage + Backend API (MongoDB Atlas) on mount
  useEffect(() => {
    setIsClient(true);
    const savedUser = getStoredData<{ id?: string; email: string; name: string; role: string } | null>('user', null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('meghpiyon_admin_token') : null;
    if (savedUser && token) {
      setUser(savedUser);
      if (savedUser.role !== 'admin') {
        setActiveTab('orders');
      }
      loadLiveData();
    }
    setCustomers(getStoredData<AdminCustomer[]>('customers', INITIAL_CUSTOMERS));
    setSettings(getStoredData<StoreSettings>('settings', INITIAL_SETTINGS));
  }, []);

  const handleLoginSuccess = (
    loggedInUser: { id?: string; email: string; name: string; role: string },
    token: string
  ) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meghpiyon_admin_token', token);
    }
    setUser(loggedInUser);
    setStoredData('user', loggedInUser);
    setActiveTab(loggedInUser.role === 'admin' ? 'dashboard' : 'orders');
    loadLiveData();
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('meghpiyon_admin_token');
    }
    setUser(null);
    setStoredData('user', null);
  };

  // Product actions connected to MongoDB Atlas
  const handleSaveProduct = async (product: AdminProduct) => {
    const isNew = !product.id || product.id.startsWith('prod-');
    const payload = {
      name: product.name,
      nameBn: product.nameBn,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      category: product.category,
      description: product.description,
      images: [product.image],
      tags: product.tags,
      isFeatured: product.isFeatured,
      isAvailable: product.isAvailable,
      giftWrapAvailable: product.giftWrapAvailable,
    };

    try {
      if (isNew) {
        const created = await createProductApi(payload);
        const mapped = mapApiToAdminProduct(created);
        setProducts((prev) => [mapped, ...prev.filter((p) => p.id !== product.id)]);
      } else {
        const updated = await updateProductApi(product.id, payload);
        const mapped = mapApiToAdminProduct(updated);
        setProducts((prev) => prev.map((p) => (p.id === product.id ? mapped : p)));
      }
    } catch (err) {
      console.error('Failed to sync product with Atlas backend:', err);
      // Optimistic update
      setProducts((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        return exists ? prev.map((p) => (p.id === product.id ? product : p)) : [product, ...prev];
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      if (!productId.startsWith('prod-')) {
        await deleteProductApi(productId);
      }
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error('Failed to delete product from Atlas backend:', err);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  // Order actions connected to MongoDB Atlas
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      if (!orderId.startsWith('ord-')) {
        await updateOrderStatusApi(orderId, { orderStatus: newStatus });
      }
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o)));
    } catch (err) {
      console.error('Failed to update order status in backend:', err);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o)));
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, newPaymentStatus: string) => {
    try {
      if (!orderId.startsWith('ord-')) {
        await updateOrderStatusApi(orderId, { paymentStatus: newPaymentStatus });
      }
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o)));
    } catch (err) {
      console.error('Failed to update payment status in backend:', err);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o)));
    }
  };

  // Settings
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    setStoredData('settings', newSettings);
  };

  const handleResetData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setSettings(INITIAL_SETTINGS);
    setStoredData('products', INITIAL_PRODUCTS);
    setStoredData('orders', INITIAL_ORDERS);
    setStoredData('customers', INITIAL_CUSTOMERS);
    setStoredData('settings', INITIAL_SETTINGS);
    alert('Demo data has been restored to default.');
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading Meghpeon Admin Portal...</div>
      </div>
    );
  }

  // If not logged in, show login card
  if (!user) {
    return <AdminAuth onLoginSuccess={handleLoginSuccess} />;
  }

  const pendingCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-parchment paper-grain flex flex-col md:flex-row antialiased text-espresso">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-ink-deep text-parchment/80 flex-shrink-0 flex flex-col border-r border-gold-500/20">
        {/* Brand header */}
        <div className="p-5 border-b border-parchment/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold-400/50 bg-gradient-to-br from-crimson-600 to-ink text-gold-200 flex items-center justify-center font-display font-bold text-base shadow">
              M
            </div>
            <div>
              <span className="font-display font-semibold text-parchment tracking-tight leading-none block text-base">
                {BRAND.name}
              </span>
              <span className="text-[9.5px] text-gold-400 font-semibold tracking-[0.2em] uppercase">
                {isAdmin ? 'Admin Portal' : 'Staff Portal'}
              </span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded-[2px] text-[9px] bg-ink text-gold-300 border border-gold-500/25 uppercase">
            {user.role}
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1.5 flex-1">
          {isAdmin && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                  : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </div>
            </button>
          )}

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PackageIcon />
              <span>Orders & Parcels</span>
            </div>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-gold-400 text-ink-deep font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBagIcon />
              <span>Gift Products</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] bg-black/30 text-gold-300 border border-gold-500/20">
              {products.length}
            </span>
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
                  activeTab === 'customers'
                    ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                    : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UsersIcon />
                  <span>Customers</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] bg-black/30 text-gold-300 border border-gold-500/20">
                  {customers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('employees')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
                  activeTab === 'employees'
                    ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                    : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UsersIcon />
                  <span>Team & Employees</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-xs font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-burgundy text-gold-200 font-semibold border border-gold-500/40 shadow-sm'
                    : 'text-parchment/65 hover:text-parchment hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <SettingsIcon />
                  <span>Store Settings</span>
                </div>
              </button>
            </>
          )}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-parchment/10 space-y-1">
          <button
            onClick={() => {
              setIsPasswordModalOpen(true);
              setPwdMsg(null);
              setCurrentPwd('');
              setNewPwd('');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[3px] text-xs text-gold-300 hover:text-gold-200 hover:bg-white/[0.05] transition-colors"
          >
            <SettingsIcon />
            <span>Change My Password</span>
          </button>

          <a
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[3px] text-xs text-parchment/65 hover:text-parchment hover:bg-white/[0.05] transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Storefront</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[3px] text-xs text-crimson-300 hover:text-crimson-200 hover:bg-white/[0.05] transition-colors"
          >
            <LogOutIcon />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-parchment-light border-b border-parchment-line px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-clay text-xs uppercase tracking-[0.16em]">Admin /</span>
            <h1 className="font-display text-base font-semibold text-espresso capitalize tracking-tight">
              {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-espresso block leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-gold-700 font-medium block">
                {user.email}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-ink text-gold-200 font-display font-bold flex items-center justify-center text-xs border border-gold-500/40">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Tab View Container */}
        <main className="p-6 flex-1">
          {activeTab === 'dashboard' && isAdmin && (
            <DashboardView
              products={products}
              orders={orders}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onViewOrder={(order) => {
                setSelectedOrderModal(order);
                setActiveTab('orders');
              }}
              onOpenAddProduct={() => {
                setActiveTab('products');
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              products={products}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              canDelete={isAdmin}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onUpdatePaymentStatus={handleUpdatePaymentStatus}
              selectedOrderModal={selectedOrderModal}
              setSelectedOrderModal={setSelectedOrderModal}
            />
          )}

          {activeTab === 'customers' && isAdmin && (
            <CustomersView customers={customers} />
          )}

          {activeTab === 'employees' && isAdmin && (
            <EmployeesView currentUserId={user.id} />
          )}

          {activeTab === 'settings' && isAdmin && (
            <SettingsView
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Change Own Password Modal (Available to both Admin & Employee) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/65 backdrop-blur-sm">
          <div className="bg-parchment-light rounded-[4px] shadow-2xl border border-parchment-line w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-parchment-line pb-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-espresso">Change My Password</h3>
                <p className="text-[11px] text-clay">{user.email}</p>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1 rounded-[3px] text-clay hover:text-espresso hover:bg-parchment-deep text-xs"
              >
                ✕
              </button>
            </div>

            {pwdMsg && (
              <div
                className={`p-3 text-xs rounded-[3px] border ${
                  pwdMsg.type === 'ok'
                    ? 'bg-gold-50 border-gold-500/50 text-espresso'
                    : 'bg-crimson-50 border-crimson-300 text-crimson-700'
                }`}
              >
                {pwdMsg.text}
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPwdSaving(true);
                setPwdMsg(null);
                try {
                  await changePasswordApi(currentPwd, newPwd);
                  setPwdMsg({ type: 'ok', text: 'Password updated successfully!' });
                  setCurrentPwd('');
                  setNewPwd('');
                } catch (err: unknown) {
                  setPwdMsg({
                    type: 'err',
                    text: err instanceof Error ? err.message : 'Failed to change password',
                  });
                } finally {
                  setPwdSaving(false);
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="space-y-1">
                <label className="block font-semibold text-espresso">Current Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-espresso">New Password (Min 6 chars) *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-parchment-line">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-clay hover:text-espresso rounded-[3px]"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={pwdSaving}
                  className="px-4 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] font-semibold disabled:opacity-60"
                >
                  {pwdSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
