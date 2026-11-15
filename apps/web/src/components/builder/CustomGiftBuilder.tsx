import React, { useState } from 'react';

// Types
export interface BoxOption {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  capacity: number;
  capacityText: string;
  description: string;
  image: string;
  material: string;
}

export interface ItemOption {
  id: string;
  name: string;
  nameBn: string;
  price: number;
  category: 'sweets' | 'crafts' | 'scents' | 'keepsakes';
  description: string;
  image: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  nameBn: string;
  colorHex: string;
}

export interface WaxSealOption {
  id: string;
  name: string;
  nameBn: string;
  symbol: string;
}

// Static Data
const BOX_OPTIONS: BoxOption[] = [
  {
    id: 'pine-wood-box',
    name: 'Artisanal Pine Wood Box',
    nameBn: 'পাইনউড ভিন্টেজ উডেন বক্স',
    price: 450,
    capacity: 6,
    capacityText: '৪–৬টি আইটেম',
    description: 'খাঁটি পাইন কাঠের তৈরি প্রিমিয়াম বক্স, ব্রাস ল্যাচ ও প্রাকৃতিক কাঠের টেক্সচার। দীর্ঘদিন স্মারক হিসেবে ব্যবহারযোগ্য।',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
    material: 'Natural Pine Wood',
  },
  {
    id: 'heritage-kraft-box',
    name: 'Heritage Kraft Paper Box',
    nameBn: 'ক্লাসিক ক্রাফট পেপার বক্স',
    price: 250,
    capacity: 5,
    capacityText: '৩–৫টি আইটেম',
    description: 'হস্তনির্মিত পরিবেশবান্ধব শক্ত ক্রাফট পেপার, গোল্ড ফয়েল লোগো ও সফট পার্চমেন্ট বেডিং।',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    material: 'Recycled Kraft Board',
  },
  {
    id: 'royal-burgundy-box',
    name: 'Royal Burgundy Velvet Box',
    nameBn: 'রয়্যাল বার্গান্ডি লাক্সারি বক্স',
    price: 550,
    capacity: 6,
    capacityText: '৪–৬টি আইটেম',
    description: 'ডিপ বার্গান্ডি টেক্সচার্ড রিজিড বক্স, ভেতরের সিল্কি ফিনিশ ও স্বর্ণালী মেঘপিয়ন মোহর।',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    material: 'Luxury Rigid Board',
  },
  {
    id: 'nakshi-kantha-pouch',
    name: 'Handwoven Nakshi Pouch',
    nameBn: 'হাতে বোনা নকশিকাঁথা পাউচ',
    price: 200,
    capacity: 3,
    capacityText: '২–৩টি আইটেম',
    description: 'গ্রামীণ দক্ষ নারী কারিগরদের সুই-সুতায় পরম যত্নে বোনা ঐতিহ্যবাহী কাপড়ের উপহারের থলি।',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    material: '100% Hand-embroidered Cotton',
  },
];

