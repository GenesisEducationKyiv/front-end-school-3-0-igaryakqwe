import { cn } from '@/lib/utils.ts';
import { MUSIC_ICON } from '@/constants/icons.ts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';

interface TrackImage {
  image?: string;
  alt?: string;
  className?: string;
}

const TrackImage = ({ image, alt, className }: TrackImage) => {
  return (
    <div className={cn('aspect-square w-full p-6', className)}>
      <Avatar className="w-full h-full rounded-lg">
        <AvatarImage
          src={image}
          alt={alt}
          className="object-cover w-full h-full rounded-lg"
        />
        <AvatarFallback>
          <div className="w-full h-full grid place-items-center bg-gray-100 rounded-lg">
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
