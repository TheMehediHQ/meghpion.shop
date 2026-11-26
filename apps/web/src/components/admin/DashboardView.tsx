import React from 'react';
import type { AdminOrder, AdminProduct } from './mockData';
import { PackageIcon, ShoppingBagIcon, UsersIcon, TrendingUpIcon, AlertCircleIcon, EyeIcon } from './icons';

interface DashboardViewProps {
  products: AdminProduct[];
  orders: AdminOrder[];
  onNavigateTab: (tab: 'products' | 'orders' | 'customers' | 'settings') => void;
  onViewOrder: (order: AdminOrder) => void;
  onOpenAddProduct: () => void;
}

export function DashboardView({
  products,
  orders,
  onNavigateTab,
  onViewOrder,
  onOpenAddProduct,
}: DashboardViewProps) {
  // Calculations
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending');
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered');
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const recentOrders = [...orders].reverse().slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if pending orders */}
      {pendingOrders.length > 0 && (
        <div className="bg-gold-50 border border-gold-500/50 rounded-[4px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-espresso shadow-sm">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-gold-200/70 rounded-[3px] text-gold-800 border border-gold-500/30">
              <AlertCircleIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-espresso">
                {pendingOrders.length} New Order{pendingOrders.length > 1 ? 's' : ''} Awaiting Confirmation!
              </p>
              <p className="text-xs text-clay">
                Please verify customer delivery addresses and confirm dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] text-xs font-medium self-start sm:self-auto transition-colors"
          >
            Review Orders
          </button>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-clay">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Paid Revenue</span>
            <span className="p-2 rounded-[3px] bg-emerald-50 text-emerald-700 border border-emerald-200">
              <TrendingUpIcon />
            </span>
          </div>
          <div>
            <span className="font-display text-2xl font-semibold text-espresso">
              ৳ {totalRevenue.toLocaleString()}
            </span>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
              +14% from last week
            </p>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-clay">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Total Orders</span>
            <span className="p-2 rounded-[3px] bg-gold-100 text-gold-700 border border-gold-400/40">
              <PackageIcon />
            </span>
          </div>
          <div>
            <span className="font-display text-2xl font-semibold text-espresso">
              {orders.length}
            </span>
            <p className="text-[11px] text-clay mt-0.5">
              {deliveredOrders.length} Delivered, {pendingOrders.length} Pending
            </p>
          </div>
        </div>

        {/* Card 3: Active Products */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-clay">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Catalog Items</span>
            <span className="p-2 rounded-[3px] bg-parchment-deep text-burgundy border border-parchment-border">
              <ShoppingBagIcon />
            </span>
          </div>
          <div>
            <span className="font-display text-2xl font-semibold text-espresso">
              {products.length}
            </span>
            <p className="text-[11px] text-clay mt-0.5">
              {products.filter((p) => p.isAvailable).length} Available for sale
            </p>
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-clay">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Inventory Alerts</span>
            <span className={`p-2 rounded-[3px] border ${lowStockProducts.length > 0 ? 'bg-crimson-50 text-crimson-700 border-crimson-200' : 'bg-parchment-deep text-clay border-parchment-border'}`}>
              <AlertCircleIcon />
            </span>
          </div>
          <div>
            <span className={`font-display text-2xl font-semibold ${lowStockProducts.length > 0 ? 'text-crimson-700' : 'text-espresso'}`}>
              {lowStockProducts.length}
            </span>
            <p className="text-[11px] text-clay mt-0.5">
              {lowStockProducts.length > 0 ? 'Products require re-stocking' : 'All stock levels healthy'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Quick Actions / Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-espresso">Recent Customer Orders</h2>
              <p className="text-xs text-clay">Latest gift orders placed across Bangladesh</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-burgundy hover:text-gold-700 transition-colors"
            >
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Order #</th>
                  <th className="py-2.5 px-3 font-semibold">Customer</th>
                  <th className="py-2.5 px-3 font-semibold">City/Division</th>
                  <th className="py-2.5 px-3 font-semibold">Total</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-parchment-line/70">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-parchment-deep/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-espresso">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-espresso">{order.customerName}</div>
                      <div className="text-[10px] text-clay">{order.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3 text-clay">
                      {order.division}
                    </td>
                    <td className="py-3 px-3 font-medium text-espresso">
                      ৳ {order.total}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-espresso hover:text-burgundy hover:bg-parchment-deep rounded-[3px] border border-parchment-border text-xs font-medium transition-colors"
                      >
                        <EyeIcon /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Column: Quick Actions & Inventory Alert */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-3">
            <h3 className="font-display text-base font-semibold text-espresso">Quick Store Actions</h3>
            <div className="space-y-2">
              <button
                onClick={onOpenAddProduct}
                className="w-full py-2.5 px-4 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                + Add New Gift Product
              </button>
              <button
                onClick={() => onNavigateTab('orders')}
                className="w-full py-2.5 px-4 bg-parchment-deep/70 hover:bg-parchment-deep text-espresso border border-parchment-border rounded-[3px] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Manage All Orders
              </button>
              <button
                onClick={() => onNavigateTab('customers')}
                className="w-full py-2.5 px-4 bg-parchment-deep/70 hover:bg-parchment-deep text-espresso border border-parchment-border rounded-[3px] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <UsersIcon /> View Customers
              </button>
            </div>
          </div>

          {/* Low Stock Items List */}
          <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-espresso">Inventory Status</h3>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs font-semibold text-burgundy hover:text-gold-700 hover:underline"
              >
                Manage
              </button>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-clay py-3 text-center">
                All products have sufficient stock.
              </p>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 rounded-[3px] border border-parchment-line bg-parchment-50 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-9 h-9 object-cover rounded-[2px] flex-shrink-0 border border-parchment-line"
                      />
                      <div className="truncate">
                        <p className="font-semibold text-espresso truncate">{prod.name}</p>
                        <p className="text-[10px] text-clay font-bengali truncate">{prod.nameBn}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold flex-shrink-0 ${
                        prod.stock === 0
                          ? 'bg-crimson-100 text-crimson-700'
                          : 'bg-gold-100 text-gold-800'
                      }`}
                    >
                      {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} left`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