const ITEM_OPTIONS: ItemOption[] = [
  {
    id: 'belgian-truffles',
    name: 'Handcrafted Belgian Truffles',
    nameBn: 'বেলজিয়ান চকোলেট ট্রাফল (৬ পিস)',
    price: 450,
    category: 'sweets',
    description: 'প্রিমিয়াম ডার্ক ও মিল্ক চকলেটের সমৃদ্ধ কারিগরি স্বাদ।',
    image: 'https://images.unsplash.com/photo-1548741487-18d16a142283?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'roasted-nuts-jar',
    name: 'Honey Roasted Nuts Jar',
    nameBn: 'মধুমাখা রোস্টেড কাজু ও পেস্তা',
    price: 380,
    category: 'sweets',
    description: 'প্রাকৃতিক সুন্দরবনের মধুতে ভাজা কুড়মুড়ে কাজুবাদাম ও পেস্তা।',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'nakshi-diary',
    name: 'Nakshi Kantha Pocket Diary',
    nameBn: 'নকশিকাঁথা বাঁধানো মিনি ডায়েরি',
    price: 550,
    category: 'crafts',
    description: 'হাতে সেলাই কভার ও ১২০ জিএসএম আনলাইন্ড আর্ট পেপারের ডায়েরি।',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'rosewood-pen',
    name: 'Artisan Rosewood Pen',
    nameBn: 'রোজউড কাঠের তৈরি কলম ও খাপ',
    price: 350,
    category: 'crafts',
    description: 'প্রাকৃতিক রোজউড কাঠের স্মুথ বলপেন ও পার্চমেন্ট কেস।',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'jasmine-candle',
    name: 'Jasmine Soy Wax Candle',
    nameBn: 'জুঁই ও বেলি ফুলের সুবাসিত মোমবাতি',
    price: 420,
    category: 'scents',
    description: 'প্রাকৃতিক সয়া মোমে হাতে ঢালা বেলি ফুলের মৃদু মিষ্টি সুবাস।',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'bokul-attar',
    name: 'Traditional Bokul Flower Attar',
    nameBn: 'বকুল ফুলের স্নিগ্ধ আতর (৬ মি.লি.)',
    price: 550,
    category: 'scents',
    description: '১০০% অ্যালকোহলমুক্ত ডিস্টিল্ড প্রাকৃতিক বকুল ফুলের সুরভি।',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'terracotta-planter',
    name: 'Terracotta Desk Planter',
    nameBn: 'টেরাকোটা মাটির মিনি প্ল্যান্টার',
    price: 350,
    category: 'crafts',
    description: 'বাংলাদেশের কুমারদের হাতে গড়া ঐতিহ্যবাহী পোড়ামাটির ক্ষুদ্র পাত্র।',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'brass-bookmark',
    name: 'Brass Filigree Bookmark',
    nameBn: 'খাঁটি পিতলের অ্যান্টিক বুকমার্ক',
    price: 260,
    category: 'keepsakes',
    description: 'পবিত্র ফুলের মোটিফে সূক্ষ্ম ফিলিগ্রি কারুকাজ করা পিতলের স্মারক।',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'dried-flowers-posy',
    name: 'Dried Floral Bouquet',
    nameBn: 'শুকনো বুনোফুলের মিনি বুকেট',
    price: 300,
    category: 'keepsakes',
    description: 'বেবিস ব্রেথ ও ল্যাভেন্ডারের চিরস্থায়ী শুকনো ফুলের মিষ্টি তোড়া।',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&auto=format&fit=crop&q=80',
  },
];

const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'antique-gold', name: 'Antique Gold', nameBn: 'ভিন্টেজ অ্যান্টিক গোল্ড', colorHex: '#B58C3A' },
  { id: 'royal-burgundy', name: 'Royal Burgundy', nameBn: 'ডিপ রয়্যাল বার্গান্ডি', colorHex: '#4A0E17' },
  { id: 'forest-olive', name: 'Forest Olive', nameBn: 'ফরেস্ট অলিভ গ্রিন', colorHex: '#4A5D43' },
  { id: 'midnight-navy', name: 'Midnight Navy', nameBn: 'মিডনাইট সিল্ক নেভি', colorHex: '#1B2A4A' },
];

const WAX_SEAL_OPTIONS: WaxSealOption[] = [
  { id: 'meghpeon-crest', name: 'Meghpeon Signature', nameBn: 'মেঘপিয়ন সিগনেচার ক্রেস্ট', symbol: 'ম' },
  { id: 'heart-letter', name: 'Heart & Letter', nameBn: 'হৃদয় ও চিরকুট মোহর', symbol: '❤' },
  { id: 'with-love', name: 'With Love', nameBn: 'উইথ লাভ মনোগ্রাম', symbol: '❦' },
  { id: 'postmark', name: 'Vintage Postmark', nameBn: 'ডাকটিকিট সিলমোহর', symbol: '✉' },
];

