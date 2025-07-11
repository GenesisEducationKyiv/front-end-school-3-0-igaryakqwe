import { lazy } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MUSIC_ICON } from '@/constants/icons';
import { cn } from '@/lib/utils';

const AvatarImage = lazy(() =>
  import('@/components/ui/avatar').then((module) => ({
    default: module.AvatarImage,
  }))
);

interface TrackImage {
  image?: string | null;
  alt?: string;
  className?: string;
}

const TrackImage = ({ image, alt, className }: TrackImage) => {
  return (
    <div className={cn('aspect-square w-full p-6', className)}>
      <Avatar className="w-full h-full rounded-lg">
        {image && (
          <AvatarImage
            src={image ?? undefined}
            alt={alt}
            className="object-cover w-full h-full rounded-lg"
          />
        )}
        <AvatarFallback>
          <div className="w-full h-full grid place-items-center bg-gray-100 dark:bg-neutral-800 rounded-lg">
            <img
              src={MUSIC_ICON}
              alt={alt}
              className={'object-cover w-1/3 h-auto'}
            />
          </div>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TrackImage;
