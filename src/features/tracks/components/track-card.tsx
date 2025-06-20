import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import TrackAudio from '@/features/tracks/components/track-audio';
import TrackImage from '@/features/tracks/components/track-image';
import TrackUpload from '@/features/tracks/components/track-upload';
import TrackInfo from '@/features/tracks/components/track-info';
import TrackActions from '@/features/tracks/components/track-actions';
import { Track } from '@/types/entities/track';
import TrackSelector from '@/features/tracks/components/track-selector';

interface TrackCardProps {
  track: Track;
}

const TrackCard = memo(({ track }: TrackCardProps) => {
  return (
    <Card
      data-testid={`track-item-${track.id}`}
      className="w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden"
    >
      <TrackSelector track={track} />

      <TrackImage
        image={track.coverImage}
        alt={`${track.title} by ${track.artist}`}
        className="rounded-lg"
      />

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
