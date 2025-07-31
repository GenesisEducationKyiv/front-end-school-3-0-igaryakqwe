import { vi } from 'vitest';

export const mockUseTracksSearch = vi.fn();
export const mockUsePagination = vi.fn();
export const mockFilterTracks = vi.fn();
export const mockSerialize = vi.fn();

vi.mock('../../src/features/tracks/hooks/use-tracks-search.ts', () => ({
  default: mockUseTracksSearch,
}));

vi.mock('../../src/hooks/use-pagination.ts', () => ({
  usePagination: mockUsePagination,
}));

vi.mock('../../src/features/tracks/lib/utils.ts', () => ({
  filterTracks: mockFilterTracks,
  serialize: mockSerialize,
}));
