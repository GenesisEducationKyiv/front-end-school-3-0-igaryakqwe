import { memo } from 'react';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Track } from '@/types/entities/track';

import TrackAudio from '@/features/tracks/components/track-audio';
import TrackImage from '@/features/tracks/components/track-image';
import TrackUpload from '@/features/tracks/components/track-upload';
import TrackActions from '@/features/tracks/components/track-actions';
import TrackSelector from '@/features/tracks/components/track-selector';

import useDeleteTrackMutation from '@/features/tracks/hooks/use-delete-track-mutation';
import useTracksStore from '@/features/tracks/store/use-tracks.store';
import useTrackStore from '@/features/tracks/store/use-track.store';

interface TrackCardProps {
  track: Track;
}

const TrackCard = memo(({ track }: TrackCardProps) => {
  const activeTrack = useTrackStore((state) => state.activeTrack);

  const trackTitle =
    activeTrack?.id === track.id
      ? (activeTrack.title ?? track.title)
      : track.title;

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
        <div className="mb-4">
          <CardTitle
            data-testid={`track-item-${track.id}-title`}
            className="text-xl truncate text-center"
          >
            {trackTitle}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            <p
              data-testid={`track-item-${track.id}-album`}
              className="truncate"
            >
              {track.album}
            </p>
            <p
              data-testid={`track-item-${track.id}-artist`}
              className="truncate"
            >
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
