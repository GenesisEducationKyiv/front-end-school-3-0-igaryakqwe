'use client';

import { useQuery } from '@tanstack/react-query';

import TrackCard from '@/features/tracks/components/track-card';
import TrackCardSkeleton from '@/features/tracks/components/track-card-skeleton';
import TrackImage from '@/features/tracks/components/track-image';
import { tracksQueryOptions } from '@/features/tracks/lib/utils';

const TrackSection = () => {
  const { data } = useQuery(
    tracksQueryOptions({
      limit: 1,
    })
  );

  const track = data?.data[0];

  if (!track) {
    return <TrackCardSkeleton className="w-[300px]" />;
  }

  return (
    <TrackCard className="w-[300px]" track={track}>
      <TrackImage image={track.coverImage} alt={track.title} isLCP />
    </TrackCard>
  );
};

export default TrackSection;
