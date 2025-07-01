import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getTracks } from '../../src/features/tracks/api/tracks.api';
import useTracksQuery from '../../src/features/tracks/hooks/use-tracks-query';
import useTracksSearch from '../../src/features/tracks/hooks/use-tracks-search';
import { filterTracks, serialize } from '../../src/features/tracks/lib/utils';
import { usePagination } from '../../src/hooks/use-pagination';

vi.mock('@/hooks/use-debounce.ts', () => ({
  default: vi.fn((value) => value),
}));

vi.mock('@/features/tracks/hooks/use-tracks-search.ts', () => ({
  default: vi.fn(),
}));

vi.mock('@/hooks/use-pagination.ts', () => ({
  usePagination: vi.fn(),
}));

vi.mock('@/features/tracks/lib/utils.ts', () => ({
  filterTracks: vi.fn(),
  serialize: vi.fn(),
}));

vi.mock('@/features/tracks/api/tracks.api', () => ({
  getTracks: vi.fn(),
}));

const mockUseTracksSearch = vi.mocked(useTracksSearch);
const mockUsePagination = vi.mocked(usePagination);
const mockFilterTracks = vi.mocked(filterTracks);
const mockSerialize = vi.mocked(serialize);
const mockGetTracks = vi.mocked(getTracks);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useTracksQuery Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseTracksSearch.mockReturnValue({
      state: {
        album: '',
        search: '',
        artist: '',
        searchParams: {},
        limit: 10,
        page: undefined,
        sort: undefined,
        order: undefined,
        genre: undefined,
      },
      actions: {
        setSearchParams: vi.fn(),
        setSearch: vi.fn(),
        setGenre: vi.fn(),
        setArtist: vi.fn(),
        setAlbum: vi.fn(),
        setSort: vi.fn(),
        setOrder: vi.fn(),
      },
    });

    mockUsePagination.mockReturnValue({
      currentPage: 1,
      handlePageChange: vi.fn(),
      totalPages: 1,
      setCurrentPage: function (): Promise<URLSearchParams> {
        throw new Error('Function not implemented.');
      },
      currentItems: function <T>(): T[] {
        throw new Error('Function not implemented.');
      },
    });

    mockSerialize.mockImplementation((params) => params as unknown as string);
    mockFilterTracks.mockImplementation((tracks) => tracks);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch tracks successfully', async () => {
    const mockResponse = {
      data: [
        { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
        { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
      ],
      meta: { total: 2, page: 1, limit: 10 },
    };

    mockGetTracks.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.tracks).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tracks).toEqual(mockResponse.data);
    expect(result.current.error).toBeNull();
  });

  it('should handle search parameters correctly', () => {
    const searchState = {
      album: 'Test Album',
      search: 'test search',
      artist: 'Test Artist',
      searchParams: { genre: 'rock' },
      limit: 20,
    };

    mockUseTracksSearch.mockReturnValue({
      state: {
        ...searchState,
        page: undefined,
        sort: undefined,
        order: undefined,
        genre: undefined,
      },
      actions: {
        setSearchParams: vi.fn(),
        setSearch: vi.fn(),
        setGenre: vi.fn(),
        setArtist: vi.fn(),
        setAlbum: vi.fn(),
        setSort: vi.fn(),
        setOrder: vi.fn(),
      },
    });

    const expectedParams = {
      genre: 'rock',
      search: 'test search',
      artist: 'Test Artist',
      limit: 20,
    };

    mockGetTracks.mockResolvedValue({
      data: [],
      meta: { total: 0, page: 1, limit: 20 },
    });

    renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    expect(mockGetTracks).toHaveBeenCalledWith(expectedParams);
  });

  it('should filter tracks by album', async () => {
    const mockResponse = {
      data: [
        { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
        { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
      ],
      meta: { total: 2, page: 1, limit: 10 },
    };

    const albumFilter = 'Album 1';
    mockUseTracksSearch.mockReturnValue({
      state: {
        album: albumFilter,
        search: '',
        artist: '',
        searchParams: {},
        limit: 10,
        page: undefined,
        sort: undefined,
        order: undefined,
        genre: undefined,
      },
      actions: {
        setSearchParams: vi.fn(),
        setSearch: vi.fn(),
        setGenre: vi.fn(),
        setArtist: vi.fn(),
        setAlbum: vi.fn(),
        setSort: vi.fn(),
        setOrder: vi.fn(),
      },
    });

    mockGetTracks.mockResolvedValue(mockResponse);

    renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockFilterTracks).toHaveBeenCalledWith(
        mockResponse.data,
        albumFilter
      );
    });
  });

  it('should handle API errors', async () => {
    const errorMessage = 'API Error';
    mockGetTracks.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.tracks).toEqual([]);
  });

  it('should handle pagination correctly', async () => {
    const mockPaginationReturn = {
      currentPage: 2,
      handlePageChange: vi.fn(),
      totalPages: 5,
    };

    mockUsePagination.mockReturnValue({
      ...mockPaginationReturn,
      setCurrentPage: vi.fn(),
      currentItems: vi.fn(),
    });

    const mockResponse = {
      data: [],
      meta: { total: 50, page: 2, limit: 10 },
    };

    mockGetTracks.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockUsePagination).toHaveBeenCalledWith({
      totalItems: 50,
      itemsPerPage: expect.any(Number),
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.handlePageChange).toBe(
      mockPaginationReturn.handlePageChange
    );
  });

  it('should handle empty response', async () => {
    const mockResponse = {
      data: [],
      meta: { total: 0, page: 1, limit: 10 },
    };

    mockGetTracks.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useTracksQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tracks).toEqual([]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });
});
