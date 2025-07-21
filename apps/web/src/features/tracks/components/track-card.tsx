import { lazy, memo, PropsWithChildren } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import TrackActions from '@/features/tracks/components/track-actions';
import TrackInfo from '@/features/tracks/components/track-info';
import TrackSelector from '@/features/tracks/components/track-selector';
import { Track } from '@/types/entities/track';

const TrackAudio = lazy(
  () => import('@/features/tracks/components/track-audio')
);
const TrackUpload = lazy(
  () => import('@/features/tracks/components/track-upload')
);

interface TrackCardProps extends PropsWithChildren {
  track: Track;
}

const TrackCard = memo(({ track, children }: TrackCardProps) => {
  return (
    <Card
      data-testid={`track-item-${track.id}`}
      className="w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden"
    >
      <TrackSelector track={track} />

      {children}

      <CardContent className="pb-6 h-full flex flex-col justify-between">
        <TrackInfo track={track} />

        {track?.audioFile ? (
          <TrackAudio track={track} />
        ) : (
          <TrackUpload trackId={track.id} />
        )}
      </CardContent>
      <TrackActions track={track} />
    </Card>
  );
});

export default TrackCard;
