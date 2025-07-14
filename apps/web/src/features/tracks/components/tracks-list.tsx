'use client';

import { Card, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import TrackImage from '@/features/tracks/components/track-image';
import useTracksQuery from '../hooks/queries/use-tracks-query';

const TrackCard = dynamic(
  () => import('@/features/tracks/components/track-card')
);

const TracksList = () => {
  const { tracks } = useTracksQuery();

  if (!tracks) {
    return (
      <Card className="w-full h-full flex-1 grid place-items-center">
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
            className="rounded-lg"
          />
        </TrackCard>
      ))}
    </div>
  );
};

export default TracksList;
