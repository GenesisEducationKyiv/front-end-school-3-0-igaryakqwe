import { useQuery } from '@tanstack/react-query';

import { getGenres } from '@/features/tracks/api/genres.api';

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
