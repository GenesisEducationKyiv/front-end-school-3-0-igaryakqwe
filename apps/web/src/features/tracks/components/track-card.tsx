import { lazy, memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import TrackActions from '@/features/tracks/components/track-actions';
import TrackImage from '@/features/tracks/components/track-image';
import TrackInfo from '@/features/tracks/components/track-info';
import TrackSelector from '@/features/tracks/components/track-selector';
import { cn } from '@/lib/utils';
import { Track } from '@/types/entities/track';

import useTracksStore from '../store/use-tracks.store';

const TrackAudio = lazy(
  () => import('@/features/tracks/components/track-audio')
);
const TrackUpload = lazy(
  () => import('@/features/tracks/components/track-upload')
);

interface TrackCardProps {
  track: Track;
}

const TrackCard = memo(({ track }: TrackCardProps) => {
  const selectedTracks = useTracksStore((state) => state.selectedTracksIds);
  const isSelectMode = useTracksStore((state) => state.isSelectMode);
  return (
    <Card
      data-testid={`track-item-${track.id}`}
      className={cn(
        'w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden',
        'hover:shadow-lg transition-all duration-300 group animate-fade-in-up overflow-hidden',
        selectedTracks.some((id) => id === track.id) &&
          isSelectMode &&
          'ring-3 ring-ring/30 border-ring bg-primary-container/20'
      )}
    >
      <TrackSelector track={track} />
      {!isSelectMode && <TrackActions track={track} />}

      <div>
        <TrackImage
          image={track.coverImage}
          alt={`${track.title} by ${track.artist}`}
        />
      </div>

      <CardContent className="p-4 h-full gap-2 flex flex-col justify-between">
        <TrackInfo track={track} />

        {track?.audioFile ? (
          <TrackAudio track={track} />
        ) : (
          <TrackUpload trackId={track.id} />
        )}
      </CardContent>
    </Card>
  );
});

export default TrackCard;
