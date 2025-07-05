import { MUSIC_ICON } from '@/constants/icons';
import { cn } from '@/lib/utils';

interface TrackImageFallbackProps {
  alt?: string;
  className?: string;
}

const TrackImageFallback = ({ alt, className }: TrackImageFallbackProps) => {
  return (
    <div className="w-full h-full grid place-items-center bg-gray-100 dark:bg-neutral-800 rounded-lg">
      <img
        src={MUSIC_ICON}
        alt={alt}
        className={cn('object-cover w-1/3 h-auto', className)}
        loading="lazy"
        fetchPriority="high"
      />
    </div>
  );
};

export default TrackImageFallback;
