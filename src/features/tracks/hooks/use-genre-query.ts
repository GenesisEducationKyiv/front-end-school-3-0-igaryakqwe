import { getGenres } from '@/api/genres.api.ts';
import { useQuery } from '@tanstack/react-query';

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
