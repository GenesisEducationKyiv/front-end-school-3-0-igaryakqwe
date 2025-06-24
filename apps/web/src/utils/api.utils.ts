import { APIErrorSchema } from '@/types/api';
import { ZodSchema } from 'zod';

export const handleErrorResponse = async (response: Response) => {
  const raw = await response.json();
  const errorResult = APIErrorSchema.safeParse(raw);

  if (errorResult.success) {
    throw new Error(errorResult.data.error);
  }

  console.error('API error format is invalid:', errorResult.error.format());
  throw new Error('API request failed with unknown error');
}


export const handleAPIResponse = async <T>(
  response: Response,
  schema: ZodSchema<T>
): Promise<T> => {
  const raw = await response.json();

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    console.error('Zod validation error:', result.error.format());
    throw new Error('Invalid API response format');
  }

  return result.data;
}