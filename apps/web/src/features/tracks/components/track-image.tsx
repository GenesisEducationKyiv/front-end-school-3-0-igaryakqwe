import Image, { ImageLoader } from 'next/image';

import { MUSIC_ICON } from '@/constants/icons';
import { cn } from '@/lib/utils';

interface TrackImage {
  isLCP?: boolean;
  image?: string | null;
  alt?: string;
  className?: string;
  loader?: ImageLoader;
}

const TrackImage = ({
  isLCP = false,
  image,
  alt,
  className,
  loader,
}: TrackImage) => {
  return (
    <div className={cn('w-full h-full aspect-square', className)}>
      {image ? (
        <Image
          src={image ?? undefined}
          alt={alt ?? ''}
          className="object-cover w-full h-full"
          loading={isLCP ? 'eager' : 'lazy'}
          fetchPriority={isLCP ? 'high' : 'low'}
          width={300}
          height={300}
          loader={loader}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="w-full h-full grid place-items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 opacity-80">
            <Image
              src={MUSIC_ICON}
              alt={alt ?? ''}
              className={'object-cover opacity-80 w-1/3 h-auto'}
              width={50}
              height={50}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackImage;
