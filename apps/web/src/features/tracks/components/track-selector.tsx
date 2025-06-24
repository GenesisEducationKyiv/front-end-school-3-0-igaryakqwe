import { Checkbox } from '@/components/ui/checkbox';
import { Track } from '@/types/entities/track';
import useTracksStore from '@/features/tracks/store/use-tracks-store';
import { memo } from 'react';

interface TrackSelectorProps {
  track: Track;
}

const TrackSelector = ({ track }: TrackSelectorProps) => {
  const isSelectMode = useTracksStore((state) => state.isSelectMode);
  const selectedTracksIds = useTracksStore((state) => state.selectedTracksIds);
  const selectTrack = useTracksStore((state) => state.selectTrack);

  const isSelected = selectedTracksIds.includes(track.id);

  const handleSelect = () => {
    selectTrack(track.id);
  };

  if (!isSelectMode) {
    return null;
  }

  return (
    <Checkbox
      data-testid={`track-checkbox-${track.id}`}
      checked={isSelected}
      onCheckedChange={handleSelect}
      className="size-5 cursor-pointer absolute left-4 top-4 z-10 bg-white hover:scale-125 transition-all"
    />
  );
};

export default memo(TrackSelector);
