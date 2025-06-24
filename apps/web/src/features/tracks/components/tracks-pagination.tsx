import PaginationControls from '@/components/pagination-controls.tsx';
import useTracksQuery from '@/features/tracks/hooks/use-tracks-query.ts';

const TracksPagination = () => {
  const { currentPage, totalPages, handlePageChange } = useTracksQuery();

  return (
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default TracksPagination;
