'use client';

import dynamic from 'next/dynamic';

import EmptyTrackListCard from '@/features/tracks/components/empty-track-list-card';
import TrackImage from '@/features/tracks/components/track-image';

import useTracksQuery from '../hooks/queries/use-tracks-query';
import TracksSkeletonList from './tracks-skeleton-list';

const TrackCard = dynamic(
  () => import('@/features/tracks/components/track-card')
);

const TracksList = () => {
  const { tracks, isLoading } = useTracksQuery();

  if (!tracks.length && !isLoading) {
    return <EmptyTrackListCard />;
  }

  if (isLoading) {
    return <TracksSkeletonList />;
  }

  return (
    <div
      data-testid="tracks-list"
      className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
    >
      {tracks.map((track, index) => (
        <TrackCard track={track} key={track.id}>
          <TrackImage
            isLCP={index < 1}
            image={track.coverImage}
            alt={`${track.title} by ${track.artist}`}
          />
        </TrackCard>
      ))}
    </div>
  );
};

export default TracksList;
