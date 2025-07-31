import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import TrackImage from '@/features/tracks/components/track-image';

const TrackCardSkeleton = () => {
  return (
    <Card className="w-full p-0 gap-0 mx-auto overflow-hidden">
      <TrackImage />

      <CardContent className="p-4">
        <div className="mb-4">
          <Skeleton className="h-6 w-3/4 mb-2" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        <Skeleton className="w-full h-8 mt-4 rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default TrackCardSkeleton;
