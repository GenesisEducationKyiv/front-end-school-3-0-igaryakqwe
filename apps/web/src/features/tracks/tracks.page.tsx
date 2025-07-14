import { Suspense } from 'react';

import TracksFilters from '@/features/tracks/components/tracks-filters';
import TracksList from '@/features/tracks/components/tracks-list';
import TracksListHeader from '@/features/tracks/components/tracks-list-header';
import TracksPagination from '@/features/tracks/components/tracks-pagination';
import { MAX_TRACKS_PER_PAGE } from './lib/constants';
import TrackCardSkeleton from './components/track-card-skeleton';

const TracksPage = () => {
  return (
    <main className="mx-auto flex-1 relative h-full flex flex-col space-y-4 p-3 max-w-7xl ">
      <h1 className="text-3xl font-bold">Tracks</h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <TracksFilters />
        <div className="flex w-full flex-col gap-4">
          <TracksListHeader />
          <Suspense
            fallback={
              <div
                data-testid="loading-tracks"
                data-loading="true"
                className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
              >
                {Array.from({ length: MAX_TRACKS_PER_PAGE }).map((_, index) => (
                  <TrackCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <TracksList />
          </Suspense>
          <TracksPagination />
        </div>
      </div>
    </main>
  );
};

export default TracksPage;
