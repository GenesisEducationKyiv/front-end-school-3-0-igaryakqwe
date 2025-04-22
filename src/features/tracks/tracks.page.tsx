import TracksList from '@/features/tracks/components/tracks-list.tsx';
import TracksPagination from '@/features/tracks/components/tracks-pagination.tsx';
import TracksFilters from '@/features/tracks/components/tracks-filters.tsx';
import TrackDialog from '@/features/tracks/components/track-dialog.tsx';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import AudioSnackbar from '@/components/audio/audio-snackbar.tsx';

const TracksPage = () => {
  return (
    <main className="mx-auto relative flex flex-col space-y-4 p-3 pb-0 max-w-7xl ">
      <TrackDialog>
        <Button icon={<PlusIcon />} className="self-end">
          Create task
        </Button>
      </TrackDialog>

      <div className="flex flex-col lg:flex-row gap-5">
        <TracksFilters />
        <TracksList />
      </div>
      <TracksPagination />
      <AudioSnackbar />
    </main>
  );
};

export default TracksPage;
