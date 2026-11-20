import { z } from 'zod';
export declare const UserRoleSchema: z.ZodEnum<["customer", "admin", "moderator"]>;
export declare const BangladeshiPhoneRegex: RegExp;
export declare const LoginSchema: z.ZodObject<{
    emailOrPhone: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    emailOrPhone: string;
    password: string;
}, {
    emailOrPhone: string;
    password: string;
}>;
export declare const RegisterSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    name: string;
    email: string;
    phone: string;
    confirmPassword: string;
}, {
    password: string;
    name: string;
    email: string;
    phone: string;
    confirmPassword: string;
}>, {
    password: string;
    name: string;
    email: string;
    phone: string;
    confirmPassword: string;
}, {
    password: string;
    name: string;
    email: string;
    phone: string;
    confirmPassword: string;
}>;
export declare const UserProfileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    role: z.ZodEnum<["customer", "admin", "moderator"]>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    id: string;
    role: "customer" | "admin" | "moderator";
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string | undefined;
}, {
    name: string;
    email: string;
    phone: string;
    id: string;
    role: "customer" | "admin" | "moderator";
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string | undefined;
}>;
//# sourceMappingURL=auth.schema.d.ts.map