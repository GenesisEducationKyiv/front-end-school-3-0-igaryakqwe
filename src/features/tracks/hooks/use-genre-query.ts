import { useQuery } from '@tanstack/react-query';

import { getGenres } from '@/api/genres.api.ts';

const useGenreQuery = () => {
  const {
    data: genres = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  return {
    genres,
    isLoading,
    error,
  };
};

export default useGenreQuery;
