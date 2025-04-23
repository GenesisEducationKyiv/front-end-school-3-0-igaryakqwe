import TracksList from '@/features/tracks/components/tracks-list.tsx';
import TracksPagination from '@/features/tracks/components/tracks-pagination.tsx';
import TracksFilters from '@/features/tracks/components/tracks-filters.tsx';
import AudioSnackbar from '@/features/tracks/components/audio-snackbar.tsx';
import TracksListHeader from '@/features/tracks/components/tracks-list-header.tsx';

const TracksPage = () => {
  return (
    <main className="mx-auto relative flex flex-col space-y-4 p-3 pb-0 max-w-7xl ">
      <h1 className="text-3xl font-bold">Tracks</h1>

      <div className="flex flex-col lg:flex-row gap-5">
        <TracksFilters />
        <div className="flex w-full flex-col gap-4">
          <TracksListHeader />
          <TracksList />
          <TracksPagination />
        </div>
      </div>
      <AudioSnackbar />
    </main>
  );
};

export default TracksPage;
