import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import TrackAudio from '@/features/tracks/components/track-audio';
import TrackImage from '@/features/tracks/components/track-image';
import TrackUpload from '@/features/tracks/components/track-upload';
import useTracksStore from '@/features/tracks/store/use-tracks-store.tsx';
import { Track } from '@/types/entities/track';
import TrackInfo from '@/features/tracks/components/track-info';
import TrackActions from '@/features/tracks/components/track-actions';

interface TrackCardProps {
  track: Track;
}

const TrackCard = memo(({ track }: TrackCardProps) => {
  const { isSelectMode, selectedTracksIds, selectTrack } = useTracksStore();

  const isSelected = selectedTracksIds.includes(track.id);

  const handleSelect = () => {
    selectTrack(track.id);
  };

  return (
    <Card
      data-testid={`track-item-${track.id}`}
      className="w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden"
    >
      {isSelectMode && (
        <Checkbox
          data-testid={`track-checkbox-${track.id}`}
          checked={isSelected}
          onCheckedChange={handleSelect}
          className="size-5 cursor-pointer absolute left-4 top-4 z-10 bg-white hover:scale-125 transition-all"
        />
      )}

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
