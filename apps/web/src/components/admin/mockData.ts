import { BRAND, PRODUCT_CATEGORIES, BD_DIVISIONS, ORDER_STATUSES, PAYMENT_METHODS, PAYMENT_STATUSES } from '@meghpiyon/shared';

export interface AdminProduct {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  image: string;
  tags: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  giftWrapAvailable: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  division: string;
  district: string;
  addressLine: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    giftWrap: boolean;
    customText?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  giftWrapFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  giftMessage?: string;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  division: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  status: 'active' | 'inactive';
}

export interface StoreSettings {
  storeName: string;
  supportPhone: string;
  supportEmail: string;
  deliveryFeeDhaka: number;
  deliveryFeeOutside: number;
  freeDeliveryThreshold: number;
  giftWrapFee: number;
}

export const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod-1',
    name: 'Shonar Bangla Artisan Gift Box',
    nameBn: 'সোনার বাংলা উপহার বক্স',
    slug: 'shonar-bangla-artisan-gift-box',
    price: 2450,
    discountPrice: 2200,
    stock: 18,
    category: 'combo-pack',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
    tags: ['Best Seller', 'Handcrafted', 'Festive'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 5,
    reviewCount: 34,
    description: 'A luxurious curation of traditional brass accents, pure flower honey, and handcrafted diary.',
    createdAt: '2026-10-15',
  },
  {
    id: 'prod-2',
    name: 'Nakshi Kantha Embroidered Diary & Pen',
    nameBn: 'নকশিকাঁথা ডায়েরি ও কলম',
    slug: 'nakshi-kantha-diary-pen',
    price: 1250,
    discountPrice: 1100,
    stock: 25,
    category: 'customized',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    tags: ['Traditional', 'Artisan'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.9,
    reviewCount: 28,
    description: 'Hand-stitched Nakshi Kantha hardcover diary paired with an elegant bamboo ballpoint pen.',
    createdAt: '2026-10-18',
  },
  {
    id: 'prod-3',
    name: 'Artisanal Chocolates & Dry Fruits Hamper',
    nameBn: 'চকলেট ও ড্রাই ফ্রুটস হ্যাম্পার',
    slug: 'artisanal-chocolates-dry-fruits',
    price: 1850,
    discountPrice: 1750,
    stock: 4, // low stock!
    category: 'chocolates',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80',
    tags: ['Gourmet', 'Treats'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 5,
    reviewCount: 42,
    description: 'Assorted Belgian-style dark truffles, roasted cashew nuts, Afghan almonds, and Iranian pistachios.',
    createdAt: '2026-10-22',
  },
  {
    id: 'prod-4',
    name: 'Personalized Wooden Photo Frame & Keepsake',
    nameBn: 'কাঠের কাস্টমাইজড ফটো ফ্রেম',
    slug: 'personalized-wooden-photo-frame',
    price: 950,
    stock: 14,
    category: 'customized',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    tags: ['Customized', 'Laser Engraved'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.8,
    reviewCount: 19,
    description: 'Custom laser engraved mahogany wood frame with personalized names and romantic quotes.',
    createdAt: '2026-11-01',
  },
  {
    id: 'prod-5',
    name: 'Monsoon Jasmine & Red Rose Floral Box',
    nameBn: 'গোলাপ ও বেলি ফুলের বক্স',
    slug: 'monsoon-jasmine-rose-box',
    price: 1450,
    stock: 0, // out of stock!
    category: 'flowers',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&auto=format&fit=crop&q=80',
    tags: ['Fresh', 'Aromatic'],
    isFeatured: false,
    isAvailable: false,
    giftWrapAvailable: false,
    rating: 4.9,
    reviewCount: 15,
    description: 'Fresh Dutch red roses combined with fragrant seasonal jasmine petals in a velvet hatbox.',
    createdAt: '2026-11-05',
  },
  {
    id: 'prod-6',
    name: 'Handmade Terracotta Planter & Succulent Set',
    nameBn: 'মাটির তৈরি প্ল্যান্টার ও সাকুলেন্ট',
    slug: 'terracotta-planter-succulent-set',
    price: 750,
    stock: 22,
    category: 'customized',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    tags: ['Eco-friendly', 'Green'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.7,
    reviewCount: 11,
    description: 'Crafted by rural potters in Bogura with natural clay, includes low maintenance live succulent.',
    createdAt: '2026-11-08',
  },
];

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'MP-DHK-4821',
    customerName: 'Tanvir Hossain',
    customerPhone: '01711223344',
    customerEmail: 'tanvir@gmail.com',
    division: 'Dhaka',
    district: 'Dhaka (Uttara)',
    addressLine: 'House 42, Road 7, Sector 4, Uttara',
    items: [
      {
        productId: 'prod-1',
        name: 'Shonar Bangla Artisan Gift Box',
        price: 2200,
        quantity: 1,
        giftWrap: true,
        customText: 'To my dearest sister',
      },
    ],
    subtotal: 2200,
    deliveryFee: 60,
    giftWrapFee: 50,
    discount: 0,
    total: 2310,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    giftMessage: 'শুভ জন্মদিন আপু! সবসময় ভালো থেকো।',
    createdAt: '2026-11-10 14:32',
  },
  {
    id: 'ord-102',
    orderNumber: 'MP-CTG-4822',
    customerName: 'Sumaiya Akhter',
    customerPhone: '01819876543',
    customerEmail: 'sumaiya.ctg@yahoo.com',
    division: 'Chattogram',
    district: 'Chattogram Sadar',
    addressLine: 'Flat 4B, Green View Tower, Nasirabad',
    items: [
      {
        productId: 'prod-3',
        name: 'Artisanal Chocolates & Dry Fruits Hamper',
        price: 1750,
        quantity: 2,
        giftWrap: true,
      },
    ],
    subtotal: 3500,
    deliveryFee: 120,
    giftWrapFee: 100,
    discount: 100,
    total: 3620,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    giftMessage: 'Happy Anniversary to both of you!',
    createdAt: '2026-11-12 09:15',
  },
  {
    id: 'ord-103',
    orderNumber: 'MP-SYL-4823',
    customerName: 'Farhan Ahmed',
    customerPhone: '01912345678',
    customerEmail: 'farhan.syl@gmail.com',
    division: 'Sylhet',
    district: 'Sylhet Sadar',
    addressLine: 'House 12, Housing Estate',
    items: [
      {
        productId: 'prod-2',
        name: 'Nakshi Kantha Embroidered Diary & Pen',
        price: 1100,
        quantity: 1,
        giftWrap: false,
      },
      {
        productId: 'prod-4',
        name: 'Personalized Wooden Photo Frame & Keepsake',
        price: 950,
        quantity: 1,
        giftWrap: true,
        customText: 'Farhan & Nabila - 2026',
      },
    ],
    subtotal: 2050,
    deliveryFee: 120,
    giftWrapFee: 50,
    discount: 0,
    total: 2220,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    giftMessage: 'A special token of our memories.',
    createdAt: '2026-11-13 11:20',
  },
  {
    id: 'ord-104',
    orderNumber: 'MP-DHK-4824',
    customerName: 'Nusrat Jahan',
    customerPhone: '01755667788',
    customerEmail: 'nusrat.jahan@hotmail.com',
    division: 'Dhaka',
    district: 'Dhaka (Gulshan-2)',
    addressLine: 'Apt 5A, Road 57, Gulshan 2',
    items: [
      {
        productId: 'prod-1',
        name: 'Shonar Bangla Artisan Gift Box',
        price: 2200,
        quantity: 1,
        giftWrap: true,
      },
    ],
    subtotal: 2200,
    deliveryFee: 60,
    giftWrapFee: 50,
    discount: 0,
    total: 2310,
    paymentMethod: 'bkash',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    giftMessage: 'Warm wishes for your new journey!',
    createdAt: '2026-11-13 16:45',
  },
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'c-1',
    name: 'Tanvir Hossain',
    phone: '01711223344',
    email: 'tanvir@gmail.com',
    division: 'Dhaka',
    totalOrders: 3,
    totalSpent: 6420,
    joinedAt: '2026-08-14',
    status: 'active',
  },
  {
    id: 'c-2',
    name: 'Sumaiya Akhter',
    phone: '01819876543',
    email: 'sumaiya.ctg@yahoo.com',
    division: 'Chattogram',
    totalOrders: 2,
    totalSpent: 5120,
    joinedAt: '2026-09-02',
    status: 'active',
  },
  {
    id: 'c-3',
    name: 'Farhan Ahmed',
    phone: '01912345678',
    email: 'farhan.syl@gmail.com',
    division: 'Sylhet',
    totalOrders: 1,
    totalSpent: 2220,
    joinedAt: '2026-10-10',
    status: 'active',
  },
  {
    id: 'c-4',
    name: 'Nusrat Jahan',
    phone: '01755667788',
    email: 'nusrat.jahan@hotmail.com',
    division: 'Dhaka',
    totalOrders: 1,
    totalSpent: 2310,
    joinedAt: '2026-11-01',
    status: 'active',
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: BRAND.name,
  supportPhone: BRAND.supportPhone,
  supportEmail: BRAND.supportEmail,
  deliveryFeeDhaka: 60,
  deliveryFeeOutside: 120,
  freeDeliveryThreshold: 4000,
  giftWrapFee: 50,
};

// Storage keys
const STORAGE_PREFIX = 'meghpiyon_admin_';

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.error('Failed reading localStorage', err);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed saving to localStorage', err);
  }
}
