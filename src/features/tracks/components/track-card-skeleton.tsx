'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import TrackImage from '@/features/tracks/components/track-image.tsx';

const TrackCardSkeleton = () => {
  return (
    <Card className="w-full p-0 gap-0 mx-auto overflow-hidden">
      <TrackImage className="rounded-lg" />

      <CardContent className="pb-6">
        <div className="mb-4">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />

          <div className="space-y-2 text-center">
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        <Skeleton className="w-full h-10 mt-4 rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default TrackCardSkeleton;
