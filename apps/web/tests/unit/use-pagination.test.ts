import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../src/hooks/use-pagination';

const mockSetCurrentPage = vi.fn();

vi.mock('nuqs', () => {
  let currentPage = 1;
  return {
    parseAsInteger: {
      withDefault: vi.fn((defaultVal: number) => ({
        __type: 'mocked',
        defaultVal,
      })),
    },
    useQueryState: vi.fn((key: string, parser: any) => {
      mockSetCurrentPage.mockImplementation(async (page: number) => {
        currentPage = page;
        return new URLSearchParams({ [key]: String(page) });
      });

      return [currentPage, mockSetCurrentPage];
    }),
  };
});

describe('usePagination', () => {
  const totalItems = 100;
  const itemsPerPage = 10;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default page', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems, itemsPerPage })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(10);
  });

  it('calculates total pages correctly', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 95, itemsPerPage: 10 })
    );

    expect(result.current.totalPages).toBe(10);
  });

  it('slices items correctly for current page', () => {
    const items = Array.from({ length: 100 }, (_, i) => i + 1);

    const { result } = renderHook(() =>
      usePagination({ totalItems, itemsPerPage })
    );

    const pageItems = result.current.currentItems(items);
    expect(pageItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('updates page using setCurrentPage', async () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems, itemsPerPage })
    );

    await act(async () => {
      await result.current.setCurrentPage(3);
    });

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('updates page using handlePageChange', async () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems, itemsPerPage })
    );

    await act(async () => {
      await result.current.handlePageChange(5);
    });

    expect(mockSetCurrentPage).toHaveBeenCalledWith(5);
  });
});
