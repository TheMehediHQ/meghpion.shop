import { z } from 'zod';
export declare const ContactMessageSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    name: string;
    email: string;
    subject: string;
    phone?: string | undefined;
}, {
    message: string;
    name: string;
    email: string;
    subject: string;
    phone?: string | undefined;
}>;
export declare const NewsletterSubscribeSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
//# sourceMappingURL=contact.schema.d.ts.map