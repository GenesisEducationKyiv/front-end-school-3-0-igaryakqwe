import { PlusIcon } from 'lucide-react';
import { lazy } from 'react';

import { Button } from '@/components/ui/button';
import SelectAllTracksButton from '@/features/tracks/components/select-all-tracks-button';
import TrackDialog from '@/features/tracks/components/track-dialog';
import useTracksStore from '@/features/tracks/store/use-tracks.store';

const DeleteManyTracksDialog = lazy(
  () => import('@/features/tracks/components/delete-many-tracks-dialog')
);

const TracksListHeader = () => {
  const { isSelectMode } = useTracksStore();

  return (
    <div className="w-full flex gap-2 flex-wrap justify-between items-center">
      <SelectAllTracksButton />
      <div className="space-x-2">
        {isSelectMode && <DeleteManyTracksDialog />}
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
