import TrackCardSkeleton from '@/features/tracks/components/track-card-skeleton';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants';

const TracksSkeletonList = () => {
  return (
    <div
      data-testid="loading-tracks"
      data-loading="true"
      className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
    >
      {Array.from({ length: MAX_TRACKS_PER_PAGE }).map((_, index) => (
        <TrackCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default TracksSkeletonList;
