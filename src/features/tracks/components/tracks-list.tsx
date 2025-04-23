import TrackCard from '@/features/tracks/components/track-card.tsx';
import useTracksQuery from '@/features/tracks/hooks/use-tracks-query.ts';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants.ts';
import TrackCardSkeleton from '@/features/tracks/components/track-card-skeleton.tsx';
import { Card, CardTitle } from '@/components/ui/card.tsx';

const TracksList = () => {
  const { tracks, isLoading } = useTracksQuery();

  if (!tracks.length) {
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
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
      {tracks?.map((track) => <TrackCard track={track} key={track.id} />)}
    </div>
  );
};

export default TracksList;
