import { z } from 'zod';
import { USER_ROLES } from '../constants/index.js';

export const UserRoleSchema = z.enum(USER_ROLES);

export const BangladeshiPhoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;

export const LoginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(3, 'Please enter a valid email address or phone number')
    .trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').trim(),
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    phone: z
      .string()
      .regex(BangladeshiPhoneRegex, 'Please enter a valid Bangladeshi phone number (e.g. 01700000000)'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const CreateStaffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  phone: z
    .string()
    .regex(BangladeshiPhoneRegex, 'Please enter a valid Bangladeshi phone number (e.g. 01700000000)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['employee', 'moderator', 'admin']).default('employee'),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export const AdminResetStaffPasswordSchema = z.object({
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: UserRoleSchema,
  avatarUrl: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
