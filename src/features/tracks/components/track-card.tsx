'use client';

import { EditIcon, Trash2Icon } from 'lucide-react';

import ConfirmationDialog from '@/components/confirmation-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import TrackAudio from '@/features/tracks/components/track-audio';
import TrackDialog from '@/features/tracks/components/track-dialog';
import TrackImage from '@/features/tracks/components/track-image';
import TrackUpload from '@/features/tracks/components/track-upload';
import useDeleteTrackMutation from '@/features/tracks/hooks/use-delete-track-mutation';
import useTracksStore from '@/features/tracks/store/use-tracks-store.tsx';
import { Track } from '@/types/entities/track';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const { isSelectMode, selectedTracksIds, selectTrack } = useTracksStore();
  const { deleteTrack, isDeleting } = useDeleteTrackMutation();

  const isSelected = selectedTracksIds.includes(track.id);

  const handleDelete = () => {
    deleteTrack(track.id);
  };

  const handleSelect = () => {
    selectTrack(track.id);
  };

  return (
    <Card
      data-testid={`track-item-${track.id}`}
      className="w-full relative p-0 gap-0 max-w-md mx-auto overflow-hidden"
    >
      {isSelectMode && (
        <Checkbox
          data-testid={`track-checkbox-${track.id}`}
          checked={isSelected}
          onCheckedChange={handleSelect}
          className="size-5 cursor-pointer absolute left-4 top-4 z-10 bg-white hover:scale-125 transition-all"
        />
      )}

      <TrackImage
        image={track.coverImage}
        alt={`${track.title} by ${track.artist}`}
        className="rounded-lg"
      />

      <CardContent className="pb-6 h-full flex flex-col justify-between">
        <div className="mb-4">
          <CardTitle
            data-testid={`track-item-${track.id}-title`}
            className="text-xl truncate text-center"
          >
            {track.title}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            <p
              data-testid={`track-item-${track.id}-album`}
              className="truncate"
            >
              {track.album}
            </p>
            <p
              data-testid={`track-item-${track.id}-artist`}
              className="truncate"
            >
              By {track.artist}
            </p>
          </CardDescription>

          <div className="flex flex-wrap items-center justify-center gap-1 mt-2">
            {track.genres.map((genre, index) => (
              <Badge data-testid={`genre-${genre}`} key={index} variant="secondary" className="text-xs">
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
            data-testid={`edit-track-${track.id}`}
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
          <Button
            data-testid={`delete-track-${track.id}`}
            variant="destructive"
            size="icon"
          >
            <Trash2Icon className="h-4 w-4 text-white" />
          </Button>
        </ConfirmationDialog>
      </div>
    </Card>
  );
};

export default TrackCard;
