import React, { useState } from 'react';
import type { StoreSettings } from './mockData';
import { setStoredData } from './mockData';
import { CheckCircleIcon } from './icons';

interface SettingsViewProps {
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
  onResetData: () => void;
}

export function SettingsView({ settings, onSaveSettings, onResetData }: SettingsViewProps) {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Store Settings & Delivery Rates</h2>
        <p className="text-xs text-slate-500">
          Configure Meghpiyon delivery rates, support contacts, and store policies
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircleIcon /> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Contact Info Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Store Identity & Customer Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">Store Display Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">Support Hotline Phone</label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block font-semibold text-slate-700">Support Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>
        </div>

        {/* Delivery Charges Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Bangladesh Shipping & Delivery Rates (BDT ৳)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">
                Inside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.deliveryFeeDhaka}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryFeeDhaka: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">
                Outside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.deliveryFeeOutside}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryFeeOutside: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">
                Free Delivery Above Order Value (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.freeDeliveryThreshold}
                onChange={(e) =>
                  setFormData({ ...formData, freeDeliveryThreshold: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-700">
                Luxury Gift Wrapping Service Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.giftWrapFee}
                onChange={(e) =>
                  setFormData({ ...formData, giftWrapFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold shadow-sm text-xs"
          >
            Save Store Settings
          </button>
        </div>
      </form>

      {/* Danger Zone / Demo Data Reset */}
      <div className="bg-white border border-rose-200 rounded-xl p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-rose-800">Demo Data Reset</h3>
        <p className="text-xs text-slate-500">
          Reset all products, orders, and customer demo data back to default sample records.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all data back to original demo values?')) {
              onResetData();
            }
          }}
          className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold"
        >
          Reset Demo Database
        </button>
      </div>
    </div>
  );
}
