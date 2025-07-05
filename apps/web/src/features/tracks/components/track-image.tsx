import { lazy } from 'react';

import { cn } from '@/lib/utils';

const TrackImageFallback = lazy(
  () => import('@/features/tracks/components/track-image-fallback')
);

interface TrackImage {
  image?: string | null;
  alt?: string;
  className?: string;
}

const TrackImage = ({ image, alt, className }: TrackImage) => {
  return (
    <div
      className={cn('aspect-square w-full p-6 h-full rounded-lg', className)}
    >
      {image ? (
        <img
          src={image}
          alt={alt}
          className="object-cover w-full h-full rounded-lg"
          loading="lazy"
          fetchPriority="high"
        />
      ) : (
        <TrackImageFallback alt={alt} />
      )}
    </div>
  );
};

export default TrackImage;
