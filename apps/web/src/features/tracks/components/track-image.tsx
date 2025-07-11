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
    <div>
      <Avatar
        className={cn('w-full h-full rounded-none aspect-square', className)}
      >
        {image && (
          <AvatarImage
            src={image ?? undefined}
            alt={alt}
            className="object-cover w-full h-full"
          />
        )}
        <AvatarFallback>
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-none">
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 opacity-80">
              <img
                src={MUSIC_ICON}
                alt={alt}
                className={'object-cover opacity-80 w-1/3 h-auto'}
              />
            </div>
          </div>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TrackImage;
