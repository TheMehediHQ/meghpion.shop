import React, { useState } from 'react';
import type { AdminOrder } from './mockData';
import { ORDER_STATUSES, PAYMENT_STATUSES } from '@meghpiyon/shared';
import { SearchIcon, EyeIcon, CloseIcon, CheckCircleIcon } from './icons';

interface OrdersViewProps {
  orders: AdminOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: string) => void;
  onUpdatePaymentStatus: (orderId: string, newPaymentStatus: string) => void;
  selectedOrderModal: AdminOrder | null;
  setSelectedOrderModal: (order: AdminOrder | null) => void;
}

export function OrdersView({
  orders,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  selectedOrderModal,
  setSelectedOrderModal,
}: OrdersViewProps) {
  const [search, setSearch] = useState('');
  const [activeStatusTab, setActiveStatusTab] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.includes(search) ||
      order.division.toLowerCase().includes(search.toLowerCase()) ||
      order.district.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      activeStatusTab === 'all' || order.orderStatus === activeStatusTab;

    return matchesSearch && matchesStatus;
  });

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

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'failed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'refunded':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Order Management</h2>
        <p className="text-xs text-slate-500">
          Track customer parcels, update delivery status, and verify payment across Bangladesh
        </p>
      </div>

      {/* Tabs by Status */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveStatusTab('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeStatusTab === 'all'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Orders ({orders.length})
        </button>

        {ORDER_STATUSES.map((status) => {
          const count = orders.filter((o) => o.orderStatus === status).length;
          return (
            <button
              key={status}
              onClick={() => setActiveStatusTab(status)}
              className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-colors flex items-center gap-1.5 ${
                activeStatusTab === status
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{status.replace('_', ' ')}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeStatusTab === status
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order #, customer name, mobile phone (017...), division..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total (BDT)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-900">{ord.orderNumber}</div>
                      <div className="text-[10px] text-slate-400">{ord.createdAt}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-500">{ord.customerPhone}</div>
                      <div className="text-[10px] text-slate-400">{ord.district}, {ord.division}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">
                        {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-xs">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                      {ord.giftMessage && (
                        <span className="inline-block mt-0.5 text-[9px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded border border-sky-100">
                          💌 Gift Note Attached
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">৳ {ord.total}</div>
                      <div className="text-[10px] text-slate-400 uppercase">
                        {ord.paymentMethod}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.paymentStatus}
                        onChange={(e) => onUpdatePaymentStatus(ord.id, e.target.value)}
                        className={`text-[10px] font-semibold py-1 px-2 rounded-full border uppercase tracking-wider cursor-pointer ${getPaymentBadge(
                          ord.paymentStatus
                        )}`}
                      >
                        {PAYMENT_STATUSES.map((ps) => (
                          <option key={ps} value={ps}>
                            {ps}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                        className={`text-[10px] font-semibold py-1 px-2 rounded-full border uppercase tracking-wider cursor-pointer ${getStatusBadge(
                          ord.orderStatus
                        )}`}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrderModal(ord)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded border border-slate-200 text-xs font-medium"
                      >
                        <EyeIcon /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Order Details
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedOrderModal.orderNumber}
                </h3>
                <span className="text-[11px] text-slate-400">
                  Placed on {selectedOrderModal.createdAt}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                  Update Order Fulfillment Status
                </label>
                <select
                  value={selectedOrderModal.orderStatus}
                  onChange={(e) => {
                    onUpdateOrderStatus(selectedOrderModal.id, e.target.value);
                    setSelectedOrderModal({
                      ...selectedOrderModal,
                      orderStatus: e.target.value,
                    });
                  }}
                  className="w-full py-1.5 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-600 uppercase"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
                  Payment Status ({selectedOrderModal.paymentMethod.toUpperCase()})
                </label>
                <select
                  value={selectedOrderModal.paymentStatus}
                  onChange={(e) => {
                    onUpdatePaymentStatus(selectedOrderModal.id, e.target.value);
                    setSelectedOrderModal({
                      ...selectedOrderModal,
                      paymentStatus: e.target.value,
                    });
                  }}
                  className="w-full py-1.5 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-600 uppercase"
                >
                  {PAYMENT_STATUSES.map((ps) => (
                    <option key={ps} value={ps}>
                      {ps}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer & Shipping Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                  Customer Contact
                </span>
                <p className="font-bold text-slate-900 text-sm">{selectedOrderModal.customerName}</p>
                <p className="text-slate-600">📞 {selectedOrderModal.customerPhone}</p>
                <p className="text-slate-600">✉️ {selectedOrderModal.customerEmail}</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                  Shipping Destination
                </span>
                <p className="font-medium text-slate-800">{selectedOrderModal.addressLine}</p>
                <p className="text-slate-600">
                  {selectedOrderModal.district}, {selectedOrderModal.division} Division
                </p>
              </div>
            </div>

            {/* Personalized Gift Message */}
            {selectedOrderModal.giftMessage && (
              <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  💌 Attached Handwritten Gift Card Message:
                </span>
                <p className="text-sky-950 font-bengali italic text-sm">
                  "{selectedOrderModal.giftMessage}"
                </p>
              </div>
            )}

            {/* Items Table */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                Ordered Items
              </span>
              <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px]">
                  <tr>
                    <th className="py-2 px-3">Item</th>
                    <th className="py-2 px-3 text-right">Price</th>
                    <th className="py-2 px-3 text-center">Qty</th>
                    <th className="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedOrderModal.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        {item.customText && (
                          <div className="text-[10px] text-sky-600 font-mono">
                            Customization: {item.customText}
                          </div>
                        )}
                        {item.giftWrap && (
                          <div className="text-[10px] text-amber-600">
                            + Luxury Gift Wrapping included
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium">৳ {item.price}</td>
                      <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                        ৳ {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-slate-200 pt-3 text-xs space-y-1 max-w-xs ml-auto">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>৳ {selectedOrderModal.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span>৳ {selectedOrderModal.deliveryFee}</span>
              </div>
              {selectedOrderModal.giftWrapFee > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Gift Wrapping:</span>
                  <span>৳ {selectedOrderModal.giftWrapFee}</span>
                </div>
              )}
              {selectedOrderModal.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Special Discount:</span>
                  <span>- ৳ {selectedOrderModal.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-1 border-t border-slate-200">
                <span>Total Amount:</span>
                <span>৳ {selectedOrderModal.total}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                🖨️ Print Invoice / Packing Slip
              </button>
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
