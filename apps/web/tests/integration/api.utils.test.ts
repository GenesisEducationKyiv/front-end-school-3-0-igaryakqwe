import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { handleAPIResponse } from '../../src/utils/api.utils';

const DummySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const DummySchemaWithOptional = z.object({
  id: z.string(),
  name: z.string().optional(),
});

function createMockResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = { 'Content-Type': 'application/json' }
): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

function createRawResponse(
  rawText: string,
  status = 200,
  headers: Record<string, string> = { 'Content-Type': 'application/json' }
): Response {
  return new Response(rawText, { status, headers });
}

describe('handleAPIResponse', () => {
  it('returns parsed data for valid response', async () => {
    const response = createMockResponse({ id: '1', name: 'Test' });
    const result = await handleAPIResponse(response, DummySchema);
    expect(result).toEqual({ id: '1', name: 'Test' });
  });

  it('parses schema with optional fields', async () => {
    const data = { id: '1' };
    const response = createMockResponse(data);
    const result = await handleAPIResponse(response, DummySchemaWithOptional);
    expect(result).toEqual(data);
  });

  it('throws on malformed JSON', async () => {
    const malformedJSON = '{"id": "123", "name": "Test"';
    const response = createRawResponse(malformedJSON);
    await expect(() =>
      handleAPIResponse(response, DummySchema)
    ).rejects.toThrowError(/JSON/);
  });

  it('throws error if content-type is not JSON', async () => {
    const response = new Response('<html>Error</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
    await expect(() =>
      handleAPIResponse(response, DummySchema)
    ).rejects.toThrow();
  });

  it('throws on empty JSON response', async () => {
    const response = createRawResponse('');
    await expect(() =>
      handleAPIResponse(response, DummySchema)
    ).rejects.toThrow();
  });

  it('throws if response body is null', async () => {
    const response = createMockResponse(null);
    await expect(() =>
      handleAPIResponse(response, DummySchema)
    ).rejects.toThrow();
  });

  it('handles unexpected HTTP status and delegates to handleErrorResponse', async () => {
    const response = createMockResponse({ error: 'Teapot' }, 418);
    await expect(() =>
      handleAPIResponse(response, DummySchema)
    ).rejects.toThrow('Teapot');
  });
});
