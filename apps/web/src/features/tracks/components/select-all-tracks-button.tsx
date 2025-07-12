import { CheckCheckIcon, CheckSquareIcon, Square } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useTracksQuery from '@/features/tracks/hooks/queries/use-tracks-query';
import { MAX_TRACKS_PER_PAGE } from '@/features/tracks/lib/constants';
import useTracksStore from '@/features/tracks/store/use-tracks.store';

const SelectAllTracksButton = () => {
  const { tracks } = useTracksQuery();

  const isSelectMode = useTracksStore((state) => state.isSelectMode);
  const selectedTracksIds = useTracksStore((state) => state.selectedTracksIds);
  const toggleSelectMode = useTracksStore((state) => state.toggleSelectMode);
  const setSelectedTracksIds = useTracksStore(
    (state) => state.setSelectedTracksIds
  );

  const handleSelectAll = () => {
    const allTracksIds = tracks.map((track) => track.id);
    const allSelected = allTracksIds.every((id) =>
      selectedTracksIds.includes(id)
    );
    const newSelectedTracksIds = allSelected
      ? selectedTracksIds.filter((id) => !allTracksIds.includes(id))
      : [...selectedTracksIds, ...allTracksIds];
    setSelectedTracksIds(newSelectedTracksIds);
  };

  const handleSelectMode = () => {
    toggleSelectMode();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        icon={
          isSelectMode ? (
            <CheckSquareIcon className="h-4 w-4 mr-2" />
          ) : (
            <Square className="h-4 w-4 mr-2" />
          )
        }
        onClick={handleSelectMode}
        variant={isSelectMode ? 'default' : 'outline'}
        data-testid="select-mode-toggle"
      >
        Select mode
      </Button>
      {isSelectMode && (
        <Button
          data-testid="select-all"
          onClick={handleSelectAll}
          icon={<CheckCheckIcon />}
          variant="outline"
        >
          {selectedTracksIds.length >= MAX_TRACKS_PER_PAGE
            ? 'Select none'
            : 'Select all'}
        </Button>
      )}
    </div>
  );
};

export default SelectAllTracksButton;
