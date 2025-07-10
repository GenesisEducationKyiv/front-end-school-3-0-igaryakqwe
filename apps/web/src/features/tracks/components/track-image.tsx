import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { MUSIC_ICON } from '@/constants/icons.ts';
import { cn } from '@/lib/utils.ts';

interface TrackImage {
  image?: string | null;
  alt?: string;
  className?: string;
}

const TrackImage = ({ image, alt, className }: TrackImage) => {
  return (
    <div className={cn('aspect-square w-full p-6', className)}>
      <Avatar className="w-full h-full rounded-lg">
        <AvatarImage
          src={image ?? undefined}
          alt={alt}
          className="object-cover w-full h-full rounded-lg"
        />
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
