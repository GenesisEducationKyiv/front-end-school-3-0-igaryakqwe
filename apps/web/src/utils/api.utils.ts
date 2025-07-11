import { ZodSchema } from 'zod';

import { APIErrorSchema } from '@/types/api';

export const handleErrorResponse = async (response: Response) => {
  const raw = await response.json();
  const errorResult = APIErrorSchema.safeParse(raw);

  if (errorResult.success) {
    throw new Error(errorResult.data.error);
  }

  console.error('API error format is invalid:', errorResult.error.format());
  throw new Error('API request failed with unknown error');
};

export const handleAPIResponse = async <T>(
  response: Response,
  schema: ZodSchema<T>
): Promise<T> => {
  if (!response.ok) {
    await handleErrorResponse(response);
  }

  const raw = await response.json();
  const result = schema.safeParse(raw);

  if (!result.success) {
    console.error('Zod validation error:', result.error.format());
    throw new Error('Invalid API response format');
  }

  return result.data;
};

export const handleGrpcResponse = <T>(
  response: unknown,
  schema: ZodSchema<T>
): T => {
  const result = schema.safeParse(response);
  if (!result.success) {
    console.error('Zod validation error (gRPC):', result.error.format());
    throw new Error('Invalid gRPC response format');
  }
  return result.data;
};

export const handleGrpcError = (error: unknown): never => {
  if (error instanceof Error) {
    throw new Error(error.message || 'gRPC request failed');
  }
  throw new Error('gRPC request failed with unknown error');
};
