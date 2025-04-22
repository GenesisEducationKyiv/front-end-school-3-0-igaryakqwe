'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Track } from '@/types/entities/track.ts';
import TrackImage from '@/features/tracks/components/track-image.tsx';
import TrackDialog from '@/features/tracks/components/track-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { EditIcon, Trash2Icon } from 'lucide-react';
import ConfirmationDialog from '@/components/confirmation-dialog.tsx';
import useDeleteTrackMutation from '@/features/tracks/hooks/use-delete-track-mutation.ts';
import TrackUpload from '@/features/tracks/components/track-upload.tsx';
import TrackAudio from '@/features/tracks/components/track-audio.tsx';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const { deleteTrack, isDeleting } = useDeleteTrackMutation();

  const handleDelete = () => {
    deleteTrack(track.id);
  };

  return (
    <Card className="w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden">
      <TrackImage
        image={track.coverImage}
        alt={`${track.title} by ${track.artist}`}
        className="rounded-lg"
      />

      <CardContent className="pb-6 h-full flex flex-col justify-between">
        <div className="mb-4">
          <CardTitle className="text-xl truncate text-center">
            {track.title}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            <p className="truncate">{track.album}</p>
            <p className="truncate">By {track.artist}</p>
          </CardDescription>

          <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
            {track.genres.map((genre, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {track?.audioFile ? (
          <TrackAudio track={track} />
        ) : (
          <TrackUpload trackId={track.id} />
        )}
      </CardContent>
      <div className="flex gap-2 absolute top-2 right-2 z-10">
        <TrackDialog track={track} isEdit>
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
            aria-label="Edit track"
          >
            <EditIcon className="h-4 w-4" />
          </Button>
        </TrackDialog>
        <ConfirmationDialog
          title="Are you sure you want to delete this track?"
          description="This action cannot be undone."
          onSubmit={handleDelete}
          isLoading={isDeleting}
        >
          <Button variant="destructive" size="icon">
            <Trash2Icon className="h-4 w-4 text-white" />
          </Button>
        </ConfirmationDialog>
      </div>
    </Card>
  );
};

export default TrackCard;
