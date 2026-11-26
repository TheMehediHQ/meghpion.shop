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
        <h2 className="font-display text-2xl font-semibold text-espresso">Order Management</h2>
        <p className="text-xs text-clay mt-0.5">
          Track customer parcels, update delivery status, and verify payment across Bangladesh
        </p>
      </div>

      {/* Tabs by Status */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-parchment-line pb-2.5 text-xs">
        <button
          onClick={() => setActiveStatusTab('all')}
          className={`px-3 py-1.5 rounded-[3px] font-medium transition-colors ${
            activeStatusTab === 'all'
              ? 'bg-ink text-parchment border border-gold-500/40'
              : 'text-clay hover:text-espresso hover:bg-parchment-deep/60'
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
              className={`px-3 py-1.5 rounded-[3px] font-medium capitalize transition-colors flex items-center gap-1.5 ${
                activeStatusTab === status
                  ? 'bg-ink text-parchment border border-gold-500/40'
                  : 'text-clay hover:text-espresso hover:bg-parchment-deep/60'
              }`}
            >
              <span>{status.replace('_', ' ')}</span>
              {count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeStatusTab === status
                      ? 'bg-gold-400/20 text-gold-200'
                      : 'bg-parchment-deep text-espresso'
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
      <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-4 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-clay">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order #, customer name, mobile phone (017...), division..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso placeholder:text-clay-light focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-parchment-light border border-parchment-line rounded-[4px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line uppercase tracking-wider font-semibold text-[11px]">
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
            <tbody className="divide-y divide-parchment-line/70">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-clay">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-parchment-deep/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-espresso">{ord.orderNumber}</div>
                      <div className="text-[10px] text-clay">{ord.createdAt}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-espresso">{ord.customerName}</div>
                      <div className="text-[11px] text-clay">{ord.customerPhone}</div>
                      <div className="text-[10px] text-clay-light">{ord.district}, {ord.division}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-espresso font-medium">
                        {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-[10px] text-clay truncate max-w-xs">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                      {ord.giftMessage && (
                        <span className="inline-block mt-0.5 text-[9px] bg-gold-50 text-gold-800 px-1.5 py-0.5 rounded-[2px] border border-gold-400/40">
                          💌 Gift Note Attached
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-espresso">৳ {ord.total}</div>
                      <div className="text-[10px] text-clay uppercase">
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-espresso hover:text-burgundy hover:bg-parchment-deep rounded-[3px] border border-parchment-border text-xs font-medium transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/65 backdrop-blur-sm overflow-y-auto">
          <div className="bg-parchment-light rounded-[4px] shadow-2xl border border-parchment-line w-full max-w-2xl my-8 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-parchment-line pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  Order Details
                </span>
                <h3 className="font-display text-xl font-semibold text-espresso">
                  {selectedOrderModal.orderNumber}
                </h3>
                <span className="text-[11px] text-clay">
                  Placed on {selectedOrderModal.createdAt}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="p-1 rounded-[3px] text-clay hover:text-espresso hover:bg-parchment-deep"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-parchment-deep/50 p-4 rounded-[3px] border border-parchment-line text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-clay uppercase tracking-wider mb-1">
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
                  className="w-full py-1.5 px-3 bg-parchment-50 border border-parchment-border rounded-[3px] text-xs font-semibold text-espresso focus:outline-none focus:border-gold-600 uppercase"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-clay uppercase tracking-wider mb-1">
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
                  className="w-full py-1.5 px-3 bg-parchment-50 border border-parchment-border rounded-[3px] text-xs font-semibold text-espresso focus:outline-none focus:border-gold-600 uppercase"
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
              <div className="p-3.5 bg-parchment-50 border border-parchment-line rounded-[3px] space-y-1">
                <span className="font-semibold text-gold-800 uppercase tracking-wider text-[10px]">
                  Customer Contact
                </span>
                <p className="font-bold text-espresso text-sm">{selectedOrderModal.customerName}</p>
                <p className="text-clay">📞 {selectedOrderModal.customerPhone}</p>
                <p className="text-clay">✉️ {selectedOrderModal.customerEmail}</p>
              </div>

              <div className="p-3.5 bg-parchment-50 border border-parchment-line rounded-[3px] space-y-1">
                <span className="font-semibold text-gold-800 uppercase tracking-wider text-[10px]">
                  Shipping Destination
                </span>
                <p className="font-medium text-espresso">{selectedOrderModal.addressLine}</p>
                <p className="text-clay">
                  {selectedOrderModal.district}, {selectedOrderModal.division} Division
                </p>
              </div>
            </div>

            {/* Personalized Gift Message */}
            {selectedOrderModal.giftMessage && (
              <div className="p-3.5 bg-gold-50 border border-gold-400/50 rounded-[3px] text-xs space-y-1">
                <span className="font-bold text-gold-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  💌 Attached Handwritten Gift Card Message:
                </span>
                <p className="text-espresso font-bengali italic text-sm">
                  "{selectedOrderModal.giftMessage}"
                </p>
              </div>
            )}

            {/* Items Table */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-espresso uppercase tracking-wider text-[10px]">
                Ordered Items
              </span>
              <table className="w-full text-left border border-parchment-line rounded-[3px] overflow-hidden">
                <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line text-[10px]">
                  <tr>
                    <th className="py-2 px-3">Item</th>
                    <th className="py-2 px-3 text-right">Price</th>
                    <th className="py-2 px-3 text-center">Qty</th>
                    <th className="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-parchment-line/70">
                  {selectedOrderModal.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-espresso">{item.name}</div>
                        {item.customText && (
                          <div className="text-[10px] text-burgundy font-mono">
                            Customization: {item.customText}
                          </div>
                        )}
                        {item.giftWrap && (
                          <div className="text-[10px] text-gold-700">
                            + Luxury Gift Wrapping included
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-espresso">৳ {item.price}</td>
                      <td className="py-2.5 px-3 text-center text-espresso">{item.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-espresso">
                        ৳ {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-parchment-line pt-3 text-xs space-y-1 max-w-xs ml-auto">
              <div className="flex justify-between text-clay">
                <span>Subtotal:</span>
                <span>৳ {selectedOrderModal.subtotal}</span>
              </div>
              <div className="flex justify-between text-clay">
                <span>Delivery Fee:</span>
                <span>৳ {selectedOrderModal.deliveryFee}</span>
              </div>
              {selectedOrderModal.giftWrapFee > 0 && (
                <div className="flex justify-between text-clay">
                  <span>Gift Wrapping:</span>
                  <span>৳ {selectedOrderModal.giftWrapFee}</span>
                </div>
              )}
              {selectedOrderModal.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Discount:</span>
                  <span>- ৳ {selectedOrderModal.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-espresso text-sm pt-1 border-t border-parchment-line">
                <span>Total Amount:</span>
                <span>৳ {selectedOrderModal.total}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 border border-parchment-border rounded-[3px] text-xs font-semibold text-espresso hover:bg-parchment-deep transition-colors"
              >
                🖨️ Print Invoice / Packing Slip
              </button>
              <button
                onClick={() => setSelectedOrderModal(null)}
                className="px-5 py-2 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] text-xs font-semibold shadow-sm transition-colors"
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
