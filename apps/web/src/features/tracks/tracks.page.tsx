import { lazy } from 'react';

import TracksFilters from '@/features/tracks/components/tracks-filters';
import TracksList from '@/features/tracks/components/tracks-list';
import TracksListHeader from '@/features/tracks/components/tracks-list-header';
import TracksPagination from '@/features/tracks/components/tracks-pagination';

import useAudioController from './hooks/use-audio-controller';

const AudioSnackbar = lazy(
  () => import('@/features/tracks/components/audio-snackbar')
);

const TracksPage = () => {
  const { currentStoreTrack } = useAudioController();

  return (
    <main className="mx-auto flex-1 relative h-full flex flex-col space-y-4 p-3 max-w-7xl ">
      <h1 className="text-3xl font-bold">Tracks</h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <TracksFilters />
        <div className="flex w-full flex-col gap-4">
          <TracksListHeader />
          <TracksList />
          <TracksPagination />
        </div>
      </div>

      {currentStoreTrack && <AudioSnackbar />}
    </main>
  );
};

export default TracksPage;
