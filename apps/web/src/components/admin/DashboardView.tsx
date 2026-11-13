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
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <AlertCircleIcon />
            </span>
            <div>
              <p className="text-sm font-semibold">
                {pendingOrders.length} New Order{pendingOrders.length > 1 ? 's' : ''} Awaiting Confirmation!
              </p>
              <p className="text-xs text-amber-700">
                Please verify customer delivery addresses and confirm dispatch.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium self-start sm:self-auto"
          >
            Review Orders
          </button>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Paid Revenue</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUpIcon />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              ৳ {totalRevenue.toLocaleString()}
            </span>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
              +14% from last week
            </p>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
            <span className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <PackageIcon />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {orders.length}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {deliveredOrders.length} Delivered, {pendingOrders.length} Pending
            </p>
          </div>
        </div>

        {/* Card 3: Active Products */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Catalog Items</span>
            <span className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <ShoppingBagIcon />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {products.length}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {products.filter((p) => p.isAvailable).length} Available for sale
            </p>
          </div>
        </div>

        {/* Card 4: Low Stock Alert */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Inventory Alerts</span>
            <span className={`p-2 rounded-lg ${lowStockProducts.length > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'}`}>
              <AlertCircleIcon />
            </span>
          </div>
          <div>
            <span className={`text-2xl font-bold ${lowStockProducts.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {lowStockProducts.length}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lowStockProducts.length > 0 ? 'Products require re-stocking' : 'All stock levels healthy'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Quick Actions / Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500">Latest gift orders placed across Bangladesh</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              View All Orders →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Order #</th>
                  <th className="py-2.5 px-3 font-semibold">Customer</th>
                  <th className="py-2.5 px-3 font-semibold">City/Division</th>
                  <th className="py-2.5 px-3 font-semibold">Total</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-medium text-slate-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{order.customerName}</div>
                      <div className="text-[10px] text-slate-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {order.division}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded border border-slate-200 text-xs font-medium"
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
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Quick Store Actions</h3>
            <div className="space-y-2">
              <button
                onClick={onOpenAddProduct}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                + Add New Gift Product
              </button>
              <button
                onClick={() => onNavigateTab('orders')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
              >
                Manage All Orders
              </button>
              <button
                onClick={() => onNavigateTab('customers')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
              >
                <UsersIcon /> View Customers
              </button>
            </div>
          </div>

          {/* Low Stock Items List */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Inventory Status</h3>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs text-sky-600 hover:underline"
              >
                Manage
              </button>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                All products have sufficient stock.
              </p>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-9 h-9 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-semibold text-slate-800 truncate">{prod.name}</p>
                        <p className="text-[10px] text-slate-500 font-bengali truncate">{prod.nameBn}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                        prod.stock === 0
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
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
