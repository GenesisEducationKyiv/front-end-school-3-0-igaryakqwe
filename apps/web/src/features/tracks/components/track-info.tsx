import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import useTrackStore from '@/features/tracks/store/use-track.store';
import { Track } from '@/types/entities/track';

interface TrackInfoProps {
  track: Track;
}

const TrackInfo = memo(({ track }: TrackInfoProps) => {
  const activeTrack = useTrackStore((state) => state.activeTrack);

  const trackTitle =
    activeTrack?.id === track.id
      ? (activeTrack.title ?? track.title)
      : track.title;

  return (
    <div className="space-y-2">
      <CardTitle
        data-testid={`track-item-${track.id}-title`}
        className="font-semibold text-foreground truncate text-lg mb-0"
      >
        {trackTitle}
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        {track.album && (
          <p data-testid={`track-item-${track.id}-album`} className="truncate">
            {track.album}
          </p>
        )}
        {track.artist && (
          <p data-testid={`track-item-${track.id}-artist`} className="truncate">
            By {track.artist}
          </p>
        )}
      </CardDescription>

      <div className="flex flex-wrap gap-1">
        {track.genres.slice(0, 3).map((genre) => (
          <Badge
            key={genre}
            variant="secondary"
            className="text-xs px-2 py-1 rounded-full"
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );
});

export default TrackInfo;
