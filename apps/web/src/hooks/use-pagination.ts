import { parseAsInteger, useQueryState } from 'nuqs';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => Promise<URLSearchParams>;
  handlePageChange: (page: number) => Promise<void>;
  currentItems: <T>(items: T[]) => T[];
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(initialPage)
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = async (pageNumber: number) => {
    await setCurrentPage(pageNumber);
  };

  const currentItems = <T>(items: T[]): T[] => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem) ?? [];
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    handlePageChange,
    currentItems,
  };
};
