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
} from '../../lib/api';
import { AdminAuth } from './AdminAuth';
import { DashboardView } from './DashboardView';
import { ProductsView } from './ProductsView';
import { OrdersView } from './OrdersView';
import { CustomersView } from './CustomersView';
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
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'settings'>('dashboard');

  // Stored state
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  // Modals
  const [selectedOrderModal, setSelectedOrderModal] = useState<AdminOrder | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initialize from LocalStorage + Backend API (MongoDB Atlas) on mount
  useEffect(() => {
    setIsClient(true);
    const savedUser = getStoredData<{ email: string; name: string; role: string } | null>('user', null);
    if (savedUser) setUser(savedUser);

    async function loadLiveData() {
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
    }

    loadLiveData();
    setCustomers(getStoredData<AdminCustomer[]>('customers', INITIAL_CUSTOMERS));
    setSettings(getStoredData<StoreSettings>('settings', INITIAL_SETTINGS));
  }, []);

  const handleLoginSuccess = (loggedInUser: { email: string; name: string; role: string }) => {
    setUser(loggedInUser);
    setStoredData('user', loggedInUser);
  };

  const handleLogout = () => {
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row antialiased text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800">
        {/* Brand header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-base shadow">
              ম
            </div>
            <div>
              <span className="font-bold text-white tracking-tight leading-none block text-sm">
                {BRAND.name}
              </span>
              <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-400 border border-slate-700">
            v1.0
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 flex-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBagIcon />
              <span>Gift Products</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PackageIcon />
              <span>Orders & Parcels</span>
            </div>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'customers'
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UsersIcon />
              <span>Customers</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <SettingsIcon />
              <span>Store Settings</span>
            </div>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Storefront</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition-colors"
          >
            <LogOutIcon />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs capitalize">Admin /</span>
            <h1 className="text-sm font-bold text-slate-900 capitalize tracking-tight">
              {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-800 block leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-sky-600 font-medium block">
                {user.email}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-xs border border-sky-200">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Tab View Container */}
        <main className="p-6 flex-1">
          {activeTab === 'dashboard' && (
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

          {activeTab === 'customers' && (
            <CustomersView customers={customers} />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
