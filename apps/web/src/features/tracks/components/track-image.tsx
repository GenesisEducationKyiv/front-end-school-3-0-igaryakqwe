import { memo } from 'react';

import TrackImageFallback from '@/features/tracks/components/track-image-fallback';
import { cn } from '@/lib/utils';

interface TrackImage {
  isLCP?: boolean;
  image?: string | null;
  alt?: string;
  className?: string;
}

const TrackImage = ({ isLCP = false, image, alt, className }: TrackImage) => {
  return (
    <div
      className={cn('aspect-square w-full p-6 h-full rounded-lg', className)}
    >
      {image ? (
        <img
          src={image}
          alt={alt}
          className="object-cover w-full h-full rounded-lg"
          loading={isLCP ? 'eager' : 'lazy'}
          fetchPriority={isLCP ? 'high' : 'low'}
          width={300}
          height={300}
          decoding="sync"
        />
      ) : (
        <TrackImageFallback alt={alt} isLCP={isLCP} />
      )}
    </div>
  );
};

export default memo(TrackImage);
