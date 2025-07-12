import { PlusIcon } from 'lucide-react';
import { lazy } from 'react';

import { Button } from '@/components/ui/button';
import SelectAllTracksButton from '@/features/tracks/components/select-all-tracks-button';
import TrackDialog from '@/features/tracks/components/track-dialog';
import useTracksStore from '@/features/tracks/store/use-tracks.store';

import useTracksQuery from '../hooks/queries/use-tracks-query';

const DeleteManyTracksDialog = lazy(
  () => import('@/features/tracks/components/delete-many-tracks-dialog')
);

const TracksListHeader = () => {
  const { isSelectMode } = useTracksStore();
  const { meta } = useTracksQuery();

  return (
    <div className="w-full flex gap-2 flex-wrap justify-between items-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <SelectAllTracksButton />
        <span>{meta?.total} tracks found</span>
      </div>
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
