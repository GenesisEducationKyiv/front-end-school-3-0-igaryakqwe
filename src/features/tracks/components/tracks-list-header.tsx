import SelectAllTracksButton from '@/features/tracks/components/select-all-tracks-button.tsx';
import DeleteManyTracksDialog from '@/features/tracks/components/delete-many-tracks-dialog.tsx';
import TrackDialog from '@/features/tracks/components/track-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PlusIcon } from 'lucide-react';

const TracksListHeader = () => {
  return (
    <div className="w-full flex gap-2 flex-wrap justify-between items-center">
      <SelectAllTracksButton />
      <div className="space-x-2">
        <DeleteManyTracksDialog />
        <TrackDialog>
          <Button data-testid="create-track-button" icon={<PlusIcon />}>
            Create track
          </Button>
        </TrackDialog>
      </div>
    </div>
  );
};

export default TracksListHeader;
