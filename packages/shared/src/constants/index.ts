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
  { id: 'customized', nameEn: 'Customize Gifts', nameBn: 'কাস্টমাইজড উপহার' },
  { id: 'chocolates', nameEn: 'Chocolates', nameBn: 'চকলেট ও মিষ্টি' },
  { id: 'flowers', nameEn: 'Flowers', nameBn: 'ফুল ও তোড়া' },
  { id: 'women-jewelry', nameEn: "Women's Jewellery", nameBn: 'নারীদের গহনা' },
  { id: 'male-jewelry', nameEn: "Male Jewellery", nameBn: 'পুরুষদের গহনা' },
  { id: 'cake', nameEn: 'Cakes', nameBn: 'কেক ও পেস্ট্রি' },
  { id: 'combo-pack', nameEn: 'Combo Pack', nameBn: 'কম্বো প্যাক' },
  { id: 'others', nameEn: 'Others', nameBn: 'অন্যান্য উপহার' },
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
