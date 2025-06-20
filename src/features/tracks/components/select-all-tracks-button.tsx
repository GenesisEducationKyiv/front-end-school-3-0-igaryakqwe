import { CheckCheckIcon, SquareCheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import useTracksQuery from '@/features/tracks/hooks/queries/use-tracks-query';
import useTracksStore from '@/features/tracks/store/use-tracks-store.tsx';

const SelectAllTracksButton = () => {
  const { tracks } = useTracksQuery();
  const {
    isSelectMode,
    toggleSelectMode,
    selectedTracksIds,
    setSelectedTracksIds,
  } = useTracksStore();

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
        icon={<SquareCheckIcon />}
        onClick={handleSelectMode}
        variant="outline"
        data-testid="select-mode-toggle"
      >
        Select mode
      </Button>
      {isSelectMode && (
        <Button
          data-testid="select-all"
          onClick={handleSelectAll}
          icon={<CheckCheckIcon />}
        >
          Select all
        </Button>
      )}
    </div>
  );
};

export default SelectAllTracksButton;
