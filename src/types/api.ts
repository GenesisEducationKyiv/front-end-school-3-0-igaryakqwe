import { z } from 'zod';

export const APIMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const APIResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    meta: APIMetaSchema,
  });

export const APIErrorSchema = z.object({
  error: z.string(),
});

export const APIDeleteResponseSchema = z.object({
  success: z.array(z.string()),
  failed: z.array(z.string()),
});

export type APIMeta = z.infer<typeof APIMetaSchema>;
export type APIResponse<T> = z.infer<ReturnType<typeof APIResponseSchema<z.ZodType<T>>>>;
export type APIError = z.infer<typeof APIErrorSchema>;
export type APIDeleteResponse = z.infer<typeof APIDeleteResponseSchema>;