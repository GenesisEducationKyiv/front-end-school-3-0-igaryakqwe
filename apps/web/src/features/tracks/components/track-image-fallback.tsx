import { MUSIC_ICON } from '@/constants/icons';
import { cn } from '@/lib/utils';

interface TrackImageFallbackProps {
  isLCP?: boolean;
  alt?: string;
  className?: string;
}

const TrackImageFallback = ({
  isLCP = false,
  alt,
  className,
}: TrackImageFallbackProps) => {
  return (
    <div className="w-full h-full grid place-items-center bg-gray-100 dark:bg-neutral-800 rounded-lg">
      <img
        src={MUSIC_ICON}
        alt={alt}
        className={cn('object-cover w-1/3 h-auto', className)}
        loading={isLCP ? 'eager' : 'lazy'}
        fetchPriority={isLCP ? 'high' : 'low'}
        width={200}
        height={200}
        decoding="sync"
      />
    </div>
  );
};

export default TrackImageFallback;
