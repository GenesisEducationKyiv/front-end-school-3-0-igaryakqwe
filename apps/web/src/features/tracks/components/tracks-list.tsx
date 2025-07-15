'use client';

import dynamic from 'next/dynamic';

import { Card, CardTitle } from '@/components/ui/card';
import TrackImage from '@/features/tracks/components/track-image';

import useTracksQuery from '../hooks/queries/use-tracks-query';
import TracksSkeletonList from './tracks-skeleton-list';

const TrackCard = dynamic(
  () => import('@/features/tracks/components/track-card')
);

const TracksList = () => {
  const { tracks, isLoading } = useTracksQuery();

  if (isLoading) {
    return <TracksSkeletonList />;
  }

  if (!tracks.length) {
    return (
      <Card
        data-testid="empty-tracks-list"
        className="w-full h-full flex-1 grid place-items-center"
      >
        <CardTitle>No tracks found</CardTitle>
      </Card>
    );
  }

  return (
    <div
      data-testid="tracks-list"
      className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
    >
      {tracks?.map((track, index) => (
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
