import React, { useState } from 'react';
import type { StoreSettings } from './mockData';
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
        <h2 className="font-display text-2xl font-semibold text-espresso">Store Settings & Delivery Rates</h2>
        <p className="text-xs text-clay mt-0.5">
          Configure Meghpeon delivery rates, support contacts, and store policies
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-gold-50 border border-gold-500/50 rounded-[3px] text-xs text-espresso flex items-center gap-2">
          <CheckCircleIcon /> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Contact Info Card */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-6 shadow-sm space-y-4">
          <h3 className="font-display text-base font-semibold text-espresso border-b border-parchment-line pb-2">
            Store Identity & Customer Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-espresso">Store Display Name</label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-espresso">Support Hotline Phone</label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="block font-semibold text-espresso">Support Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>
          </div>
        </div>

        {/* Delivery Charges Card */}
        <div className="bg-parchment-light border border-parchment-line rounded-[4px] p-6 shadow-sm space-y-4">
          <h3 className="font-display text-base font-semibold text-espresso border-b border-parchment-line pb-2">
            Bangladesh Shipping & Delivery Rates (BDT ৳)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-espresso">
                Inside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.deliveryFeeDhaka}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryFeeDhaka: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-espresso">
                Outside Dhaka Delivery Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.deliveryFeeOutside}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryFeeOutside: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-espresso">
                Free Delivery Above Order Value (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.freeDeliveryThreshold}
                onChange={(e) =>
                  setFormData({ ...formData, freeDeliveryThreshold: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-espresso">
                Luxury Gift Wrapping Service Fee (৳)
              </label>
              <input
                type="number"
                min="0"
                value={formData.giftWrapFee}
                onChange={(e) =>
                  setFormData({ ...formData, giftWrapFee: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-ink hover:bg-burgundy-dark text-parchment border border-gold-500/40 rounded-[3px] font-semibold shadow-sm text-xs transition-colors"
          >
            Save Store Settings
          </button>
        </div>
      </form>

      {/* Danger Zone / Demo Data Reset */}
      <div className="bg-parchment-light border border-crimson-300 rounded-[4px] p-6 shadow-sm space-y-3">
        <h3 className="font-display text-base font-semibold text-crimson-700">Demo Data Reset</h3>
        <p className="text-xs text-clay">
          Reset all products, orders, and customer demo data back to default sample records.
        </p>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all data back to original demo values?')) {
              onResetData();
            }
          }}
          className="px-4 py-2 border border-crimson-300 text-crimson-700 hover:bg-crimson-50 rounded-[3px] text-xs font-semibold transition-colors"
        >
          Reset Demo Database
        </button>
      </div>
    </div>
  );
}
