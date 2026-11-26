import { z } from 'zod';
export declare const UserRoleSchema: z.ZodEnum<["customer", "employee", "admin", "moderator"]>;
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
export declare const CreateStaffSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["employee", "moderator", "admin"]>>;
}, "strip", z.ZodTypeAny, {
    password: string;
    name: string;
    email: string;
    phone: string;
    role: "employee" | "admin" | "moderator";
}, {
    password: string;
    name: string;
    email: string;
    phone: string;
    role?: "employee" | "admin" | "moderator" | undefined;
}>;
export declare const ChangePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
export declare const AdminResetStaffPasswordSchema: z.ZodObject<{
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
}, {
    newPassword: string;
}>;
export declare const UserProfileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    role: z.ZodEnum<["customer", "employee", "admin", "moderator"]>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    phone: string;
    role: "customer" | "employee" | "admin" | "moderator";
    id: string;
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string | undefined;
}, {
    name: string;
    email: string;
    phone: string;
    role: "customer" | "employee" | "admin" | "moderator";
    id: string;
    createdAt: string;
    updatedAt: string;
    avatarUrl?: string | undefined;
}>;
//# sourceMappingURL=auth.schema.d.ts.map