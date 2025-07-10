import { Badge } from '@/components/ui/badge';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Track } from '@/types/entities/track';
import { memo } from 'react';

interface TrackInfoProps {
  track: Track;
}

const TrackInfo = memo(({ track }: TrackInfoProps) => {
  return (
    <div className="mb-4">
      <CardTitle
        data-testid={`track-item-${track.id}-title`}
        className="text-xl truncate text-center"
      >
        {track.title}
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