export const CustomGiftBuilder: React.FC = () => {
  // Wizard Step: 1 = Box, 2 = Items, 3 = Card & Finishing
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedBox, setSelectedBox] = useState<BoxOption>(BOX_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState<{ [itemId: string]: number }>({
    'belgian-truffles': 1,
    'nakshi-diary': 1,
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Step 3 Details
  const [recipientName, setRecipientName] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('জন্মদিন');
  const [giftNote, setGiftNote] = useState<string>('প্রিয়জনের জন্য বুকভরা ভালোবাসা ও অনেক অনেক দোয়া রইল।');
  const [selectedRibbon, setSelectedRibbon] = useState<RibbonOption>(RIBBON_OPTIONS[0]);
  const [selectedWaxSeal, setSelectedWaxSeal] = useState<WaxSealOption>(WAX_SEAL_OPTIONS[0]);

  // Total Item Count in Box
  const totalItemCount = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

  // Calculate Subtotal
  const itemsTotal = Object.entries(selectedItems).reduce((sum, [itemId, qty]) => {
    const item = ITEM_OPTIONS.find((i) => i.id === itemId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = selectedBox.price + itemsTotal;

  // Add Item
  const handleAddItem = (itemId: string) => {
    if (totalItemCount >= selectedBox.capacity) {
      alert(`এই বক্সে সর্বোচ্চ ${selectedBox.capacity}টি আইটেম রাখা সম্ভব। আরও জিনিস যোগ করতে বক্স পরিবর্তন করুন অথবা কিছু আইটেম কমান।`);
      return;
    }
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      if (updated[itemId] === 1) {
        delete updated[itemId];
      } else {
        updated[itemId] -= 1;
      }
      return updated;
    });
  };

  // Filter items
  const displayedItems =
    activeCategory === 'all'
      ? ITEM_OPTIONS
      : ITEM_OPTIONS.filter((item) => item.category === activeCategory);

  // Handle Proceed to Checkout
  const handleCheckout = () => {
    const hamperData = {
      type: 'custom_hamper',
      box: selectedBox,
      items: Object.entries(selectedItems).map(([id, qty]) => ({
        item: ITEM_OPTIONS.find((i) => i.id === id),
        quantity: qty,
      })),
      recipientName,
      occasion,
      giftNote,
      ribbon: selectedRibbon,
      waxSeal: selectedWaxSeal,
      totalPrice: grandTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('meghpeon_custom_hamper', JSON.stringify(hamperData));
    } catch (e) {
      console.warn('Could not save hamper to localStorage', e);
    }

    // Redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="w-full">
      {/* Step Indicator Header */}
      <div className="border-b border-[#E3D8C3] bg-[#FAF6EE] py-6 sm:py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`group flex items-center gap-3 transition-opacity ${
                currentStep === 1 ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-all ${
                  currentStep === 1
                    ? 'bg-[#3D0C11] text-[#F6F1E4] shadow-md ring-2 ring-[#B29258]'
                    : currentStep > 1
                    ? 'bg-[#B29258] text-[#1E0407]'
                    : 'border border-[#E3D8C3] bg-white text-[#8A6F5A]'
                }`}
              >
                {currentStep > 1 ? '✓' : '১'}
              </span>
              <div className="hidden text-left sm:block">
                <p className="font-bengali text-[13px] font-semibold text-[#2B1B17]">১. বক্স নির্বাচন</p>
                <p className="text-[11px] text-[#8A6F5A]">প্যাকেজিং বেছে নিন</p>
              </div>
            </button>

            {/* Divider Line */}
            <div className={`h-[2px] flex-1 mx-3 sm:mx-6 transition-colors ${currentStep >= 2 ? 'bg-[#B29258]' : 'bg-[#E3D8C3]'}`} />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`group flex items-center gap-3 transition-opacity ${
                currentStep === 2 ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-all ${
                  currentStep === 2
                    ? 'bg-[#3D0C11] text-[#F6F1E4] shadow-md ring-2 ring-[#B29258]'
                    : currentStep > 2
                    ? 'bg-[#B29258] text-[#1E0407]'
                    : 'border border-[#E3D8C3] bg-white text-[#8A6F5A]'
                }`}
              >
                {currentStep > 2 ? '✓' : '২'}
              </span>
              <div className="hidden text-left sm:block">
                <p className="font-bengali text-[13px] font-semibold text-[#2B1B17]">২. উপহার সামগ্রী</p>
                <p className="text-[11px] text-[#8A6F5A]">ভেতরের আইটেম যোগ করুন</p>
              </div>
            </button>

            {/* Divider Line */}
            <div className={`h-[2px] flex-1 mx-3 sm:mx-6 transition-colors ${currentStep === 3 ? 'bg-[#B29258]' : 'bg-[#E3D8C3]'}`} />

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`group flex items-center gap-3 transition-opacity ${
                currentStep === 3 ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-all ${
                  currentStep === 3
                    ? 'bg-[#3D0C11] text-[#F6F1E4] shadow-md ring-2 ring-[#B29258]'
                    : 'border border-[#E3D8C3] bg-white text-[#8A6F5A]'
                }`}
              >
                ৩
              </span>
              <div className="hidden text-left sm:block">
                <p className="font-bengali text-[13px] font-semibold text-[#2B1B17]">৩. চিরকুট ও ফিনিশিং</p>
                <p className="text-[11px] text-[#8A6F5A]">হাতে লেখা চিঠি ও সিল</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Builder Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Wizard Steps */}
          <div className="lg:col-span-8">
            {/* STEP 1: CHOOSE BOX */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="font-bengali text-xs font-semibold uppercase tracking-wider text-[#B58C3A]">
                    ধাপ ১ / ৩
                  </span>
                  <h2 className="mt-1 font-tiro text-2xl sm:text-3xl text-[#2B1B17]">
                    আপনার উপহারের মূল বক্সটি বেছে নিন
                  </h2>
                  <p className="mt-1 font-bengali text-sm text-[#8A6F5A]">
                    প্রতিটি বক্স খাঁটি হাতে তৈরি এবং ভেতরে পার্চমেন্ট পেপার কুশন ও সিল্কি ফিতা দিয়ে সাজানো থাকে।
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {BOX_OPTIONS.map((box) => {
                    const isSelected = selectedBox.id === box.id;
                    return (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        className={`group relative cursor-pointer overflow-hidden rounded-[6px] border bg-[#FBF8F0] p-4 transition-all duration-200 ${
                          isSelected
                            ? 'border-[#B29258] shadow-[0_12px_28px_-12px_rgba(61,12,17,0.35)] ring-2 ring-[#B29258]/60'
                            : 'border-[#E3D8C3] hover:border-[#B29258]/60 hover:shadow-md'
                        }`}
                      >
                        {/* Selected Badge */}
                        {isSelected && (
                          <span className="absolute right-3 top-3 z-10 rounded-full bg-[#3D0C11] px-2.5 py-0.5 font-bengali text-[11px] font-semibold text-[#F6F1E4] shadow">
                            নির্বাচিত ✓
                          </span>
                        )}

                        <div className="aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-[#EFE6D3]">
                          <img
                            src={box.image}
                            alt={box.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        <div className="mt-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-tiro text-lg text-[#2B1B17] group-hover:text-[#3D0C11]">
                              {box.nameBn}
                            </h3>
                            <span className="shrink-0 font-sans text-base font-bold text-[#3D0C11]">
                              ৳{box.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#8A6F5A]">{box.name} · {box.material}</p>
                          <p className="mt-2 font-bengali text-xs leading-relaxed text-[#2B1B17]/80">
                            {box.description}
                          </p>

                          <div className="mt-3.5 flex items-center justify-between border-t border-[#E3D8C3] pt-3 text-xs">
                            <span className="font-bengali text-[#B58C3A] font-medium">
                              ধারণক্ষমতা: {box.capacityText}
                            </span>
                            <span
                              className={`rounded px-2.5 py-1 font-bengali text-[11px] font-semibold ${
                                isSelected
                                  ? 'bg-[#3D0C11] text-[#F6F1E4]'
                                  : 'border border-[#E3D8C3] text-[#2B1B17] group-hover:border-[#B29258]'
                              }`}
                            >
                              {isSelected ? 'পছন্দ করা হয়েছে' : 'সিলেক্ট করুন'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 rounded-[4px] bg-[#3D0C11] px-7 py-3 font-bengali text-sm font-medium text-[#F6F1E4] shadow-md transition-colors hover:bg-[#2A070B]"
                  >
                    পরের ধাপ: উপহার সামগ্রী যোগ করুন →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE ITEMS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-bengali text-xs font-semibold uppercase tracking-wider text-[#B58C3A]">
                        ধাপ ২ / ৩
                      </span>
                      <h2 className="mt-1 font-tiro text-2xl sm:text-3xl text-[#2B1B17]">
                        বক্সের ভেতর উপহার সামগ্রী বেছে নিন
                      </h2>
                    </div>

                    {/* Capacity Badge */}
                    <div className="rounded-[4px] border border-[#B29258]/50 bg-[#FAF6EE] px-4 py-2 text-right">
                      <p className="font-bengali text-xs text-[#8A6F5A]">
                        বক্স: <strong className="text-[#2B1B17]">{selectedBox.nameBn}</strong>
                      </p>
                      <p className="font-bengali text-xs font-bold text-[#3D0C11]">
                        যোগ করা হয়েছে: {totalItemCount} / {selectedBox.capacity} টি আইটেম
                      </p>
                    </div>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#EFE6D3]">
                    <div
                      className="h-full bg-[#B29258] transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalItemCount / selectedBox.capacity) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 border-b border-[#E3D8C3] pb-3">
                  {[
                    { id: 'all', label: 'সব আইটেম' },
                    { id: 'sweets', label: 'চকলেট ও মিষ্টি' },
                    { id: 'crafts', label: 'হস্তশিল্প ও ডায়েরি' },
                    { id: 'scents', label: 'আতর ও মোমবাতি' },
                    { id: 'keepsakes', label: 'স্মারক ও ফুল' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`rounded-full px-4 py-1.5 font-bengali text-xs font-medium transition-all ${
                        activeCategory === cat.id
                          ? 'bg-[#3D0C11] text-[#F6F1E4] shadow-sm'
                          : 'border border-[#E3D8C3] bg-[#FAF8F0] text-[#8A6F5A] hover:border-[#B29258] hover:text-[#2B1B17]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {displayedItems.map((item) => {
                    const quantity = selectedItems[item.id] || 0;
                    const isAdded = quantity > 0;

                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col justify-between rounded-[4px] border bg-[#FBF8F0] p-3 transition-all ${
                          isAdded
                            ? 'border-[#B29258] shadow-sm'
                            : 'border-[#E3D8C3] hover:border-[#B29258]/60'
                        }`}
                      >
                        <div>
                          <div className="relative aspect-square w-full overflow-hidden rounded-[3px] bg-[#EFE6D3]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            {isAdded && (
                              <span className="absolute right-2 top-2 rounded-full bg-[#3D0C11] px-2 py-0.5 text-[10px] font-bold text-[#F6F1E4]">
                                {quantity}x যোগ করা
                              </span>
                            )}
                          </div>

                          <h3 className="mt-3 font-tiro text-[15px] leading-snug text-[#2B1B17]">
                            {item.nameBn}
                          </h3>
                          <p className="text-[11px] text-[#8A6F5A] line-clamp-1">{item.name}</p>
                          <p className="mt-1 font-sans text-sm font-bold text-[#3D0C11]">৳{item.price}</p>
                        </div>

                        {/* Add / Quantity Button */}
                        <div className="mt-3 pt-2 border-t border-[#E3D8C3]">
                          {!isAdded ? (
                            <button
                              type="button"
                              onClick={() => handleAddItem(item.id)}
                              className="w-full rounded border border-[#B29258]/60 bg-white py-1.5 font-bengali text-xs font-semibold text-[#3D0C11] transition-colors hover:bg-[#3D0C11] hover:text-white"
                            >
                              + বক্সে যোগ করুন
                            </button>
                          ) : (
                            <div className="flex items-center justify-between rounded border border-[#B29258] bg-[#FAF6EE] p-1">
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(item.id)}
                                className="grid h-6 w-6 place-items-center rounded bg-white text-xs font-bold text-[#3D0C11] hover:bg-[#EFE6D3]"
                              >
                                -
                              </button>
                              <span className="font-sans text-xs font-bold text-[#2B1B17]">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddItem(item.id)}
                                className="grid h-6 w-6 place-items-center rounded bg-[#3D0C11] text-xs font-bold text-white hover:bg-[#2A070B]"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center justify-between border-t border-[#E3D8C3] pt-5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="font-bengali text-xs font-semibold text-[#8A6F5A] hover:text-[#2B1B17]"
                  >
                    ← আগের ধাপ (বক্স বদলান)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (totalItemCount === 0) {
                        alert('অনুগ্রহ করে বক্সে অন্তত ১টি উপহার সামগ্রী যোগ করুন।');
                        return;
                      }
                      setCurrentStep(3);
                    }}
                    className="inline-flex items-center gap-2 rounded-[4px] bg-[#3D0C11] px-7 py-3 font-bengali text-sm font-medium text-[#F6F1E4] shadow-md transition-colors hover:bg-[#2A070B]"
                  >
                    পরের ধাপ: চিরকুট ও ফিনিশিং →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CALLIGRAPHY NOTE & FINISHING */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div>
                  <span className="font-bengali text-xs font-semibold uppercase tracking-wider text-[#B58C3A]">
                    ধাপ ৩ / ৩
                  </span>
                  <h2 className="mt-1 font-tiro text-2xl sm:text-3xl text-[#2B1B17]">
                    হাতে লেখা চিরকুট ও ওয়াক্স সিলমোহর
                  </h2>
                  <p className="mt-1 font-bengali text-sm text-[#8A6F5A]">
                    আমাদের ক্যালিগ্রাফার আপনার এই বার্তাটি পার্চমেন্ট কার্ডে নিব ও কালিতে হাতে লিখে সিলমোহর দিয়ে বক্সে সংযুক্ত করবেন।
                  </p>
                </div>

                {/* Calligraphy Card Form & Live Preview */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Left: Input Form */}
                  <div className="space-y-4 rounded-[6px] border border-[#E3D8C3] bg-[#FAF8F0] p-5">
                    <h3 className="font-bengali text-sm font-bold text-[#3D0C11]">
                      চিরকুটের বিবরণ (সম্পূর্ণ ফ্রি)
                    </h3>

                    <div>
                      <label className="block font-bengali text-xs font-semibold text-[#2B1B17]">
                        প্রাপকের নাম
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="যেমন: অনন্যা / প্রিয় তন্ময়"
                        className="mt-1.5 w-full rounded border border-[#E3D8C3] bg-white px-3 py-2 text-xs font-bengali focus:border-[#B29258] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bengali text-xs font-semibold text-[#2B1B17]">
                        উপহারের উপলক্ষ
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="mt-1.5 w-full rounded border border-[#E3D8C3] bg-white px-3 py-2 text-xs font-bengali focus:border-[#B29258] focus:outline-none"
                      >
                        <option value="জন্মদিন">জন্মদিন</option>
                        <option value="বিবাহবার্ষিকী">বিবাহবার্ষিকী</option>
                        <option value="ভালোবাসা ও শুভকামনা">ভালোবাসা ও শুভকামনা</option>
                        <option value="কৃতজ্ঞতা / Thank You">কৃতজ্ঞতা প্রকাশ</option>
                        <option value="ঈদ মোবারক">ঈদ মোবারক</option>
                        <option value="কর্পোরেট উপহার">কর্পোরেট উপহার</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bengali text-xs font-semibold text-[#2B1B17]">
                        আপনার মনের কথা বা চিরকুটের বার্তা *
                      </label>
                      <textarea
                        rows={4}
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="এখানে সুন্দর করে মনের বার্তাটি লিখুন..."
                        className="mt-1.5 w-full resize-none rounded border border-[#E3D8C3] bg-white px-3 py-2 text-xs font-bengali leading-relaxed focus:border-[#B29258] focus:outline-none"
                      />
                      <p className="mt-1 text-[11px] text-[#8A6F5A]">সর্বোচ্চ ৩০০ অক্ষরের মধ্যে লিখুন।</p>
                    </div>
                  </div>

                  {/* Right: Live Calligraphy Card Preview */}
                  <div className="relative flex flex-col justify-between rounded-[6px] border border-[#B29258]/60 bg-[#F6F1E4] p-6 shadow-md">
                    {/* Airmail stripe top accent */}
                    <div className="h-[2px] w-full airmail-stripe mb-4" />

                    <div>
                      <div className="flex items-center justify-between border-b border-[#E3D8C3] pb-2 text-[10px] text-[#8A6F5A]">
                        <span>MEGHPEON ATELIER · CALLIGRAPHY</span>
                        <span className="font-bengali text-[#B58C3A]">{occasion}</span>
                      </div>

                      <div className="mt-4 space-y-3 font-tiro text-[#2B1B17]">
                        {recipientName && (
                          <p className="text-base font-semibold text-[#3D0C11]">
                            প্রিয় {recipientName},
                          </p>
                        )}
                        <p className="font-bengali text-sm leading-relaxed text-[#2B1B17]/90 italic">
                          "{giftNote || 'আপনার বার্তাটি এখানে সুন্দর ক্যালিগ্রাফিতে ফুটে উঠবে...'}"
                        </p>
                      </div>
                    </div>

                    {/* Seal representation */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#E3D8C3] pt-4">
                      <div className="text-[11px] font-bengali text-[#8A6F5A]">
                        <p>সিলমোহর: <strong className="text-[#2B1B17]">{selectedWaxSeal.nameBn}</strong></p>
                        <p>রিবন: <strong className="text-[#2B1B17]">{selectedRibbon.nameBn}</strong></p>
                      </div>

                      <div className="grid h-10 w-10 place-items-center rounded-full border border-[#B29258] bg-[#3D0C11] text-sm text-[#F6F1E4] shadow">
                        {selectedWaxSeal.symbol}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finishing Options (Ribbon & Wax Seal) */}
                <div className="space-y-6 border-t border-[#E3D8C3] pt-6">
                  {/* Ribbon Selection */}
                  <div>
                    <h3 className="font-bengali text-sm font-bold text-[#2B1B17]">
                      ১. সাটিন ফিতার রঙ বেছে নিন (ফ্রি)
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {RIBBON_OPTIONS.map((ribbon) => {
                        const isSelected = selectedRibbon.id === ribbon.id;
                        return (
                          <button
                            key={ribbon.id}
                            type="button"
                            onClick={() => setSelectedRibbon(ribbon)}
                            className={`flex items-center gap-3 rounded-[4px] border p-2.5 text-left transition-all ${
                              isSelected
                                ? 'border-[#3D0C11] bg-white ring-2 ring-[#B29258]/50'
                                : 'border-[#E3D8C3] bg-[#FAF8F0] hover:border-[#B29258]'
                            }`}
                          >
                            <span
                              className="h-5 w-5 shrink-0 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: ribbon.colorHex }}
                            />
                            <div className="text-xs">
                              <p className="font-bengali font-semibold text-[#2B1B17]">{ribbon.nameBn}</p>
                              <p className="text-[10px] text-[#8A6F5A]">{ribbon.name}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Wax Seal Selection */}
                  <div>
                    <h3 className="font-bengali text-sm font-bold text-[#2B1B17]">
                      ২. খাঁটি ওয়াক্স সিলমোহর বেছে নিন (ফ্রি)
                    </h3>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {WAX_SEAL_OPTIONS.map((seal) => {
                        const isSelected = selectedWaxSeal.id === seal.id;
                        return (
                          <button
                            key={seal.id}
                            type="button"
                            onClick={() => setSelectedWaxSeal(seal)}
                            className={`flex items-center gap-3 rounded-[4px] border p-2.5 text-left transition-all ${
                              isSelected
                                ? 'border-[#3D0C11] bg-white ring-2 ring-[#B29258]/50'
                                : 'border-[#E3D8C3] bg-[#FAF8F0] hover:border-[#B29258]'
                            }`}
                          >
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#3D0C11] text-xs font-bold text-[#F6F1E4] shadow">
                              {seal.symbol}
                            </span>
                            <div className="text-xs">
                              <p className="font-bengali font-semibold text-[#2B1B17]">{seal.nameBn}</p>
                              <p className="text-[10px] text-[#8A6F5A]">{seal.name}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Back and Action */}
                <div className="flex items-center justify-between border-t border-[#E3D8C3] pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="font-bengali text-xs font-semibold text-[#8A6F5A] hover:text-[#2B1B17]"
                  >
                    ← আগের ধাপ (আইটেম পরিবর্তন করুন)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Hamper Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-[6px] border border-[#E3D8C3] bg-[#FAF8F0] p-6 shadow-lg">
              <div className="border-b border-[#E3D8C3] pb-3">
                <span className="font-bengali text-[11px] font-semibold uppercase tracking-wider text-[#B58C3A]">
                  লাইভ প্রিভিউ
                </span>
                <h3 className="font-tiro text-xl text-[#2B1B17]">আপনার কাস্টম উপহারের বিবরণ</h3>
              </div>

              {/* Selected Box Snapshot */}
              <div className="mt-4 flex items-center gap-3 border-b border-[#E3D8C3] pb-4">
                <img
                  src={selectedBox.image}
                  alt={selectedBox.name}
                  className="h-14 w-14 rounded object-cover border border-[#E3D8C3]"
                />
                <div className="flex-1 text-xs">
                  <p className="font-bengali font-bold text-[#2B1B17]">{selectedBox.nameBn}</p>
                  <p className="text-[11px] text-[#8A6F5A]">মূল প্যাকেজিং ও পার্চমেন্ট কুশন</p>
                  <p className="mt-1 font-sans font-bold text-[#3D0C11]">৳{selectedBox.price}</p>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="mt-4 space-y-3 border-b border-[#E3D8C3] pb-4">
                <p className="font-bengali text-xs font-semibold text-[#2B1B17]">
                  যুক্ত উপহার সামগ্রী ({totalItemCount}টি):
                </p>

                {totalItemCount === 0 ? (
                  <p className="font-bengali text-xs italic text-[#8A6F5A]">
                    এখনো কোনো উপহার সামগ্রী যোগ করা হয়নি।
                  </p>
                ) : (
                  <div className="max-h-48 space-y-2 overflow-y-auto pr-1 text-xs">
                    {Object.entries(selectedItems).map(([id, qty]) => {
                      const item = ITEM_OPTIONS.find((i) => i.id === id);
                      if (!item) return null;

                      return (
                        <div key={id} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-[10px] text-[#8A6F5A]">{qty}x</span>
                            <span className="truncate font-bengali text-[#2B1B17]">{item.nameBn}</span>
                          </div>
                          <span className="shrink-0 font-sans font-medium text-[#3D0C11]">
                            ৳{item.price * qty}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Finishing Inclusions */}
              <div className="mt-4 space-y-1.5 border-b border-[#E3D8C3] pb-4 text-xs font-bengali">
                <div className="flex justify-between text-[#8A6F5A]">
                  <span>হাতে লেখা ক্যালিগ্রাফি চিরকুট</span>
                  <span className="font-bold text-[#B58C3A]">ফ্রি (৳০)</span>
                </div>
                <div className="flex justify-between text-[#8A6F5A]">
                  <span>ওয়াক্স সিলমোহর ও সাটিন ফিতা</span>
                  <span className="font-bold text-[#B58C3A]">ফ্রি (৳০)</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-bengali text-sm font-semibold text-[#2B1B17]">মোট মূল্য:</span>
                  <span className="font-sans text-2xl font-bold text-[#3D0C11]">৳{grandTotal}</span>
                </div>
                <p className="font-bengali text-[11px] text-[#8A6F5A]">
                  সারাদেশে হোম ডেলিভারি ও সুরক্ষিত ওয়াক্স-সিল প্যাকিং সহ।
                </p>
              </div>

              {/* Checkout / Finish Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={totalItemCount === 0}
                  className={`w-full rounded-[4px] py-3.5 font-bengali text-sm font-semibold shadow-md transition-all ${
                    totalItemCount > 0
                      ? 'bg-[#3D0C11] text-[#F6F1E4] hover:bg-[#2A070B] hover:shadow-lg'
                      : 'cursor-not-allowed bg-[#E3D8C3] text-[#8A6F5A]'
                  }`}
                >
                  {currentStep === 3 ? 'অর্ডার কনফার্ম করুন (চেকআউট) →' : 'বক্সটি সম্পন্ন করুন ও চেকআউট →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
