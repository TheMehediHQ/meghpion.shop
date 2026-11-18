import mongoose from 'mongoose';
import { env } from '../config/env.config.js';
import { ProductModel } from '../models/product.model.js';

const seedProducts = [
  {
    name: 'Shonar Bangla Artisan Gift Box',
    nameBn: 'সোনার বাংলা উপহার বক্স',
    slug: 'shonar-bangla-artisan-gift-box',
    price: 2450,
    discountPrice: 2200,
    stock: 25,
    category: 'gift-boxes',
    description: 'খাঁটি পাইনউড কাঠের বক্সে সাজানো হাতে তৈরি জুঁই ফুলের সুবাসিত মোমবাতি, লেদারেট ডায়রি, পিতলের বুকমার্ক এবং কাজুবাদামের ক্রাঞ্চ। সাথে রয়েছে ক্যালিগ্রাফার দ্বারা হাতে লেখা প্রেমময় চিরকুট।',
    shortDescription: 'খাঁটি পাইনউড বক্সে সাজানো প্রিমিয়াম ভিন্টেজ উপহার সম্ভার',
    images: [
      'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Best Seller', 'হস্তশিল্প', 'উপহার বক্স'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    name: 'Nakshi Kantha Embroidered Diary & Pen',
    nameBn: 'নকশিকাঁথা ডায়েরি ও রোজউড কলম',
    slug: 'nakshi-kantha-diary-pen',
    price: 1250,
    stock: 40,
    category: 'handicrafts',
    description: 'গ্রামীণ দক্ষ নারী কারিগরদের সুই-সুতায় হাতে সেলাই নকশিকাঁথা বাঁধানো রিল্যাক্সিং আর্ট ডায়েরি। সাথে প্রাকৃতিক রোজউড কাঠের তৈরি স্মুথ বলপেন ও পার্চমেন্ট খাপ।',
    shortDescription: 'হাতে সেলাই খাঁটি নকশিকাঁথা ডায়রি ও কাঠের কলম',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Artisan Made', 'ঐতিহ্যবাহী', 'হস্তশিল্প'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.8,
    reviewCount: 64,
  },
  {
    name: 'Artisanal Chocolates & Dry Fruits Hamper',
    nameBn: 'চকলেট ও ড্রাই ফ্রুটস হ্যাম্পার',
    slug: 'artisanal-chocolates-dry-fruits',
    price: 1850,
    stock: 18,
    category: 'chocolates',
    description: '১২টি হাতে তৈরি বেলজিয়ান ডার্ক ও মিল্ক চকলেট ট্রাফলের এক্সক্লুসিভ কালেকশন, সাথে সুন্দরবনের খাঁটি মধুতে রোস্ট করা কাজুবাদাম ও পেস্তার জার।',
    shortDescription: 'বেলজিয়ান চকলেট ট্রাফেল ও রোস্টেড ড্রাই ফ্রুটস হ্যাম্পার',
    images: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Gourmet', 'মিষ্টান্ন'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 5.0,
    reviewCount: 91,
  },
  {
    name: 'Personalised Wooden Photo Frame & Keepsake',
    nameBn: 'কাঠের কাস্টমাইজড ফটো ফ্রেম ও স্মারক',
    slug: 'personalized-wooden-photo-frame',
    price: 950,
    stock: 35,
    category: 'customized',
    description: 'প্রাকৃতিক মেহগনি কাঠে নাম ও বিশেষ তারিখ খোদাই করা ফটো ফ্রেম। প্রিয় স্মৃতিকে চিরদিনের মতো সাজিয়ে রাখার এক অপূর্ব স্মারক।',
    shortDescription: 'খোদাই করা নাম ও তারিখসহ প্রাকৃতিক কাঠের স্মৃতিফ্রেম',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Personalised', 'স্মারক', 'কাস্টমাইজড'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.8,
    reviewCount: 43,
  },
  {
    name: 'Monsoon Jasmine & Rose Floral Box',
    nameBn: 'গোলাপ ও বেলি ফুলের সুবাসিত বক্স',
    slug: 'monsoon-jasmine-rose-box',
    price: 1400,
    stock: 12,
    category: 'flowers',
    description: 'সতেজ লাল গোলাপ ও মিষ্টি সুবাসের বেলি ফুলের স্নিগ্ধ সমাহার। পার্চমেন্ট পেপারে মোড়ানো এবং সাটিন ফিতায় বাঁধা।',
    shortDescription: 'সতেজ দেশি গোলাপ ও বেলি ফুলের মায়াবী তোড়া',
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Seasonal', 'সতেজ ফুল'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.9,
    reviewCount: 57,
  },
  {
    name: 'Handmade Terracotta Desk Planter',
    nameBn: 'টেরাকোটা মাটির মিনি প্ল্যান্টার',
    slug: 'handmade-terracotta-planter',
    price: 650,
    stock: 50,
    category: 'handicrafts',
    description: 'বাংলার মৃৎশিল্পীদের নিপুণ হাতে গড়া ক্ষুদ্র টেরাকোটা প্ল্যান্টার। পড়ার টেবিল বা কাজের ডেস্কে এক টুকরো সবুজ প্রশান্তি এনে দেয়।',
    shortDescription: 'পোড়ামাটির কারুকার্যখচিত পরিবেশবান্ধব ডেক্স প্ল্যান্টার',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Eco-friendly', 'মৃৎশিল্প'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.7,
    reviewCount: 38,
  },
  {
    name: 'Brass Filigree Keepsake Jewelry Box',
    nameBn: 'পিতলের এন্টিক নকশা গহনা বক্স',
    slug: 'brass-filigree-jewelry-box',
    price: 1650,
    stock: 15,
    category: 'jewelry',
    description: 'খাঁটি পিতলের ফিলিগ্রি নকশায় তৈরি ভিন্টেজ অ্যান্টিক গহনা বক্স। এর সূক্ষ্ম কারুকাজ ও রাজকীয় দীপ্তি উপহার হিসেবে অনন্য।',
    shortDescription: 'খাঁটি পিতলে হাতে খোদাই করা অ্যান্টিক অলংকার বক্স',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Heritage', 'খাঁটি পিতল'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.9,
    reviewCount: 29,
  },
  {
    name: 'Executive Corporate Executive Hamper',
    nameBn: 'কর্পোরেট এক্সিকিউটিভ গিফট হ্যাম্পার',
    slug: 'corporate-executive-hamper',
    price: 3200,
    discountPrice: 2950,
    stock: 20,
    category: 'corporate-hampers',
    description: 'সম্মানিত ক্লায়েন্ট ও সহকর্মীদের জন্য এক্সিকিউটিভ কাঠের বক্স, মেটালিক কলম, চামড়ার ডায়েরি, খাঁটি আতর এবং প্রিমিয়াম রোস্টেড নাটস জার।',
    shortDescription: 'কর্পোরেট রিলেশন ও উৎসবের জন্য এক্সিকিউটিভ লাক্সারি হ্যাম্পার',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Corporate', 'লাক্সারি'],
    isFeatured: true,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 5.0,
    reviewCount: 52,
  },
  {
    name: 'Vintage Calligraphy Parchment Greeting Card',
    nameBn: 'হাতে লেখা ক্যালিগ্রাফি শুভেচ্ছা চিরকুট',
    slug: 'vintage-calligraphy-greeting-card',
    price: 180,
    stock: 100,
    category: 'greeting-cards',
    description: 'নিব ও কালির স্পর্শে পার্চমেন্ট পেপারে লেখা ক্যালিগ্রাফি কার্ড। সাথে থাকছে খাঁটি লাল ওয়াক্স সিলমোহরের মোহনীয় ফিনিশ।',
    shortDescription: 'হাতে লেখা ক্যালিগ্রাফি ও ওয়াক্স সিলমোহরযুক্ত চিঠি',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Calligraphy', 'চিরকুট'],
    isFeatured: false,
    isAvailable: true,
    giftWrapAvailable: true,
    rating: 4.9,
    reviewCount: 114,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', env.MONGODB_URI);
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    console.log('Seeding products...');
    for (const prod of seedProducts) {
      await ProductModel.findOneAndUpdate(
        { slug: prod.slug },
        { $set: prod },
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${prod.nameBn} (${prod.slug})`);
    }

    const totalCount = await ProductModel.countDocuments();
    console.log(`\nSuccessfully seeded database! Total products in catalog: ${totalCount}`);
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedDatabase();
