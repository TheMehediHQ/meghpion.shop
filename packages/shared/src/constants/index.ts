export const BRAND = {
  name: 'Meghpeon',
  nameBn: 'মেঘপিয়ন',
  domain: 'meghpeon.shop',
  tagline: 'ভালোবাসা পৌঁছে যাক উপহারে।',
  taglineEn: 'Delivering love wrapped in gifts.',
  currency: 'BDT',
  currencySymbol: '৳',
  supportPhone: '01789335268',
  supportEmail: 'support@meghpeon.shop',
  address: 'Dhaka, Bangladesh',
} as const;

export const PRODUCT_CATEGORIES = [
  { id: 'gift-boxes', nameEn: 'Curated Gift Boxes', nameBn: 'উপহার বক্স' },
  { id: 'customized', nameEn: 'Personalized Gifts', nameBn: 'কাস্টমাইজড উপহার' },
  { id: 'handicrafts', nameEn: 'Bangladeshi Handicrafts', nameBn: 'হস্তশিল্প ও নকশিকাঁথা' },
  { id: 'chocolates', nameEn: 'Premium Chocolates & Treats', nameBn: 'চকলেট ও মিষ্টি' },
  { id: 'flowers', nameEn: 'Fresh & Dried Flowers', nameBn: 'ফুল ও তোড়া' },
  { id: 'jewelry', nameEn: 'Artisanal Jewelry', nameBn: 'গহনা' },
  { id: 'greeting-cards', nameEn: 'Artisan Greeting Cards', nameBn: 'শুভেচ্ছা কার্ড' },
] as const;

export const BD_DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
] as const;

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
] as const;

export const PAYMENT_STATUSES = [
  'pending',
  'paid',
  'failed',
  'refunded',
] as const;

export const PAYMENT_METHODS = [
  'cod', // Cash on Delivery
  'bkash',
  'nagad',
  'card',
] as const;

export const USER_ROLES = ['customer', 'admin', 'moderator'] as const;
