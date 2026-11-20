import { z } from 'zod';
import { BangladeshiPhoneRegex } from './auth.schema.js';
export const ContactMessageSchema = z.object({
    name: z.string().min(2, 'Name is required').trim(),
    email: z.string().email('Valid email address is required').toLowerCase().trim(),
    phone: z
        .string()
        .regex(BangladeshiPhoneRegex, 'Valid phone number is required')
        .optional()
        .or(z.literal('')),
    subject: z.string().min(3, 'Subject is required').trim(),
    message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});
export const NewsletterSubscribeSchema = z.object({
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
});
