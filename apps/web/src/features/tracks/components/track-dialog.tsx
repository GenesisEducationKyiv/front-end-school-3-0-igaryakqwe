import { PropsWithChildren, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import TrackForm from '@/features/tracks/components/track-form.tsx';
import { Track } from '@/types/entities/track.ts';

interface TaskDialogProps {
  isEdit?: boolean;
  track?: Track;
}

const TrackDialog = ({
  children,
  isEdit,
  track,
}: PropsWithChildren<TaskDialogProps>) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogTitle>{isEdit ? 'Update track' : 'Create track'}</DialogTitle>
        <TrackForm isEdit={isEdit} onClose={handleClose} track={track} />
      </DialogContent>
    </Dialog>
  );
};

export default TrackDialog;
