import { z } from 'zod';
export declare const PaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    order: "asc" | "desc";
    sort?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sort?: string | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare const PaginationMetaSchema: z.ZodObject<{
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPrevPage: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}>;
export declare const ApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    data: T;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    data: T;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    data: T;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
export declare const ApiErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        details?: any;
    }, {
        code: string;
        message: string;
        details?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}, {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
}>;
export declare const HealthCheckResponseSchema: z.ZodObject<{
    status: z.ZodEnum<["ok", "degraded", "down"]>;
    timestamp: z.ZodString;
    uptime: z.ZodNumber;
    service: z.ZodString;
    version: z.ZodString;
    database: z.ZodObject<{
        connected: z.ZodBoolean;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        connected: boolean;
    }, {
        status: string;
        connected: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "ok" | "degraded" | "down";
    timestamp: string;
    uptime: number;
    service: string;
    version: string;
    database: {
        status: string;
        connected: boolean;
    };
}, {
    status: "ok" | "degraded" | "down";
    timestamp: string;
    uptime: number;
    service: string;
    version: string;
    database: {
        status: string;
        connected: boolean;
    };
}>;
//# sourceMappingURL=api.schema.d.ts.map