import { lazy } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import useTracksQuery from '@/features/tracks/hooks/use-tracks-query';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants';

const TrackCard = lazy(() => import('@/features/tracks/components/track-card'));
const TrackCardSkeleton = lazy(
  () => import('@/features/tracks/components/track-card-skeleton')
);

const TracksList = () => {
  const { tracks, isLoading } = useTracksQuery();

  if (!tracks.length && !isLoading) {
    return (
      <Card className="w-full grid place-items-center h-full">
        <CardTitle>No tracks found</CardTitle>
      </Card>
    );
  }

  if (isLoading) {
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
  }

  return (
    <div
      data-testid="tracks-list"
      className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
    >
      {tracks?.map((track) => (
        <TrackCard track={track} key={track.id} />
      ))}
    </div>
  );
};

export default TracksList;
