import { TrashIcon } from 'lucide-react';

import ConfirmationDialog from '@/components/confirmation-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import useDeleteTracksMutation from '@/features/tracks/hooks/use-delete-tracks-mutation.ts';
import useTracksStore from '@/features/tracks/store/use-tracks.store';

const DeleteManyTracksDialog = () => {
  const { selectedTracksIds, resetSelectedTracksIds } =
    useTracksStore();
  const { deleteTracks, isDeleting } = useDeleteTracksMutation();

  if (!selectedTracksIds.length) return null;

  const handleDelete = () => {
    deleteTracks(selectedTracksIds);
    resetSelectedTracksIds();
  };

  return (
    <ConfirmationDialog
      title="Delete tracks?"
      description="Are you sure you want to delete these tracks? This action cannot be undone."
      onSubmit={handleDelete}
      isLoading={isDeleting}
    >
      <Button
        data-testid="bulk-delete-button"
        icon={<TrashIcon />}
        className="ml-auto"
        variant="outline"
      >
        Delete
        <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          {selectedTracksIds.length}
        </span>
      </Button>
    </ConfirmationDialog>
  );
};

export default DeleteManyTracksDialog;
