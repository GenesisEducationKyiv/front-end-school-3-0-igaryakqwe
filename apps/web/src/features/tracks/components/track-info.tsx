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
    <div className="mb-4">
      <CardTitle
        data-testid={`track-item-${track.id}-title`}
        className="text-xl truncate text-center"
      >
        {trackTitle}
      </CardTitle>
      <CardDescription className="text-center text-muted-foreground">
        <p data-testid={`track-item-${track.id}-album`} className="truncate">
          {track.album}
        </p>
        <p data-testid={`track-item-${track.id}-artist`} className="truncate">
          By {track.artist}
        </p>
      </CardDescription>

      <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
        {track.genres.map((genre, index) => (
          <Badge
            data-testid={`genre-${genre}`}
            key={index}
            variant="secondary"
            className="text-xs"
          >
            {genre}
          </Badge>
        ))}
      </div>
    </div>
  );
});

export default TrackInfo;
