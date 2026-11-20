import { z } from 'zod';
export declare const OrderStatusEnum: z.ZodEnum<["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"]>;
export declare const PaymentStatusEnum: z.ZodEnum<["pending", "paid", "failed", "refunded"]>;
export declare const PaymentMethodEnum: z.ZodEnum<["cod", "bkash", "nagad", "card"]>;
export declare const DivisionEnum: z.ZodEnum<["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]>;
export declare const ShippingAddressSchema: z.ZodObject<{
    fullName: z.ZodString;
    phone: z.ZodString;
    alternativePhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    division: z.ZodEnum<["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]>;
    district: z.ZodString;
    addressLine: z.ZodString;
    postalCode: z.ZodOptional<z.ZodString>;
    deliveryNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phone: string;
    fullName: string;
    division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
    district: string;
    addressLine: string;
    alternativePhone?: string | undefined;
    postalCode?: string | undefined;
    deliveryNotes?: string | undefined;
}, {
    phone: string;
    fullName: string;
    division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
    district: string;
    addressLine: string;
    alternativePhone?: string | undefined;
    postalCode?: string | undefined;
    deliveryNotes?: string | undefined;
}>;
export declare const OrderItemSchema: z.ZodObject<{
    productId: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
    image: z.ZodOptional<z.ZodString>;
    giftWrap: z.ZodDefault<z.ZodBoolean>;
    giftMessage: z.ZodOptional<z.ZodString>;
    customText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    productId: string;
    quantity: number;
    giftWrap: boolean;
    image?: string | undefined;
    giftMessage?: string | undefined;
    customText?: string | undefined;
}, {
    name: string;
    price: number;
    productId: string;
    quantity?: number | undefined;
    image?: string | undefined;
    giftWrap?: boolean | undefined;
    giftMessage?: string | undefined;
    customText?: string | undefined;
}>;
export declare const CreateOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodNumber>;
        image: z.ZodOptional<z.ZodString>;
        giftWrap: z.ZodDefault<z.ZodBoolean>;
        giftMessage: z.ZodOptional<z.ZodString>;
        customText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        productId: string;
        quantity: number;
        giftWrap: boolean;
        image?: string | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }, {
        name: string;
        price: number;
        productId: string;
        quantity?: number | undefined;
        image?: string | undefined;
        giftWrap?: boolean | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        phone: z.ZodString;
        alternativePhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        division: z.ZodEnum<["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]>;
        district: z.ZodString;
        addressLine: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        deliveryNotes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    }, {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    }>;
    paymentMethod: z.ZodEnum<["cod", "bkash", "nagad", "card"]>;
    giftWrap: z.ZodDefault<z.ZodBoolean>;
    giftNote: z.ZodOptional<z.ZodString>;
    couponCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    giftWrap: boolean;
    items: {
        name: string;
        price: number;
        productId: string;
        quantity: number;
        giftWrap: boolean;
        image?: string | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }[];
    shippingAddress: {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    };
    paymentMethod: "cod" | "bkash" | "nagad" | "card";
    giftNote?: string | undefined;
    couponCode?: string | undefined;
}, {
    items: {
        name: string;
        price: number;
        productId: string;
        quantity?: number | undefined;
        image?: string | undefined;
        giftWrap?: boolean | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }[];
    shippingAddress: {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    };
    paymentMethod: "cod" | "bkash" | "nagad" | "card";
    giftWrap?: boolean | undefined;
    giftNote?: string | undefined;
    couponCode?: string | undefined;
}>;
export declare const TrackOrderQuerySchema: z.ZodObject<{
    orderNumber: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderNumber: string;
    phone?: string | undefined;
}, {
    orderNumber: string;
    phone?: string | undefined;
}>;
export declare const TrackingEventSchema: z.ZodObject<{
    status: z.ZodEnum<["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"]>;
    timestamp: z.ZodString;
    description: z.ZodString;
    location: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
    timestamp: string;
    description: string;
    location?: string | undefined;
}, {
    status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
    timestamp: string;
    description: string;
    location?: string | undefined;
}>;
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodString;
    orderNumber: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        price: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodNumber>;
        image: z.ZodOptional<z.ZodString>;
        giftWrap: z.ZodDefault<z.ZodBoolean>;
        giftMessage: z.ZodOptional<z.ZodString>;
        customText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        productId: string;
        quantity: number;
        giftWrap: boolean;
        image?: string | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }, {
        name: string;
        price: number;
        productId: string;
        quantity?: number | undefined;
        image?: string | undefined;
        giftWrap?: boolean | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        phone: z.ZodString;
        alternativePhone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
        division: z.ZodEnum<["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"]>;
        district: z.ZodString;
        addressLine: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        deliveryNotes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    }, {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    }>;
    paymentMethod: z.ZodEnum<["cod", "bkash", "nagad", "card"]>;
    paymentStatus: z.ZodEnum<["pending", "paid", "failed", "refunded"]>;
    orderStatus: z.ZodEnum<["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"]>;
    subtotal: z.ZodNumber;
    deliveryFee: z.ZodNumber;
    discount: z.ZodDefault<z.ZodNumber>;
    giftWrapFee: z.ZodDefault<z.ZodNumber>;
    total: z.ZodNumber;
    timeline: z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"]>;
        timestamp: z.ZodString;
        description: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
        timestamp: string;
        description: string;
        location?: string | undefined;
    }, {
        status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
        timestamp: string;
        description: string;
        location?: string | undefined;
    }>, "many">;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    total: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    items: {
        name: string;
        price: number;
        productId: string;
        quantity: number;
        giftWrap: boolean;
        image?: string | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }[];
    shippingAddress: {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    };
    paymentMethod: "cod" | "bkash" | "nagad" | "card";
    orderNumber: string;
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
    subtotal: number;
    deliveryFee: number;
    discount: number;
    giftWrapFee: number;
    timeline: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
        timestamp: string;
        description: string;
        location?: string | undefined;
    }[];
    userId?: string | undefined;
}, {
    total: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    items: {
        name: string;
        price: number;
        productId: string;
        quantity?: number | undefined;
        image?: string | undefined;
        giftWrap?: boolean | undefined;
        giftMessage?: string | undefined;
        customText?: string | undefined;
    }[];
    shippingAddress: {
        phone: string;
        fullName: string;
        division: "Dhaka" | "Chattogram" | "Rajshahi" | "Khulna" | "Barishal" | "Sylhet" | "Rangpur" | "Mymensingh";
        district: string;
        addressLine: string;
        alternativePhone?: string | undefined;
        postalCode?: string | undefined;
        deliveryNotes?: string | undefined;
    };
    paymentMethod: "cod" | "bkash" | "nagad" | "card";
    orderNumber: string;
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
    subtotal: number;
    deliveryFee: number;
    timeline: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
        timestamp: string;
        description: string;
        location?: string | undefined;
    }[];
    userId?: string | undefined;
    discount?: number | undefined;
    giftWrapFee?: number | undefined;
}>;
//# sourceMappingURL=order.schema.d.ts.map