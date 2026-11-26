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
};
export const PRODUCT_CATEGORIES = [
    { id: 'custom-gifts', nameEn: 'Custom Gifts', nameBn: 'কাস্টম উপহার' },
    { id: 'cakes-pastries', nameEn: 'Cakes & Pastries', nameBn: 'কেক ও পেস্ট্রি' },
    { id: 'mens-accessories', nameEn: "Men's Accessories", nameBn: 'পুরুষদের অ্যাক্সেসরিজ' },
    { id: 'chocolates', nameEn: 'Chocolates', nameBn: 'চকলেট ও মিষ্টি' },
    { id: 'flowers', nameEn: 'Flowers', nameBn: 'ফুল ও তোড়া' },
    { id: 'womens-jewellery', nameEn: "Women's Jewellery", nameBn: 'নারীদের গহনা' },
    { id: 'combo-gift-box', nameEn: 'Combo Gift Box', nameBn: 'কম্বো গিফট বক্স' },
    { id: 'others', nameEn: 'Others', nameBn: 'অন্যান্য উপহার' },
];
export const BD_DIVISIONS = [
    'Dhaka',
    'Chattogram',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Sylhet',
    'Rangpur',
    'Mymensingh',
];
export const ORDER_STATUSES = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
];
export const PAYMENT_STATUSES = [
    'pending',
    'paid',
    'failed',
    'refunded',
];
export const PAYMENT_METHODS = [
    'cod', // Cash on Delivery
    'bkash',
    'nagad',
    'card',
];
export const USER_ROLES = ['customer', 'employee', 'admin', 'moderator'];
