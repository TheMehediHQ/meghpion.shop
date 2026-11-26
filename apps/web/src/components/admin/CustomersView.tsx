import React, { useState } from 'react';
import type { AdminCustomer } from './mockData';
import { SearchIcon, UsersIcon } from './icons';

interface CustomersViewProps {
  customers: AdminCustomer[];
  onFilterCustomerOrders?: (customerName: string) => void;
}

export function CustomersView({ customers, onFilterCustomerOrders }: CustomersViewProps) {
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-espresso">Registered Customers</h2>
        <p className="text-xs text-clay mt-0.5">
          Customer directory, contact profiles, and lifetime gift orders
        </p>
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
            placeholder="Search customers by name, phone number, email or division..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso placeholder:text-clay-light focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-parchment-light border border-parchment-line rounded-[4px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-parchment-deep/70 text-espresso border-b border-parchment-line uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Division</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Member Since</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-line/70">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-clay">
                    No customers found matching this search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-parchment-deep/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ink text-gold-200 font-display font-bold flex items-center justify-center text-xs border border-gold-500/30">
                          {cust.name.charAt(0)}
                        </div>
                        <div className="font-semibold text-espresso">{cust.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-espresso">{cust.phone}</div>
                      <div className="text-[10px] text-clay">{cust.email}</div>
                    </td>
                    <td className="py-3 px-4 text-clay">
                      {cust.division}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-parchment-deep font-semibold text-espresso border border-parchment-border">
                        {cust.totalOrders} order{cust.totalOrders > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-espresso">
                      ৳ {cust.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-clay">
                      {cust.joinedAt}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
